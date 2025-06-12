import { showToast } from '../utils/utils';

const CONFIG = {
  BASE_URL: 'https://api-agrivision.up.railway.app',
};

const BASE_URL = CONFIG.BASE_URL;

const ENDPOINTS = {
  EDUCATIONS: `${BASE_URL}/educations`,
  EDUCATION_DETAIL: (id) => `${BASE_URL}/educations/${id}`,

  DETECTIONS: `${BASE_URL}/detections`,
};

async function getAllEducations() {
  try {
    const response = await fetch(ENDPOINTS.EDUCATIONS);
    const responseJson = await response.json();

    return responseJson.data.educations;
  } catch (error) {
    showToast('error', 'Education not found!');
  }
}

/**
 * Kirim gambar dan catatan ke endpoint deteksi penyakit tanaman.
 *
 * @param {Blob} imageBlob - Blob gambar hasil konversi dataURL.
 * @param {string} notes - Keterangan tambahan dari petani.
 * @returns {Promise<Object>} - Hasil respons JSON dari API.
 */
export async function detectPlant(imageBlob, notes) {
  const formData = new FormData();
  formData.append('image', imageBlob, 'upload.jpg');
  formData.append('notes', notes);

  try {
    const response = await fetch(ENDPOINTS.DETECTIONS, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    showToast('error', 'Gagal terkirim ke server.');
    throw err;
  }
}

export { getAllEducations };
