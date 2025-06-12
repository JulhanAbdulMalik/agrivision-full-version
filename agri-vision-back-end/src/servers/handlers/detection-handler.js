const tf = require('@tensorflow/tfjs-node');
const diseases = require('../diseases');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

// Dapatkan path absolut ke folder model
const MODEL_DIR = path.resolve(__dirname, '../../tfjs_model/dummy');
const MODEL_JSON_PATH = path.join(MODEL_DIR, 'model.json');

console.log(`ℹ️ Model path: ${MODEL_JSON_PATH}`);

let modelCache = null;

const loadModel = async () => {
  if (modelCache) return modelCache;

  try {
    // Verifikasi file model.json ada
    if (!fs.existsSync(MODEL_JSON_PATH)) {
      throw new Error(`Model file not found at: ${MODEL_JSON_PATH}`);
    }

    // Verifikasi weight files ada
    const weightsManifest = require(MODEL_JSON_PATH).weightsManifest;
    for (const manifest of weightsManifest) {
      for (const weightPath of manifest.paths) {
        const fullPath = path.join(MODEL_DIR, weightPath);
        if (!fs.existsSync(fullPath)) {
          throw new Error(`Weight file not found: ${fullPath}`);
        }
      }
    }

    console.log('🌀 Loading TensorFlow model...');
    modelCache = await tf.loadLayersModel(`file://${MODEL_JSON_PATH}`);
    console.log('✅ Model loaded successfully');
    return modelCache;
  } catch (error) {
    console.error('❌ Error loading model:', error);
    throw new Error(`Failed to load ML model: ${error.message}`);
  }
};

const preprocessImage = buffer => {
  try {
    const tensor = tf.node.decodeImage(buffer, 3);
    const resized = tf.image.resizeBilinear(tensor, [150, 150]);
    const normalized = resized.div(255.0);
    const batched = normalized.expandDims(0);

    tensor.dispose();
    resized.dispose();

    return batched;
  } catch (error) {
    console.error('❌ Image preprocessing error:', error);
    throw new Error('Invalid image format');
  }
};

const detectionHandler = async (request, h) => {
  if (!request.payload || !request.payload.image) {
    return h.response({ error: 'No image uploaded' }).code(400);
  }

  try {
    const imageStream = request.payload.image;
    const chunks = [];

    // Baca stream menjadi buffer
    for await (const chunk of imageStream) {
      chunks.push(chunk);
    }

    const imageBuffer = Buffer.concat(chunks);

    // Validasi buffer
    if (!imageBuffer || imageBuffer.length === 0) {
      return h.response({ error: 'Empty image file' }).code(400);
    }

    // Load model
    const model = await loadModel();

    // Preprocess gambar
    const tensor = preprocessImage(imageBuffer);

    // Prediksi
    const predictions = model.predict(tensor);
    const predictionsData = Array.from(await predictions.data());

    // Cari indeks dengan confidence tertinggi
    const maxIndex = predictionsData.indexOf(Math.max(...predictionsData));
    const confidence = (predictionsData[maxIndex] * 100).toFixed(2);

    // Cari data penyakit
    const diseaseId = `class_${maxIndex}`;

    const diseaseData = diseases.find(d => d.id === diseaseId);

    if (!diseaseData) {
      return h
        .response({
          error: 'Disease data not found',
          detected_class: diseaseId,
          confidence: `${confidence}%`,
        })
        .code(404);
    }

    // Format response
    const response = {
      ...diseaseData,
      confidence: `${confidence}%`,
      detected_class: diseaseId,
    };

    // Bersihkan memori tensor
    tensor.dispose();
    predictions.dispose();

    return h.response(response).code(200);
  } catch (error) {
    console.error('🔥 Detection error:', error);
    return h
      .response({
        error: 'Detection failed',
        message: error.message,
        details:
          process.env.NODE_ENV === 'development' ? error.stack : undefined,
      })
      .code(500);
  }
};

module.exports = detectionHandler;
