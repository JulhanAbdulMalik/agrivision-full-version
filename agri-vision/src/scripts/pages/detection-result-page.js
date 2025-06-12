import { showToast } from '../utils/utils';
import html2pdf from 'html2pdf.js';

export default class DetectionResultPage {
  constructor(plantType) {
    this.plantType = plantType;

    this.detectionResult = JSON.parse(
      localStorage.getItem('lastDetectionResult'),
    );
  }

  async render() {
    const {
      insertedAt,
      diseaseName,
      description,
      symptoms = [],
      treatments = [],
      prevention = [],
      confidence,
    } = this.detectionResult;

    return `
      <section class="detection-result-container">
        <div class="result-header">
          <h1>Hasil Deteksi Penyakit ${this.plantType}</h1>
          <div class="result-meta">
            <span class="timestamp">${insertedAt.split('T')[0]}</span>
            <span class="confidence ${this.getConfidenceClass()}">
              Akurasi: <strong>${confidence}</strong>
            </span>
          </div>
        </div>
        
        <div class="result-summary">
          <div class="result-card disease-card">
            <h2>Terdeteksi Penyakit:</h2>
            <h3>${diseaseName}</h3>
            <p>${description}</p>
          </div>
        </div>
        
        <div class="result-details">
          <div class="detail-card">
            <h3>Gejala</h3>
            <ol class="treatment-steps">
              ${symptoms
                .map(
                  (s, i) => `
                <li>
                  <span class="step-number">${i + 1}</span>
                  <span class="step-content">${s}</span>
                </li>
              `,
                )
                .join('')}
            </ol>
          </div>

          <div class="detail-card">
            <h3>Penanganan</h3>
            <ol class="treatment-steps">
              ${treatments
                .map(
                  (t, i) => `
                <li>
                  <span class="step-number">${i + 1}</span>
                  <span class="step-content">${t}</span>
                </li>
              `,
                )
                .join('')}
            </ol>
          </div>

          <div class="detail-card">
            <h3>Pencegahan</h3>
            <ol class="treatment-steps">
              ${prevention
                .map(
                  (p, i) => `
                <li>
                  <span class="step-number">${i + 1}</span>
                  <span class="step-content">${p}</span>
                </li>
              `,
                )
                .join('')}
            </ol>
          </div>
        </div>
        
        <div class="result-actions">
          <button id="save-report-btn" class="btn-primary">
            Simpan Laporan
          </button>
          <button id="new-detection-btn" class="btn-secondary">
            Deteksi Baru
          </button>
          <button id="expert-help-btn" class="btn-outline">
            Konsultasi Ahli
          </button>
        </div>
        
        <div class="additional-resources">
          <h3>Sumber Daya Tambahan</h3>
          <div class="resources-grid">
            <a class="resource-card">
              <h4>▶️</h4>
              <span>Video Penanganan</span>
            </a>
            <a class="resource-card">
              <h4>📄</h4>
              <span>Panduan PDF</span>
            </a>
            <a class="resource-card">
              <h4>🛒</h4>
              <span>Produk Rekomendasi</span>
            </a>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    document
      .getElementById('new-detection-btn')
      ?.addEventListener('click', () => {
        window.location.hash = `#/detection/${this.plantType.toLowerCase()}`;
      });

    document
      .getElementById('save-report-btn')
      ?.addEventListener('click', this.saveReport.bind(this));
    document
      .getElementById('expert-help-btn')
      ?.addEventListener('click', this.requestExpertHelp.bind(this));
  }

  getConfidenceClass() {
    if (!this.detectionResult || !this.detectionResult.confidence) return '';

    const confidenceValue = parseFloat(
      this.detectionResult.confidence.replace('%', ''),
    );

    if (confidenceValue > 80) return 'high-confidence';
    if (confidenceValue > 50) return 'medium-confidence';
    return 'low-confidence';
  }

  saveReport() {
    const element = document.querySelector('.detection-result-container');

    const opt = {
      margin: 0.2,
      filename: `laporan-deteksi-${this.plantType.toLowerCase()}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 1.5 },
      jsPDF: { unit: 'cm', format: 'legal', orientation: 'landscape' },
    };

    if (element) {
      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          showToast('success', 'Laporan berhasil disimpan sebagai PDF!');
        })
        .catch((err) => {
          console.error('Gagal menyimpan PDF:', err);
          showToast('error', 'Gagal menyimpan laporan!');
        });
    } else {
      showToast('error', 'Konten laporan tidak ditemukan!');
    }
  }

  requestExpertHelp() {
    showToast('success', 'Permintaan konsultasi ahli telah dikirim!');
  }
}
