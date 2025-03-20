// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];
let faces = [];

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true });
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
}

function mousePressed() {
  console.log(hands);
  console.log(faces);
}

function gotHands(results) {
  hands = results;
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting hands
  handPose.detectStart(video, gotHands);
  faceMesh.detectStart(video, gotFaces);
}

//local variable = initialized within the draw{}, refresh every frame
function draw() {
  background(0);

  let mouthOpenSize = 50; // Default size for the emoji
  let mouthOpeningThreshold = 10; // Minimum change in mouth opening to trigger text
  let secondTextThreshold = 20; // Threshold to trigger second text
  let showText = false; // Flag to control text display
  let showSecondText = false; // Flag to control second text display

  // Face Detection Logic
  if (faces.length > 0) {
    let face = faces[0]; // Only process the first detected face
    image(video, 0, 0);

    // Draw exterior lip contour
    beginShape();
    for (let i = 0; i < lipsExterior.length; i++) {
      let index = lipsExterior[i];
      let keypoint = face.keypoints[index];
      stroke('#77032E');
      strokeWeight(4);
      noFill();
      vertex(keypoint.x, keypoint.y);
    }
    endShape(CLOSE);

    // Draw interior lip contour
    beginShape();
    for (let i = 0; i < lipsInterior.length; i++) {
      let index = lipsInterior[i];
      let keypoint = face.keypoints[index];
      stroke('#DA0754');
      strokeWeight(2);
      noFill();
      vertex(keypoint.x, keypoint.y);
    }
    endShape(CLOSE);

    // Calculate mouth opening distance
    let a = face.keypoints[13]; // Upper lip
    let b = face.keypoints[14]; // Lower lip
    let d = dist(a.x, a.y, b.x, b.y); // Distance between lips

    // Adjust emoji size based on mouth opening
    mouthOpenSize = map(d, 0, 100, 10, 110); // Maps mouth opening size to emoji size

    // Show text only if mouth opening exceeds threshold
    if (d > mouthOpeningThreshold) {
      showText = true;
    }
    
    // Show second text only if mouth opening reaches 20 or more
    if (d >= secondTextThreshold) {
      showSecondText = true;
    } else {
      showSecondText = false;
    }
  }

  // Display text if mouth is open beyond threshold
  if (showText) {
    textSize(40);
    textFont('Bubble'); // Ensure this font is loaded or change it to a valid one
    textAlign(CENTER, TOP);
    fill(255);
    text("Will you marry me?", width / 2, 20);
  }
  
  // Display second text if mouth opening is 20 or more
  if (showSecondText) {
    textSize(40);
    textFont('Bubble');
    textAlign(CENTER, TOP);
    fill(255);
    text("You are the love of my life", width / 2, 70);
  }

  // Hand Detection Logic
  if (hands.length > 0) {
    let leftHandDrawn = false; // Flag to track if a left hand has been drawn

    for (let hand of hands) {
      if (hand.confidence > 0.1) {  

        // Check if the detected hand is the LEFT hand and we haven't drawn one yet
        if (hand.handedness === "Left" && !leftHandDrawn) {
          
          // Select a specific keypoint (index 14, ring finger tip)
          let keypoint = hand.keypoints[14]; 

          // Set text properties
          textSize(mouthOpenSize); // Adjust emoji size based on mouth opening
          textAlign(CENTER, CENTER); // Center the emoji at the keypoint

          // Draw the 💎 emoji at the left hand keypoint location
          text("💎", keypoint.x, keypoint.y);

          // Set the flag to true, so no more left hands will be processed
          leftHandDrawn = true;
        }
      }
    }
  }
}

// Define the exterior lip landmark indices for drawing the outer lip contour
let lipsExterior = [
  267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61, 185, 40, 39, 37, 0,
];

// Define the interior lip landmark indices for drawing the inner lip contour
let lipsInterior = [
  13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78, 191, 80, 81, 82,
];


