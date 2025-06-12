import { detectPlant } from '../data/api';
import { showToast } from '../utils/utils';

export default class DetectionSpecificPage {
  constructor(plantType) {
    this.plantType = plantType;
    this.stream = null;
    this.selectedImage = null;
  }

  async render() {
    return `
      <section class="detection-specific-container">
        <div class="detection-header">
          <h1>Deteksi Penyakit Tanaman <em>${this.plantType}</em></h1>
          <p class="plant-description">Unggah gambar tanaman ${this.plantType} Anda untuk mendeteksi kemungkinan penyakit</p>
        </div>
        
        <div class="detection-options">
          <div class="option-card" id="upload-option">
            <h3>📂 Unggah Gambar</h3>
            <p>Pilih gambar dari perangkat</p>
            <input type="file" id="image-upload" accept="image/*" style="display: none;">
          </div>
          
          <div class="option-card" id="camera-option">
            <h3>📸 Gunakan Kamera</h3>
            <p>Ambil foto langsung</p>
          </div>
        </div>
        
        <div class="camera-preview" id="camera-preview" style="display: none;">
          <video id="camera-feed" autoplay playsinline></video>
          
          <div class="camera-controls">
            <button id="capture-btn" class="btn-primary">Ambil Foto</button>
            <button id="cancel-camera-btn" class="btn-secondary">Batal</button>
          </div>
        </div>
        
        <div class="image-preview" id="image-preview" style="display: none;">
          <img id="preview-image" src="" alt="Preview Gambar">
          <div class="preview-controls">
            <button id="retake-btn" class="btn-secondary">Ganti Gambar</button>
          </div>
        </div>
        
        <div class="farmer-notes">
          <h3>Keterangan (Opsional)</h3>
          <textarea id="farmer-notes" placeholder="Masukkan keterangan tambahan tentang gejala penyakit tanaman Anda..."></textarea>
        </div>
        
        <div class="detection-actions">
          <button id="detect-btn" class="btn-primary" disabled>Mulai Deteksi</button>
          <button id="reset-btn" class="btn-secondary">Reset</button>
        </div>
        
        <div class="detection-tips">
          <h3>Tips Pengambilan Gambar yang Baik:</h3>
          <ul>
            <li>Pastikan pencahayaan cukup</li>
            <li>Fokuskan pada bagian tanaman yang terkena penyakit</li>
            <li>Ambil gambar dari jarak yang wajar (tidak terlalu jauh/dekat)</li>
            <li>Hindari bayangan yang mengganggu</li>
          </ul>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Upload option
    document.getElementById('upload-option').addEventListener('click', () => {
      document.getElementById('image-upload').click();
    });

    // Camera option
    document
      .getElementById('camera-option')
      .addEventListener('click', this.startCamera.bind(this));

    // Image upload handler
    document.getElementById('image-upload').addEventListener('change', (e) => {
      this.handleImageUpload(e.target.files[0]);
    });

    // Capture button
    document
      .getElementById('capture-btn')
      ?.addEventListener('click', this.captureImage.bind(this));

    // Cancel camera button
    document
      .getElementById('cancel-camera-btn')
      ?.addEventListener('click', () => this.stopCamera(true));

    // Retake button
    document
      .getElementById('retake-btn')
      ?.addEventListener('click', this.resetSelection.bind(this));

    // Detect button
    document
      .getElementById('detect-btn')
      ?.addEventListener('click', this.startDetection.bind(this));

    // Reset button
    document
      .getElementById('reset-btn')
      ?.addEventListener('click', this.resetSelection.bind(this));

    // Handle hash change to stop camera
    window.addEventListener('hashchange', this.stopCamera.bind(this));
  }

  async startCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const cameraFeed = document.getElementById('camera-feed');
      cameraFeed.srcObject = this.stream;

      document.getElementById('camera-preview').style.display = 'block';
      document.getElementById('image-preview').style.display = 'none';
      document.querySelector('.detection-options').style.display = 'none';
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.');
    }
  }

  stopCamera(showOptions = false) {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    const cameraPreview = document.getElementById('camera-preview');

    if (cameraPreview) {
      cameraPreview.style.display = 'none';
    }

    if (showOptions) {
      const options = document.querySelector('.detection-options');
      if (options) options.style.display = 'flex';
    }
  }

  captureImage() {
    const cameraFeed = document.getElementById('camera-feed');
    const canvas = document.createElement('canvas');

    canvas.width = cameraFeed.videoWidth;
    canvas.height = cameraFeed.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);

    this.selectedImage = canvas.toDataURL('image/jpeg');
    this.displayPreview(this.selectedImage);

    this.stopCamera();
  }

  handleImageUpload(file) {
    if (!file.type.match('image.*')) {
      alert('Silakan pilih file gambar.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      this.selectedImage = e.target.result;
      this.displayPreview(this.selectedImage);
    };
    reader.readAsDataURL(file);
  }

  displayPreview(imageSrc) {
    const previewImage = document.getElementById('preview-image');
    previewImage.src = imageSrc;

    document.getElementById('image-preview').style.display = 'block';
    document.querySelector('.detection-options').style.display = 'none';
    document.getElementById('detect-btn').disabled = false;
  }

  resetSelection() {
    this.selectedImage = null;
    document.getElementById('image-preview').style.display = 'none';
    document.querySelector('.detection-options').style.display = 'flex';
    document.getElementById('detect-btn').disabled = true;
    document.getElementById('farmer-notes').value = '';

    // Reset file input
    const fileInput = document.getElementById('image-upload');
    fileInput.value = '';
  }

  /**
   * Konversi DataURL (base64) ke Blob
   * @param {string} dataURL
   * @returns {Blob}
   */
  dataURLToBlob(dataURL) {
    const [meta, base64Data] = dataURL.split(',');
    const mimeMatch = meta.match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const binary = atob(base64Data);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
  }

  async startDetection() {
    if (!this.selectedImage) return;

    const notes = document.getElementById('farmer-notes').value;
    const detectBtn = document.getElementById('detect-btn');
    detectBtn.disabled = true;
    detectBtn.innerText = 'Mendeteksi Penyakit...';

    try {
      const imageBlob = this.dataURLToBlob(this.selectedImage);
      const result = await detectPlant(imageBlob, notes);

      // Simpan hasil ke localStorage
      localStorage.setItem('lastDetectionResult', JSON.stringify(result));

      showToast('success', 'Deteksi selesai!');
      window.location.hash = `#/detection/detect-results/${this.plantType.toLowerCase()}`;

      window.location.reload();
    } catch (err) {
      console.error('Detection error:', err);
      showToast('error', 'Gagal melakukan deteksi. Silakan coba lagi.');
      detectBtn.disabled = false;
      detectBtn.innerText = 'Mulai Deteksi';
    }
  }
}
