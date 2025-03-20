// Musical Grid with 10 notes using ML5 PoseNet for finger tracking

let grid = [];
let cols = 5;
let rows = 2;
let cellWidth, cellHeight;
let noteNames = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5'];
let cellColors = ['#FF5252', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', 
              '#0000FF', '#8B00FF', '#FF00FF', '#FF0080', '#FF9E9E'];
let activeCell = null;

// Audio context and oscillators
let audioContext;
let oscillators = {};

// Trail effect variables
let trail = [];
let maxTrailLength = 15;

// ML5 PoseNet variables
let video;
let poseNet;
let poses = [];
let noseX = 0;
let noseY = 0;
let rightWristX = 0;
let rightWristY = 0;
let isModelReady = false;

function setup() {
  createCanvas(640, 480);
  cellWidth = width / cols;
  cellHeight = height / 2 / rows; // Use top half for grid
  
  // Create the grid cells (in top half of screen)
  let index = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (index < 10) {
        let x = i * cellWidth;
        let y = j * cellHeight;
        grid.push({
          x: x,
          y: y,
          index: index,
          isActive: false
        });
        index++;
      }
    }
  }
  
  // Setup webcam and ML5 PoseNet model
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  // Create and initialize PoseNet model
  poseNet = ml5.poseNet(video, modelReady);
  
  // Listen for pose predictions
  poseNet.on('pose', function(results) {
    poses = results;
    
    if (poses.length > 0) {
      // Get the right wrist position (acts as our finger pointer)
      let rightWrist = poses[0].pose.rightWrist;
      if (rightWrist.confidence > 0.5) {
        rightWristX = rightWrist.x;
        rightWristY = rightWrist.y;
        
        // Add to trail
        addToTrail(rightWristX, rightWristY);
        
        // Check for interaction with cells
        handleWristInteraction();
      }
    }
  });
  
  // Initialize audio context
  initAudio();
}

function modelReady() {
  console.log('PoseNet model ready!');
  isModelReady = true;
}

function draw() {
  background(240);
  
  // Draw mirrored webcam view with reduced opacity
  push();
  translate(width, 0);
  scale(-1, 1);
  tint(255, 100); // Reduced opacity
  image(video, 0, 0, width, height);
  pop();
  
  // Draw grid
  for (let i = 0; i < grid.length; i++) {
    let cell = grid[i];
    
    // Draw the cell
    if (cell.isActive) {
      fill(cellColors[cell.index]);
    } else {
      fill(255);
    }
    stroke(0);
    rect(cell.x, cell.y, cellWidth, cellHeight);
    
    // Draw the note name in the cell
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(18);
    text(noteNames[cell.index], cell.x + cellWidth/2, cell.y + cellHeight/2);
  }
  
  // Draw trail
  drawTrail();
  
  // Draw wrist point if detected
  if (poses.length > 0) {
    let rightWrist = poses[0].pose.rightWrist;
    if (rightWrist.confidence > 0.5) {
      fill(255, 0, 0);
      noStroke();
      // Mirror the x-coordinate for natural interaction
      ellipse(width - rightWrist.x, rightWrist.y, 20);
    }
  }
  
  // Draw status text
  fill(0);
  textAlign(CENTER);
  textSize(16);
  if (!isModelReady) {
    text("Loading PoseNet model...", width/2, height - 20);
  } else if (poses.length === 0) {
    text("Move in front of the camera", width/2, height - 20);
  } else {
    text("Use your right wrist to play notes", width/2, height - 20);
  }
}

function addToTrail(x, y) {
  // Mirror the x-coordinate for natural interaction
  trail.push({
    x: width - x,
    y: y,
    size: 20,
    alpha: 255
  });
  
  // Keep the trail at the maximum length
  if (trail.length > maxTrailLength) {
    trail.shift();
  }
  
  // Fade and shrink the trail points
  for (let i = 0; i < trail.length; i++) {
    trail[i].size *= 0.95;
    trail[i].alpha *= 0.9;
  }
  
  // Remove points that are too small or transparent
  trail = trail.filter(point => point.size > 1 && point.alpha > 10);
}

