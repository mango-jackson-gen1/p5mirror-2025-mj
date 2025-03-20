/*
Based on p5.js demos by Matt DesLauriers
https://github.com/mattdesl/workshop-p5-intro

The MIT License (MIT) Copyright (c) 2019 Matt DesLauriers

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(100,20);

  let minDimension = min(width, height);
  
  strokeWeight(minDimension * 0.015);

  let xStart = width * 0.25;
  let xEnd = width * 0.75;
  let x = map(sin(angle), -1, 1, xStart, xEnd);

  let y = height * 0.5;
  let diam = minDimension * 0.05;
let sinVal = sin(angle); 

// Red: 255 (pink) → 173 (blue)
let r = map(sinVal, -1, 1, 255, 173);

// Green: 182 (pink) → 216 (blue)
let g = map(sinVal, -1, 1, 182, 216);

// Blue: 193 (pink) → 230 (blue)
let b = map(sinVal, -1, 1, 193, 230);

// Set stroke color using RGB values
stroke(r, g, b);

  circle(x, y, diam);

  angle += 0.05;
}
