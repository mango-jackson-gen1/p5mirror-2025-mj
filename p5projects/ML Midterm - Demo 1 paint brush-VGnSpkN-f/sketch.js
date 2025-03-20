// Hand Pose Drawing with Variable Stroke Width and Pink Paint Trail
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose
let video;
let handPose;
let hands = [];
let painting;
let px = 0;
let py = 0;
let sw = 8;
let paintPoints = []; // Array to store paint trail points

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  // Log detected hand data to the console
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  
  // Create an off-screen graphics buffer for painting
  painting = createGraphics(640, 480);
  painting.clear();
  video = createCapture(VIDEO, { flipped: true });
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
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0);
  
  if (hands.length > 0) {
    let rightHand, leftHand;
    // Separate detected hands into left and right
    for (let hand of hands) {
      if (hand.handedness == 'Right') {
        let index = hand.index_finger_tip;
        let thumb = hand.thumb_tip;
        rightHand = { index, thumb };
      }
      if (hand.handedness == 'Left') {
        let index = hand.index_finger_tip;
        let thumb = hand.thumb_tip;
        leftHand = { index, thumb };
      }
    }
    
    // Adjust stroke width based on left-hand pinch distance
    if (leftHand) {
      let { index, thumb } = leftHand;
      let x = (index.x + thumb.x) * 0.5;
      let y = (index.y + thumb.y) * 0.5;
      sw = dist(index.x, index.y, thumb.x, thumb.y);
      fill(255, 0, 255);
      noStroke();
      circle(x, y, sw);
    }
    
    // Draw with right-hand pinch
    if (rightHand) {
      let { index, thumb } = rightHand;
      let x = (index.x + thumb.x) * 0.5;
      let y = (index.y + thumb.y) * 0.5;
      
      let d = dist(index.x, index.y, thumb.x, thumb.y);
      if (d < 20) {
        // Add current point to paint trail with current timestamp
        paintPoints.push({
          x: x,
          y: y,
          size: sw * 0.5,
          time: millis()
        });
        
        // Draw the line on the painting canvas (yellow)
        painting.stroke(255, 255, 0);
        painting.strokeWeight(sw * 0.5);
        painting.line(px, py, x, y);
      }
      px = x;
      py = y;
    }
  }
  
  // Draw the pink paint trail
  drawPaintTrail();
  
  // Overlay painting on top of the video
  image(painting, 0, 0);
}

function drawPaintTrail() {
  const currentTime = millis();
  const trailDuration = 2000; // How long each trail point lasts (2 seconds)
  
  // Draw each point in the trail
  for (let i = 0; i < paintPoints.length; i++) {
    const point = paintPoints[i];
    const age = currentTime - point.time;
    
    // If the point is too old, remove it
    if (age > trailDuration) {
      paintPoints.splice(i, 1);
      i--;
      continue;
    }
    
    // Calculate opacity based on age (fade out over time)
    const opacity = map(age, 0, trailDuration, 255, 0);
    
    // Draw the trail point as a pink circle
    fill(255, 0, 255, opacity);
    noStroke();
    circle(point.x, point.y, point.size);
  }
  
  // Limit the number of points in the trail to prevent memory issues
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