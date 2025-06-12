import { showToast } from '../utils/utils';

export default class DetectionPage {
  async render() {
    return `
      <section class="detect-container">
      
        <div class="detect-content">
          <h1 class="detect-title">Deteksi Penyakit Tanaman</h1>
          <p class="detect-subtitle">Identifikasi penyakit tanaman secara cepat dan akurat. Silahkan pilih jenis tanaman yang ingin kamu deteksi</p>

          <div class="detect-grid">
            <!-- Card Padi -->
            <div class="detect-card">
              <div class="card-icon">🌾</div>
              <h2 class="card-title">Padi</h2>
              <p class="card-desc">Deteksi berbagai penyakit yang sering menyerang tanaman padi secara otomatis.</p>
              <button class="detection-btn" data-plant="padi">Deteksi Sekarang</button>
            </div>

            <!-- Card Jagung -->
            <div class="detect-card">
              <div class="card-icon">🌽</div>
              <h2 class="card-title">Jagung</h2>
              <p class="card-desc">Temukan jenis penyakit pada tanaman jagung dan cara penanganannya.</p>
              <button class="detection-btn" data-plant="jagung">Deteksi Sekarang</button>
            </div>

            <!-- Card Cabai -->
            <div class="detect-card">
              <div class="card-icon">🌶️</div>
              <h2 class="card-title">Cabai</h2>
              <p class="card-desc">Identifikasi gejala penyakit pada tanaman cabai dengan mudah dan cepat.</p>
              <button class="detection-btn" data-plant="cabai">Deteksi Sekarang</button>
            </div>

            <!-- Card Tomat -->
            <div class="detect-card">
              <div class="card-icon">🍅</div>
              <h2 class="card-title">Tomat</h2>
              <p class="card-desc">Lakukan deteksi berdasarkan gejala penyakit pada tanaman tomat.</p>
              <button class="detection-btn" data-plant="tomat">Deteksi Sekarang</button>
            </div>
            
          </div>
        </div>

      </section>
    `;
  }

  async afterRender() {
    document.querySelectorAll('.detection-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const plantType = button.getAttribute('data-plant');
        if (plantType === 'padi') {
          window.location.hash = `#/detection/${plantType}`;
        } else {
          showToast('error', 'Deteksi Tanaman belum tersedia!');
        }
      });
    });
  }
}
