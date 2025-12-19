import { Button, Point, mouse } from '@nut-tree-fork/nut-js';

mouse.config.autoDelayMs = 0;

export async function clickAt(x: number, y: number) {
  const target = new Point(Math.round(x), Math.round(y));
  await mouse.setPosition(target);
  await mouse.click(Button.LEFT);
}
