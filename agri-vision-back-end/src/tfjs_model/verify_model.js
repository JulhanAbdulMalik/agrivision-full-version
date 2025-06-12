const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

const MODEL_PATH = path.resolve(__dirname, './model.json');

async function verifyModel() {
  try {
    console.log('Verifying model at:', MODEL_PATH);

    // Baca file model
    const modelJson = JSON.parse(fs.readFileSync(MODEL_PATH, 'utf8'));
    console.log(
      'Model config:',
      JSON.stringify(modelJson.modelTopology.model_config, null, 2)
    );

    // Coba load model
    const model = await tf.loadLayersModel(`file://${MODEL_PATH}`);
    console.log('✅ Model verified successfully');
    console.log('Model summary:');
    model.summary();
  } catch (error) {
    console.error('❌ Model verification failed:', error);
  }
}

verifyModel();
