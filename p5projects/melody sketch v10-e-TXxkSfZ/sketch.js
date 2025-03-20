// Musical Grid with 10 notes using the Web Audio API (no p5.sound dependencies)

let grid = [];
let cols = 5;
let rows = 2;
let cellWidth, cellHeight;
let noteNames = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5'];
let colors = ['#FF5252', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', 
              '#0000FF', '#8B00FF', '#FF00FF', '#FF0080', '#FF9E9E'];
let activeCell = null;

// Audio context and oscillators
let audioContext;
let oscillators = {};

function setup() {
  createCanvas(600, 300);
  cellWidth = width / cols;
  cellHeight = height / rows;
  
  // Create the grid cells
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
}

function draw() {
  background(240);
  
  // Draw the grid
  for (let i = 0; i < grid.length; i++) {
    let cell = grid[i];
    
    // Draw the cell
    if (cell.isActive) {
      fill(colors[cell.index]);
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
}

function mousePressed() {
  // Initialize audio context on first interaction
  initAudio();
  
  // Check if a cell was clicked
  for (let i = 0; i < grid.length; i++) {
    let cell = grid[i];
    if (mouseX > cell.x && mouseX < cell.x + cellWidth &&
        mouseY > cell.y && mouseY < cell.y + cellHeight) {
      
      // Play the note
      playNote(cell.index);
      
      // Highlight the cell
      cell.isActive = true;
      activeCell = cell;
      
      break;
    }
  }
  return false; // Prevent default behavior
}

function mouseReleased() {
  // Stop the note when mouse is released
  if (activeCell !== null) {
    stopNote(activeCell.index);
    activeCell.isActive = false;
    activeCell = null;
  }
  return false; // Prevent default behavior
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
  let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  let noteStr = note.slice(0, -1);
  let octave = parseInt(note.slice(-1));
  
  let noteIndex = notes.indexOf(noteStr);
  if (noteIndex === -1) return 440; // Default to A4 if note not found
  
  // Calculate frequency based on the note and octave
  // A4 = 440Hz
  let halfStepsFromA4 = (octave - 4) * 12 + noteIndex - 9;
  return 440 * Math.pow(2, halfStepsFromA4 / 12);
}