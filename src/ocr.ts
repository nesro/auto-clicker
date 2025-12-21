import screenshot from 'screenshot-desktop';
import { createCanvas, type Canvas } from 'canvas';
import { createWorker, PSM } from 'tesseract.js';
import type { FindRes } from './needle.js';
import { matFromBuffer } from './needle.js';

type OCRWorker = Awaited<ReturnType<typeof createWorker>>;

const ocrWorkerPromise: Promise<OCRWorker> = (async () => {
  const worker = await createWorker();
  await (worker as any).loadLanguage('eng');
  await (worker as any).initialize('eng');
  await worker.setParameters({
    tessedit_char_whitelist: '0123456789',
    tessedit_pageseg_mode: PSM.SINGLE_LINE,
  });
  return worker;
})();

export async function readNumberInRect(rect: FindRes, screenCanvas: Canvas): Promise<string> {
  const scale = 2;
  const cropCanvas = createCanvas(rect.w * scale, rect.h * scale);
  const cropCtx = cropCanvas.getContext('2d');
  if (!cropCtx) {
    throw new Error('Could not acquire 2d context for OCR crop');
  }
  cropCtx.imageSmoothingEnabled = false;
  cropCtx.drawImage(
    screenCanvas,
    rect.x,
    rect.y,
    rect.w,
    rect.h,
    0,
    0,
    rect.w * scale,
    rect.h * scale,
  );

  const imageData = cropCtx.getImageData(0, 0, cropCanvas.width, cropCanvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const v = (data[i]! + data[i + 1]! + data[i + 2]!) / 3;
    const bw = v > 180 ? 255 : 0;
    data[i] = bw;
    data[i + 1] = bw;
    data[i + 2] = bw;
  }
  cropCtx.putImageData(imageData, 0, 0);

  const worker = await ocrWorkerPromise;
  const result = await worker.recognize(cropCanvas.toBuffer('image/png'));
  return result.data?.text?.replace(/\D/g, '') ?? '';
}

export async function readNumber(rect: FindRes): Promise<string> {
  const screenBuf = await screenshot({ format: 'png' });
  const { canvas } = await matFromBuffer(screenBuf);
  return readNumberInRect(rect, canvas as unknown as Canvas);
}