function drawTrail() {
  noStroke();
  
  // Draw each point in the trail
  for (let i = 0; i < trail.length; i++) {
    let point = trail[i];
    let pointColor;
    
    // Check if point is over a cell and use that cell's color
    let cellIndex = getCellAtPosition(point.x, point.y);
    if (cellIndex !== -1) {
      pointColor = cellColors[cellIndex];
      
      // Extract RGB values
      let r = parseInt(pointColor.substring(1, 3), 16);
      let g = parseInt(pointColor.substring(3, 5), 16);
      let b = parseInt(pointColor.substring(5, 7), 16);
      
      fill(r, g, b, point.alpha);
    } else {
      fill(170, 170, 170, point.alpha); // Default gray if not over a cell
    }
    
    ellipse(point.x, point.y, point.size);
  }
}

function handleWristInteraction() {
  // Mirror the x-coordinate for natural interaction
  let x = width - rightWristX;
  let y = rightWristY;
  
  // Check if wrist is over a cell
  for (let i = 0; i < grid.length; i++) {
    let cell = grid[i];
    if (x > cell.x && x < cell.x + cellWidth &&
        y > cell.y && y < cell.y + cellHeight) {
      
      // If this is a new cell and not the currently active one
      if (activeCell !== cell) {
        // Stop previous note if there was one
        if (activeCell !== null) {
          stopNote(activeCell.index);
          activeCell.isActive = false;
        }
        
        // Play the new note
        playNote(cell.index);
        
        // Highlight the cell
        cell.isActive = true;
        activeCell = cell;
        
        // Add a burst effect at this position
        addBurstEffect(x, y, cellColors[cell.index]);
      }
      
      return;
    }
  }
  
  // If wrist is not over any cell, release the active cell
  if (activeCell !== null) {
    stopNote(activeCell.index);
    activeCell.isActive = false;
    activeCell = null;
  }
}

function getCellAtPosition(x, y) {
  for (let i = 0; i < grid.length; i++) {
    let cell = grid[i];
    if (x > cell.x && x < cell.x + cellWidth &&
        y > cell.y && y < cell.y + cellHeight) {
      return cell.index;
    }
  }
  return -1;
}

// Add a burst effect at the given position
function addBurstEffect(x, y, color) {
  // Extract RGB values
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);
  
  for (let i = 0; i < 8; i++) {
    let angle = random(TWO_PI);
    let distance = random(10, 30);
    trail.push({
      x: x + cos(angle) * distance,
      y: y + sin(angle) * distance,
      size: random(15, 30),
      alpha: 200,
      color: color
    });
  }
}

// Initialize the Audio Context
function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Play a note with the given index
function playNote(index) {
  if (!audioContext) return;
  
  // Convert note to frequency
  let frequency = noteToFreq(noteNames[index]);
  
  // Create oscillator
  let oscillator = audioContext.createOscillator();
  let gainNode = audioContext.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  
  // Store the oscillator and gain node for later stopping
  oscillators[index] = { oscillator, gainNode };
}

// Stop the note with the given index
function stopNote(index) {
  if (!audioContext || !oscillators[index]) return;
  
  // Fade out over 50ms for a smoother release
  oscillators[index].gainNode.gain.setValueAtTime(
    oscillators[index].gainNode.gain.value, 
    audioContext.currentTime
  );
  oscillators[index].gainNode.gain.linearRampToValueAtTime(
    0.001, 
    audioContext.currentTime + 0.05
  );
  
  // Stop oscillator after fade out
  setTimeout(() => {
    if (oscillators[index]) {
      oscillators[index].oscillator.stop();
      delete oscillators[index];
    }
  }, 50);
}

// Function to convert a note name (like "C4") to its frequency in Hz
function noteToFreq(note) {
  let noteMap = {'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 
                'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11};
  let noteStr = note.slice(0, -1);
  let octave = parseInt(note.slice(-1));
  
  let noteIndex = noteMap[noteStr];
  if (noteIndex === undefined) return 440; // Default to A4 if note not found
  
  // Calculate frequency based on the note and octave
  // A4 = 440Hz
  let halfStepsFromA4 = (octave - 4) * 12 + noteIndex - 9;
  return 440 * Math.pow(2, halfStepsFromA4 / 12);
}

// Handle browser interactions
function mousePressed() {
  // Initialize audio on first interaction (browsers require user gesture)
  if (audioContext && audioContext.state !== 'running') {
    audioContext.resume();
  }
  return false;
}