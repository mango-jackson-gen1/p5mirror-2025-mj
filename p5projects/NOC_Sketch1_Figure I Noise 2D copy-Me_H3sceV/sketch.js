// WebAudio Context
let audioContext;

// Microphone
let mic;
let micStarted = false;

// Last volume for smoothing
let lastVolume = 0.0;

// Max brightness controlled by mic input
let maxBrightness = 225;

// Scaling factor for mic volume
let scaleValue = 2000; // Increased for better sensitivity

function setup() {
  createCanvas(640, 240);
  frameRate(120);
  loadPixels();

  // Setup microphone input
  setupMicrophone();
}

function draw() {
  background(0);

  // Get smoothed microphone volume and map it to a visible brightness range
  let micVolume = lerp(lastVolume, mic.getLevel() * scaleValue, 0.1); // Reduce smoothing for faster response
  lastVolume = micVolume; // Update last volume

  maxBrightness = map(micVolume, 0, 100, 40, 255); // Map volume to brightness range
  maxBrightness = constrain(maxBrightness, 40, 255); // Ensure within range

  let xoff = 0.0;
  for (let x = 0; x < width; x++) {
    let yoff = 0.5;
    for (let y = 0; y < height; y++) {
      const bright = map(noise(xoff, yoff), 0, 1, 0, maxBrightness);
      set(x, y, floor(bright));
      yoff += 0.01;
    }
    xoff += 0.01;
  }
  updatePixels();
}

// Setup microphone function
function setupMicrophone() {
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(); // Start mic immediately

  // Button to start/stop mic
  startMicButton = createButton("🎤 Start/Stop Mic");
  startMicButton.style("font-size", "16px");
  startMicButton.style("padding", "8px 16px");

  // Position the button below the canvas
  startMicButton.position(width / 2 - 50, height + 20); // Centered horizontally, 20px below the canvas
  startMicButton.mousePressed(startMic);
}

// Start/Stop Mic function
function startMic() {
  if (!micStarted) {
    getAudioContext().resume();
    mic.start();
    startMicButton.style("background-color", "green");
  } else {
    mic.stop();
    startMicButton.style("background-color", "red");
  }
  micStarted = !micStarted;
}

// Extract and smooth microphone volume
function getMicrophoneVolume(smoothingValue, scaleValue) {
  if (micStarted) {
    let micVolume = lerp(lastVolume, mic.getLevel() * scaleValue, smoothingValue);
    lastVolume = micVolume; // Store last volume for smoothing
    return micVolume;
  }
  return 0;
}
