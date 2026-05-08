import screenshot from 'screenshot-desktop';
import { createCanvas, type Canvas } from 'canvas';
import { createWorker, PSM } from 'tesseract.js';
import type { FindRes, Rect, ScreenCapture } from './needle.js';
import { matFromBuffer } from './needle.js';

type OCRWorker = Awaited<ReturnType<typeof createWorker>>;
type OCRWorkerParams = Parameters<OCRWorker['setParameters']>[0];

const DEFAULT_OCR_SCALE = 2;
const DEFAULT_OCR_THRESHOLD = 180;
const NUMBER_OCR_CHAR_WHITELIST = '0123456789';
const TEXT_OCR_CHAR_WHITELIST = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';

export interface OcrImageOptions {
  scale?: number;
  threshold?: number | false;
}

export interface TextOcrOptions extends OcrImageOptions {
  pageSegMode?: PSM;
}

async function createConfiguredWorker(params: OCRWorkerParams): Promise<OCRWorker> {
  const worker = await createWorker('eng');
  await worker.setParameters(params);
  return worker;
}

const numberOcrWorkerPromise: Promise<OCRWorker> = createConfiguredWorker({
  tessedit_char_whitelist: NUMBER_OCR_CHAR_WHITELIST,
  tessedit_pageseg_mode: PSM.SINGLE_LINE,
});

const textOcrWorkerPromise: Promise<OCRWorker> = createConfiguredWorker({
  preserve_interword_spaces: '1',
  tessedit_char_whitelist: TEXT_OCR_CHAR_WHITELIST,
  tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
});

function buildOcrCanvas(rect: Rect, screenCanvas: Canvas, options: OcrImageOptions = {}): Canvas {
  const scale = options.scale ?? DEFAULT_OCR_SCALE;
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

  if (options.threshold !== false) {
    const threshold = options.threshold ?? DEFAULT_OCR_THRESHOLD;
    const imageData = cropCtx.getImageData(0, 0, cropCanvas.width, cropCanvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = (data[i]! + data[i + 1]! + data[i + 2]!) / 3;
      const bw = v > threshold ? 255 : 0;
      data[i] = bw;
      data[i + 1] = bw;
      data[i + 2] = bw;
    }
    cropCtx.putImageData(imageData, 0, 0);
  }

  return cropCanvas;
}

function normalizeMultilineText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .toLowerCase()
    .replace(/[^a-z0-9 \n]/g, '')
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

export async function readNumberInRect(
  rect: Rect,
  screenCanvas: Canvas,
  options: OcrImageOptions = {},
): Promise<string> {
  const cropCanvas = buildOcrCanvas(rect, screenCanvas, options);
  const worker = await numberOcrWorkerPromise;
  const result = await worker.recognize(cropCanvas.toBuffer('image/png'));
  return result.data?.text?.replace(/\D/g, '') ?? '';
}

export async function readTextInRect(
  rect: Rect,
  screenCanvas: Canvas,
  options: TextOcrOptions = {},
): Promise<string> {
  const cropCanvas = buildOcrCanvas(rect, screenCanvas, options);
  const worker = await textOcrWorkerPromise;
  await worker.setParameters({
    preserve_interword_spaces: '1',
    tessedit_char_whitelist: TEXT_OCR_CHAR_WHITELIST,
    tessedit_pageseg_mode: options.pageSegMode ?? PSM.SINGLE_BLOCK,
  });

  const result = await worker.recognize(cropCanvas.toBuffer('image/png'));
  return normalizeMultilineText(result.data?.text ?? '');
}

export async function readNumber(rect: FindRes): Promise<string> {
  const screenBuf = await screenshot({ format: 'png' });
  const { canvas } = await matFromBuffer(screenBuf);
  return readNumberInRect(rect, canvas as unknown as Canvas);
}

export async function readText(rect: FindRes, options?: TextOcrOptions): Promise<string> {
  const screenBuf = await screenshot({ format: 'png' });
  const { canvas } = await matFromBuffer(screenBuf);
  return readTextInRect(rect, canvas as unknown as Canvas, options);
}

function rectRelativeToScreen(screen: ScreenCapture, rect: Rect): Rect {
  return {
    x: rect.x - screen.x,
    y: rect.y - screen.y,
    w: rect.w,
    h: rect.h,
  };
}

function rectInFound(found: FindRes, relativeRect?: Rect): Rect {
  return relativeRect
    ? {
        x: found.x + relativeRect.x,
        y: found.y + relativeRect.y,
        w: relativeRect.w,
        h: relativeRect.h,
      }
    : found;
}

export async function readNumberInScreen(
  screen: ScreenCapture,
  rect: Rect,
  options?: OcrImageOptions,
): Promise<string> {
  return readNumberInRect(rectRelativeToScreen(screen, rect), screen.canvas, options);
}

export async function readTextInScreen(
  screen: ScreenCapture,
  rect: Rect,
  options?: TextOcrOptions,
): Promise<string> {
  return readTextInRect(rectRelativeToScreen(screen, rect), screen.canvas, options);
}

export async function readNumberInFound(
  screen: ScreenCapture,
  found: FindRes,
  relativeRect?: Rect,
  options?: OcrImageOptions,
): Promise<string> {
  return readNumberInScreen(screen, rectInFound(found, relativeRect), options);
}

export async function readTextInFound(
  screen: ScreenCapture,
  found: FindRes,
  relativeRect?: Rect,
  options?: TextOcrOptions,
): Promise<string> {
  return readTextInScreen(screen, rectInFound(found, relativeRect), options);
}
