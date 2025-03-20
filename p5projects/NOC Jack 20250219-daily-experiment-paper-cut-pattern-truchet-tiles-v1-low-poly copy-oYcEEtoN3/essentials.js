/*
 * Essentials
 * Essential functions that should not be removed
 * Jack B. Du (github@jackbdu.com)
 * https://instagram.com/jackbdu/
 */

p5sketch.updateCanvas = (outputWidth = "auto", outputHeight = "auto") => {
  const pd = p5sketch.pixelDensity();
  const canvasWidth =
    outputWidth && outputWidth !== "auto" ? outputWidth / pd : p5sketch.windowWidth;
  const canvasHeight =
    outputHeight && outputHeight !== "auto"
      ? outputHeight / pd
      : p5sketch.windowHeight;
  if (canvasWidth !== p5sketch.width || canvasHeight !== p5sketch.height) {
    if (!p5sketch.specs.canvas) {
      p5sketch.specs.canvas = p5sketch.createCanvas(canvasWidth, canvasHeight);
    } else {
      p5sketch.resizeCanvas(canvasWidth, canvasHeight);
    }
  }
};

p5sketch.draw = () => {
  if (p5sketch.myUpdate) p5sketch.myUpdate();
  if (p5sketch.myPreDraw) p5sketch.myPreDraw();
  if (p5sketch.myDraw) p5sketch.myDraw();
  if (p5sketch.myPostDraw) p5sketch.myPostDraw();
};