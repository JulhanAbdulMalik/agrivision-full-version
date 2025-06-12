export default class HomePage {
  async render() {
    return `
      <section class="home-container">
        <div class="home-desc">
          <div class="header-container">
            <p class="welcome" id="welcome">Welcome to AgriVision</p>
          </div>
          <h1 class="tagline">
            Aplikasi Petani Cerdas untuk Deteksi Penyakit Tanaman dan Edukasi Pertanian
          </h1>
          <p class="description">
            Deteksi penyakit tanaman dan tingkatkan pengetahuan pertanian Anda.
            Unggah foto tanaman, dapatkan diagnosis instan, dan pelajari solusi pertanian modern.
          </p>
          <a href="#home-about-container" class="discover-link">Pelajari lebih lanjut</a>
          <img src="../../images/dashboard.jpg" class="dashboard-img" alt="farmer image" />
        </div>
      </section>

      <section class="home-about-container" id="home-about-container">
        <div class="about-wrapper">
          <div class="about-desc" id="about-desc">
            <h2 class="about-tagline">
              Kami Percaya, Teknologi Bisa Jadi Sahabat Terbaik Petani dan Pecinta Tanaman
            </h2>
            <p class="about-text">
              Di era pertanian modern, kami hadir untuk memberikan solusi yang tidak hanya cerdas, tapi juga ramah bagi petani dan tanaman. <br><br>
              Kami percaya bahwa setiap tanaman punya cerita dan teknologi bisa membantu kamu mendengarnya.
              Mulai dari mengenali gejala penyakit, merawat tanah, hingga memahami kebutuhan nutrisi
              kami hadir bukan sekadar aplikasi, tapi mitra bertani yang setia.
            </p>
          </div>
          <div class="about-img-wrapper">
            <img src="../../images/farmer.png" class="farmer-img" id="farmer-img" alt="farmer image" />
          </div>
        </div>
      </section>

      <section class="our-service" id="our-service">
        <h2 class="our-service-title">Tingkatkan Hasil Pertanian Anda</h2>
        <div class="service-container">

          <div class="service-item">
            <div class="image-card">
              <img src="../../images/detection.jpg" class="img-detection" />
            </div>
            <div class="featured-card">
              <h3 class="card-title">Deteksi Penyakit Tanaman</h3>
              <p>
                Unggah foto tanamanmu, sistem kami akan menganalisisnya secara otomatis untuk memberikan diagnosis cepat dan akurat.
                Dapatkan informasi lengkap mengenai jenis penyakit, gejala, dan solusi penanganannya semua dalam hitungan detik, langsung dari perangkatmu.
              </p>
              <a href="#/detection" class="btn-try-now">Coba Sekarang</a>
            </div>
            
          </div>
          <div class="service-item">
            <div class="image-card">
              <img src="../../images/education.png" class="img-detection" />
            </div>
            <div class="featured-card">
              <h3 class="card-title">Edukasi Pertanian</h3>
              <p>
                Pelajari teknik budidaya berbagai jenis tanaman, strategi pencegahan hama dan penyakit,
                serta tips pertanian modern yang dapat meningkatkan hasil panen dan menjaga keberlanjutan lingkungan.
              </p>
              <a href="#/education" class="btn-try-now">Belajar Sekarang</a>
            </div>
            
          </div>

          <div class="service-item">
            <div class="image-card">
              <img src="../../images/farmers-community.jpg" class="img-detection" />
            </div>
            <div class="featured-card">
              <h3 class="card-title">Komunitas Petani</h3>
              <p>
                Bergabunglah dengan komunitas petani digital yang saling berbagi pengalaman, solusi, dan inspirasi.
                Di sini, kamu bisa berdiskusi tentang masalah pertanian, bertukar tips budidaya,
                dan membangun jaringan dengan petani dari berbagai daerah.
              </p>
              <a href="##" class="btn-try-now" id="trynow-btn-community">Gabung Sekarang</a>
            </div>
          </div>

        </div>
      </section>

      <section class="testimonial-section">
        <div class="testimonial-container">
          <div class="testimonial-image">
            <img src="../../images/testimonial-image.jpg" alt="Foto Petani">
          </div>
          <div class="testimonial-content">
            <p class="testimonial-text">
              Aplikasi ini memberikan analisis dan solusi yang sangat baik untuk tanaman saya. Saya sangat merekomendasikannya kepada siapa pun yang ingin memperbaiki kesehatan tanaman mereka!
            </p>
            <div class="testimonial-author">
              <p class="author-name">Asep Sukma</p>
              <p class="author-info">Petani | Sukabumi</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const buttonCommunity = document.getElementById('trynow-btn-community');
    buttonCommunity.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Fitur komunitas akan segera hadir!');
    });
  }
}
