const diseases = require('../diseases');

const AddDiseaseHandler = (request, h) => {
  const { id, diseaseName, description, symptoms, treatments, prevention } =
    request.payload;

  // Validasi Isian Form
  if (
    !id ||
    !diseaseName ||
    !description ||
    !symptoms ||
    !treatments ||
    !prevention
  ) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan penyakit tanaman, Mohon isi semua field.',
    });

    response.code(400);
    return response;
  }

  // Validasi Isian Form Gejala, Penanganan, Pencegahan harus berupa array
  if (
    !Array.isArray(symptoms) ||
    !Array.isArray(prevention) ||
    !Array.isArray(treatments) ||
    symptoms.length === 0 ||
    prevention.length === 0 ||
    treatments.length === 0
  ) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan penyakit tanaman bagian Gejala, Penanganan, Pencegahan harus berupa array.',
    });
    response.code(400);
    return response;
  }

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newDisease = {
    id,
    diseaseName,
    description,
    symptoms,
    treatments,
    prevention,
    insertedAt,
    updatedAt,
  };

  diseases.push(newDisease);

  const response = h.response({
    status: 'success',
    message: 'Penyakit tanaman berhasil ditambahkan',
  });

  response.code(201);
  return response;
};

const getAllDiseasesHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      diseases: diseases,
    },
  });

  response.code(200);
  return response;
};

const getDiseasesByIdHandler = (request, h) => {
  const { diseaseId } = request.params;

  const disease = diseases.filter(n => n.id === diseaseId)[0];

  if (disease !== undefined) {
    return {
      status: 'success',
      data: {
        disease,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Penyakit tanaman tidak ditemukan, Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editDiseaseByIdHandler = (request, h) => {
  const { diseaseId } = request.params;

  const { diseaseName, description, symptoms, treatments, prevention } =
    request.payload;

  // Validasi Isian Form
  if (!diseaseName || !description || !symptoms || !treatments || !prevention) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui penyakit tanaman, Mohon isi semua field.',
    });

    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const diseaseIndex = diseases.findIndex(n => n.id === diseaseId);

  // Validasi Id
  if (diseaseIndex !== -1) {
    diseases[diseaseIndex] = {
      ...diseases[diseaseIndex],
      diseaseName,
      description,
      symptoms,
      treatments,
      prevention,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Penyakit tanaman berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui penyakit tanaman. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const deleteDiseaseByIdHandler = (request, h) => {
  const { diseaseId } = request.params;

  const diseaseIndex = diseases.findIndex(n => n.id === diseaseId);

  if (diseaseIndex !== -1) {
    diseases.splice(diseaseIndex, 1);
    const response = h.response({
      status: 'success',
      message: 'Penyakit tanaman berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menghapus penyakit tanaman. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

module.exports = {
  AddDiseaseHandler,
  getAllDiseasesHandler,
  getDiseasesByIdHandler,
  editDiseaseByIdHandler,
  deleteDiseaseByIdHandler,
};
