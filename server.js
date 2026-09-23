import express from 'express';
import { loadModel, diffusion, SD_V2_1_1B_Q8_0 } from '@qvac/sdk';

const app = express();
app.use(express.json());
app.use(express.static('public'));

console.log('Loading diffusion model, please wait...');
const modelId = await loadModel({
  modelSrc: SD_V2_1_1B_Q8_0,
  modelType: 'diffusion',
  modelConfig: { prediction: 'v' },
  onProgress: (p) => process.stderr.write(`Downloading model: ${p.percentage?.toFixed(0)}%\r`)
});
console.log('\nModel loaded. Server ready.');

app.post('/generate', async (req, res) => {
  try {
    const prompt = (req.body.prompt || '').trim();

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt cannot be empty' });
    }

    console.log(`Generating: "${prompt}"`);
    console.time('generation-time');

    const { outputs } = diffusion({
      modelId,
      prompt,
      width: 512,
      height: 512,
      steps: 20
    });

    const buffers = await outputs;
    console.timeEnd('generation-time');

    res.set('Content-Type', 'image/png');
    res.send(Buffer.from(buffers[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});