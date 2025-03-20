// Hand Pose Drawing with Bubble Paint Effect
let video;
let handPose;
let hands = [];
let painting;
let px = 0;
let py = 0;
let sw = 8;
let paintPoints = []; // Array to store paint trail points
let bubbleImages = [];

function preload() {
  // Load bubble images
  let urls = [
    "https://cdn.glitch.global/6d4dbf90-4b7b-4ab6-8015-6cb42144bea1/bubblebig%20(1).png?v=1739589810782",
    "https://cdn.glitch.global/6d4dbf90-4b7b-4ab6-8015-6cb42144bea1/bubblemed.png?v=1739589820869",
    "https://cdn.glitch.global/6d4dbf90-4b7b-4ab6-8015-6cb42144bea1/d4daeb25-dfd2-45fa-bde7-825f8302de96.bubblesmall%20(1).png?v=1739589825090"
  ];
  for (let url of urls) {
    let img = loadImage(url);
    bubbleImages.push(img);
  }

  // Initialize HandPose model with flipped video input
  handPose = ml5.handpose({ flipHorizontal: true }, modelReady);
}

function modelReady() {
  console.log("HandPose model loaded!");
}

function setup() {
  createCanvas(640, 480);
  
  // Create an off-screen graphics buffer for painting
  painting = createGraphics(640, 480);
  painting.clear();
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  
  // Create erase button
  let eraseButton = createButton('Erase Canvas');
  eraseButton.position(20, 20);
  eraseButton.mousePressed(eraseCanvas);
  eraseButton.style('background-color', '#ff3366');
  eraseButton.style('color', 'white');
  eraseButton.style('border', 'none');
  eraseButton.style('padding', '10px 15px');
  eraseButton.style('border-radius', '5px');
  eraseButton.style('font-size', '16px');
  eraseButton.style('cursor', 'pointer');
  
  // Start detecting hands
  handPose.on("predict", gotHands);
}

function gotHands(results) {
  hands = results;
}

function draw() {
  image(video, 0, 0);
  
  if (hands.length > 0) {
    let rightHand, leftHand;
    // Separate detected hands into left and right
    for (let hand of hands) {
      if (hand.handedness === 'Right') {
        let index = hand.annotations.indexFinger[3];
        let thumb = hand.annotations.thumb[3];
        rightHand = { index, thumb };
      }
      if (hand.handedness === 'Left') {
        let index = hand.annotations.indexFinger[3];
        let thumb = hand.annotations.thumb[3];
        leftHand = { index, thumb };
      }
    }
    
    // Adjust stroke width based on left-hand pinch distance
    if (leftHand) {
      let { index, thumb } = leftHand;
      let x = (index[0] + thumb[0]) * 0.5;
      let y = (index[1] + thumb[1]) * 0.5;
      sw = dist(index[0], index[1], thumb[0], thumb[1]);
      fill(255, 0, 255);
      noStroke();
      circle(x, y, sw);
    }
    
    // Draw with right-hand pinch (bubble-style brush)
    if (rightHand) {
      let { index, thumb } = rightHand;
      let x = (index[0] + thumb[0]) * 0.5;
      let y = (index[1] + thumb[1]) * 0.5;
      
      let d = dist(index[0], index[1], thumb[0], thumb[1]);
      if (d < 20) {
        // Add current point to paint trail with current timestamp
        paintPoints.push({
          x: x,
          y: y,
          size: sw * 0.5,
          time: millis()
        });

        // Draw bubbles instead of lines
        for (let i = 0; i < 3; i++) {
          let img = random(bubbleImages);
          let offsetX = random(-20, 20);
          let offsetY = random(-20, 20);
          painting.image(img, x + offsetX, y + offsetY, sw * 2, sw * 2);
        }
      }
      px = x;
      py = y;
    }
  }
  
  // Draw the paint trail
  drawPaintTrail();
  
  // Overlay painting on top of the video
  image(painting, 0, 0);
}

function drawPaintTrail() {
  const currentTime = millis();
  const trailDuration = 2000; // Trail fade-out time
  
  for (let i = 0; i < paintPoints.length; i++) {
    const point = paintPoints[i];
    const age = currentTime - point.time;
    
    if (age > trailDuration) {
      paintPoints.splice(i, 1);
      i--;
      continue;
    }
    
    // Trail effect using faded transparent bubbles
    let opacity = map(age, 0, trailDuration, 255, 0);
    let img = random(bubbleImages);
    tint(255, opacity);
    image(img, point.x, point.y, point.size * 2, point.size * 2);
    noTint();
  }

  // Limit the number of points in the trail
  if (paintPoints.length > 100) {
    paintPoints.splice(0, paintPoints.length - 100);
  }
}

function eraseCanvas() {
  // Clear the painting graphics buffer
  painting.clear();
  
  // Clear the paint trail points array
  paintPoints = [];
  
  // Reset brush position
  px = 0;
  py = 0;
  
  // Give visual feedback
  let flashOverlay = color(255, 255, 255, 100);
  fill(flashOverlay);
  rect(0, 0, width, height);
}
