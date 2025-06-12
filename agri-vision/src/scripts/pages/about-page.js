export default class AboutPage {
  async render() {
    return `
      <section class="about-container">
        
        <!-- Section 1: Apa itu AgriVision -->
        <section class="section-1">
          <h1>Apa itu <span class="highlight">AgriVision</span>?</h1>
          <div class="cards">
            <div class="single-card" aria-label="Deteksi Penyakit">
              <p class="icon">🔍</p>
              <p>Deteksi Penyakit</p>
            </div>
            <div class="single-card" aria-label="Edukasi Pertanian">
              <p class="icon">👨‍🎓</p>
              <p>Edukasi Pertanian</p>
            </div>
            <div class="single-card" aria-label="Komunitas Petani">
              <p class="icon">🧑‍🌾</p>
              <p>Komunitas Petani</p>
            </div>
          </div>
        </section>

        <!-- Section 2: Mengapa Kami Peduli -->
        <section class="section-2">
          <h1>Mengapa Kami Peduli?</h1>
          <p>
            Indonesia sedang menghadapi tantangan nyata dalam dunia pertanian. 
            Di balik semangat besar untuk mencapai swasembada pangan, masih banyak petani yang kesulitan mendapatkan informasi akurat, 
            edukasi yang mudah dipahami, serta penanganan cepat terhadap penyakit tanaman. 
            Akibatnya, produktivitas menurun, dan kesejahteraan petani ikut terdampak.
          </p>
        </section>

        <!-- Section 3: Visi & Misi -->
        <section class="section-3">
          <h2>Visi Kami</h2>
          <p>
            Menjadi mitra digital terpercaya bagi petani Indonesia dalam membangun pertanian yang mandiri, modern, dan berkelanjutan.
          </p>
          <h2>Misi Kami</h2>
          <ul>
            <li>Menyediakan akses deteksi penyakit tanaman yang cepat dan akurat</li>
            <li>Mendorong kolaborasi dan pembelajaran antarpetani melalui komunitas</li>
            <li>Menyebarkan edukasi pertanian yang mudah dipahami</li>
          </ul>
        </section>

        <!-- Section CTA -->
        <section class="cta">
          <h1>Siap bertani lebih cerdas?</h1>
          <button class="about-cta-btn" id="about-cta-btn" aria-label="Coba Deteksinya Sekarang">
            Coba Deteksinya Sekarang
          </button>
        </section>

      </section>
    `;
  }

  async afterRender() {
    const ctaBtn = document.getElementById('about-cta-btn');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        window.location.hash = '#/detection';
      });
    }
  }
}
