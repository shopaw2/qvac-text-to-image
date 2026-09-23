# QVAC Text-to-Image

A small web app that generates images from text prompts entirely on-device using Tether's QVAC SDK — no cloud API, no usage bill, no data ever leaves your machine.

## What it does

Type a text prompt into the web UI and it generates a 512x512 image locally using Stable Diffusion 2.1, running fully on-device via QVAC's `diffusion()` function.

## QVAC SDK functions used

- `loadModel()` — loads the `SD_V2_1_1B_Q8_0` diffusion model
- `diffusion()` — generates the image from the text prompt

## SDK version

`@qvac/sdk` 0.20.0

## Install

```
npm install
```

## Run

```
node server.js
```

Then open `http://localhost:3000` in your browser, type a prompt, and click **Generate**. The generated image appears below once it's done.

On first run, the model downloads automatically (a few hundred MB to a few GB depending on the model). Subsequent runs use the cached model and run fully offline. Generation itself can take from several seconds to a couple of minutes depending on your hardware.

## License

MIT