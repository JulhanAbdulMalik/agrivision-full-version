import { getAllEducations } from '../data/api.js';

export default class EducationDetailPage {
  constructor() {
    this.caseName = '';
  }

  async render() {
    return `
      <section class="edu-detail-container">
        <div class="back-button-container">
          <button id="back-button" class="back-button">Kembali</button>
        </div>

        <div id="disease-detail" class="disease-detail">
          <!-- Content Dynamis di sini -->
        </div>
      </section>
    `;
  }

  async afterRender() {
    const { id } = await import('../routes/url-parser.js').then((module) =>
      module.parseActivePathname(),
    );
    this.caseName = id.replace(/-/g, ' ');

    const database = await getAllEducations();

    const diseaseEducation = database.find(
      (item) => item.diseaseName.toLowerCase() === this.caseName.toLowerCase(),
    );

    if (diseaseEducation) {
      const detailContainer = document.getElementById('disease-detail');
      detailContainer.innerHTML =
        this.createDiseaseDetailHTML(diseaseEducation);
    }

    document.getElementById('back-button').addEventListener('click', () => {
      window.history.back();
    });
  }

  createDiseaseDetailHTML(diseaseEducation) {
    return `
      <h1 class="disease-title">${diseaseEducation.diseaseName}</h1>
      <br>

      <div class="disease-image-container">
        <img src="/images/education-images/${diseaseEducation.diseaseName.toLowerCase().replace(/\s+/g, '-')}.jpg" class="disease-image" alt="${diseaseEducation.diseaseName}">
      </div>
      
      <div class="disease-section">
        <h2>Gejala</h2>
        <p>${diseaseEducation.symptoms}</p>
      </div>
      
      <div class="disease-section">
        <h2>Penyebab</h2>
        <p>${diseaseEducation.cause}</p>
      </div>
      
      <div class="disease-section">
        <h2>Rekomendasi Penanganan</h2>
        <h3>Alami:</h3>
        <p>${diseaseEducation.treatment.biological}</p>
        <h3>Kimiawi:</h3>
        <p>${diseaseEducation.treatment.chemical}</p>
      </div>
      
      <div class="disease-section">
        <h2>Pencegahan</h2>
        <ul>
          ${diseaseEducation.prevention.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>

      <div class="disease-section">
        <h2>Pelajari Selengkapnya</h2>
        <div class="video-container"><iframe width="760" height="400" 
        src="${diseaseEducation.videoEmbed}" 
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
      </div>
    `;
  }
}
