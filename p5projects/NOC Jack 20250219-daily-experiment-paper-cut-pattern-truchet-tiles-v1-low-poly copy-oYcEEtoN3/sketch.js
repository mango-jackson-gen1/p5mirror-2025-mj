/*
 * Main Sketch
 * Jack B. Du (github@jackbdu.com)
 * https://instagram.com/jackbdu/
 */

const sketch = (p) => {
  p.specs = {
    fps: 60,
    loopFramesNum: 240,
    outputWidth: "auto",
    outputHeight: "auto",
    // showStats: true,
    canvas: undefined,
  };

  p.options = {
    grid: {
      colsNum: 16 * 2,
      rowsNum: 9 * 2,
      loopFramesNum: p.specs.loopFramesNum,
      innerDetails: 3,
      outterDetails: 3,
      choices: [0, 1],
      minCutWidth: 0.1,
      maxCutWidth: 1 / 3,
      innerToothed: false,
      outterToothed: false,
      scaleFactor: 0.9,
    },
  };

  p.preload = () => {};

  p.setup = () => {
    // p.noiseDetail(3, 0.5);
    p.randomSeed(0);
    p.updateCanvas(p.specs.outputWidth, p.specs.outputHeight);
    p.frameRate(p.specs.fps);
    p.grid = new Grid(p, p.options.grid);
  };

  p.myUpdate = () => {};

  p.myDraw = () => {
    p.grid.cut();
  };

  p.windowResized = (event) => {
    p.updateCanvas(p.specs.outputWidth, p.specs.outputHeight);
    p.grid.canvasResized();
  };
};

let p5sketch = new p5(sketch);
