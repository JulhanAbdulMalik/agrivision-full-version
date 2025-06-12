const detectionHandler = require('./handlers/detection-handler');
const {
  getAllDiseasesHandler,
  AddDiseaseHandler,
  getDiseasesByIdHandler,
  editDiseaseByIdHandler,
  deleteDiseaseByIdHandler,
} = require('./handlers/disease-handler');

const {
  addEducationHandler,
  getAllEducationHandler,
  getEducationByIdHandler,
  editEducationByIdHandler,
  deleteEducationByIdHandler,
} = require('./handlers/education-handler');

const routes = [
  // Edukasi
  {
    method: 'POST',
    path: '/educations',
    handler: addEducationHandler,
  },
  {
    method: 'GET',
    path: '/educations',
    handler: getAllEducationHandler,
  },
  {
    method: 'GET',
    path: '/educations/{educationId}',
    handler: getEducationByIdHandler,
  },
  {
    method: 'PUT',
    path: '/educations/{educationId}',
    handler: editEducationByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/educations/{educationId}',
    handler: deleteEducationByIdHandler,
  },

  // Penyakit
  {
    method: 'POST',
    path: '/diseases',
    handler: AddDiseaseHandler,
  },
  {
    method: 'GET',
    path: '/diseases',
    handler: getAllDiseasesHandler,
  },
  {
    method: 'GET',
    path: '/diseases/{diseaseId}',
    handler: getDiseasesByIdHandler,
  },
  {
    method: 'PUT',
    path: '/diseases/{diseaseId}',
    handler: editDiseaseByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/diseases/{diseaseId}',
    handler: deleteDiseaseByIdHandler,
  },

  // Deteksi Penyakit (Baru)
  {
    method: 'POST',
    path: '/detections',
    handler: detectionHandler,
    options: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        multipart: { output: 'stream' },
        maxBytes: 10 * 1024 * 1024, // 10MB
      },
    },
  },
];

module.exports = routes;
