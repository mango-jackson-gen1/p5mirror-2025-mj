let oscillators = [];
for (let i = 0; i < 5; i++) {
    let osc = new p5.Oscillator('sin');
    osc.freq(50 + i * 10); // Offset frequencies
    osc.amp(0.5);
    osc.start();
    oscillators.push(osc); // Store in the array
}

let oscillators1 = [];
for (let i = 0; i < 3; i++) {
    let osc = new p5.Oscillator('sine');
    osc.freq(140 + i * 40); // Offset frequencies
    osc.amp(1);

    oscillators1.push(osc); // Store in the array
}

let oscillators2 = [];
for (let i = 0; i < 3; i++) {
    let osc = new p5.Oscillator('sine');
    osc.freq(80 + i * 40); // Offset frequencies
    osc.amp(0.8);

    oscillators2.push(osc); // Store in the array
}

// Function to delay execution
function delayExecution(callback, delay) {
    setTimeout(callback, delay);
}

// Define a function to start the second array
function startSecondArray() {
    for (let i = 0; i < oscillators1.length; i++) {
        oscillators1[i].start(); // Start each oscillator in the second array
    }
}

// Define a function to start the third array
function startThirdArray() {
    for (let i = 0; i < oscillators2.length; i++) {
        oscillators2[i].start(); // Start each oscillator in the third array
    }
}

// Start the second array after 3 seconds
delayExecution(startSecondArray, 3000);

// Start the third array after 5 seconds
delayExecution(startThirdArray, 5000);

// Add 10 more oscillators to a new array
let additionalOscillators = [];
for (let i = 0; i < 10; i++) {
    let osc = new p5.Oscillator('sine'); // Change to square wave
    osc.freq(200 + i * 20); // Offset frequencies
    osc.amp(0.6);

    additionalOscillators.push(osc); // Store in the array
}

// Function to play each oscillator in the additional array with a delay
function playAdditionalOscillators() {
    additionalOscillators.forEach((osc, index) => {
        delayExecution(() => osc.start(), index * 10000); // 10-second delay for each oscillator
    });
}

// Start playing the additional oscillators after 6 seconds
delayExecution(playAdditionalOscillators, 6000);
