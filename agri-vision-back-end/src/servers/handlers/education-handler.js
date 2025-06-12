const { nanoid } = require('nanoid');
const diseaseEducation = require('../educations');

const addEducationHandler = (request, h) => {
  const {
    diseaseName,
    characteristics,
    symptoms,
    cause,
    prevention,
    treatment,
    videoEmbed,
  } = request.payload;

  // Validasi Isian Form
  if (
    !diseaseName ||
    !characteristics ||
    !symptoms ||
    !cause ||
    !prevention ||
    !treatment ||
    !videoEmbed
  ) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan edukasi penyakit tanaman, Mohon isi semua field.',
    });

    response.code(400);
    return response;
  }

  // Validasi Isian Form Penanganan
  if (!treatment.biological || !treatment.chemical) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan edukasi penyakit. Penanganan (biologis dan kimiawi) wajib diisi.',
    });
    response.code(400);
    return response;
  }

  // Validasi Isian Form Pencegahan harus berupa array
  if (!Array.isArray(prevention) || prevention.length === 0) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan edukasi. Field pencegahan harus berupa array dan tidak boleh kosong.',
      })
      .code(400);
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newEducation = {
    id,
    diseaseName,
    characteristics,
    symptoms,
    cause,
    prevention,
    treatment,
    videoEmbed,
    insertedAt,
    updatedAt,
  };

  diseaseEducation.push(newEducation);

  const response = h.response({
    status: 'success',
    message: 'Edukasi penyakit tanaman berhasil ditambahkan',
    data: {
      educationId: id,
    },
  });

  response.code(201);
  return response;
};

const getAllEducationHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      educations: diseaseEducation,
    },
  });

  response.code(200);
  return response;
};

const getEducationByIdHandler = (request, h) => {
  const { educationId } = request.params;

  const education = diseaseEducation.filter(n => n.id === educationId)[0];

  if (education !== undefined) {
    return {
      status: 'success',
      data: {
        education,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Edukasi penyakit tanaman tidak ditemukan, Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editEducationByIdHandler = (request, h) => {
  const { educationId } = request.params;

  const {
    diseaseName,
    characteristics,
    symptoms,
    cause,
    prevention,
    treatment,
    videoEmbed,
  } = request.payload;

  if (
    !diseaseName ||
    !characteristics ||
    !symptoms ||
    !cause ||
    !prevention ||
    !treatment ||
    !videoEmbed
  ) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui edukasi penyakit tanaman. Mohon isi semua field.',
    });

    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const educationIndex = diseaseEducation.findIndex(n => n.id === educationId);

  // Validasi Id
  if (educationIndex !== -1) {
    diseaseEducation[educationIndex] = {
      ...diseaseEducation[educationIndex],
      diseaseName,
      characteristics,
      symptoms,
      cause,
      prevention,
      treatment,
      videoEmbed,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Edukasi penyakit tanaman berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui edukasi penyakit tanaman. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const deleteEducationByIdHandler = (request, h) => {
  const { educationId } = request.params;

  const educationIndex = diseaseEducation.findIndex(n => n.id === educationId);

  if (educationIndex !== -1) {
    diseaseEducation.splice(educationIndex, 1);
    const response = h.response({
      status: 'success',
      message: 'Edukasi penyakit tanaman berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menghapus edukasi penyakit tanaman. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

module.exports = {
  addEducationHandler,
  getAllEducationHandler,
  getEducationByIdHandler,
  editEducationByIdHandler,
  deleteEducationByIdHandler,
};
