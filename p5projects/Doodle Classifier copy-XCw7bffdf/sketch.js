// Machine Learning for Creative Coding
// https://github.com/shiffman/ML-for-Creative-Coding

// Total pixels in each 28x28 image
const len = 784;

// Data
let catsData;
let trainsData;
let rainbowsData;
let allData = [];

// Neural network classifier
let classifier;

// DOM element to show results
let resultsP;

function preload() {
  // Load binary image datasets
  catsData = loadBytes("data/cats1000.bin");
  trainsData = loadBytes("data/trains1000.bin");
  rainbowsData = loadBytes("data/rainbows1000.bin");
}

function prepareData(data, label) {
  // Convert raw image data into training samples
  for (let i = 0; i < 1000; i++) {
    let record = {};
    let offset = i * len;
    let rawInputs = data.bytes.subarray(offset, offset + len);

    // Normalize pixel values (0-255) to a 0-1 range
    record.inputs = [];
    for (let j = 0; j < rawInputs.length; j++) {
      record.inputs[j] = rawInputs[j] / 255;
    }

    // Assign the corresponding label
    record.target = label;
    allData.push(record);
  }
}

function setup() {
  createCanvas(140, 140);
  
  // Needed as default "webgpu" is not compatible
  ml5.setBackend("webgl");

  background(255);

  // Prepare labeled training data
  prepareData(catsData, "cat");
  prepareData(rainbowsData, "rainbow");
  prepareData(trainsData, "train");

  // Options for configuring the neural network

  // Simple vanilla neural network
  // let options = {
  //   inputs: len,
  //   outputs: 3,
  //   task: "classification",
  //   debug: true,
  // };

  
  // Uses convolutional layers, keeping the 2D structure of the input image
  // (The data is still inputted as a flat array)
  let options = {
    inputs: [28, 28, 1],
    task: "imageClassification",
    outputs: 3,

    // Uncomment to set a custom learning rate
    // learningRate: 0.05,

    // Uncomment to define a custom convolutional network
    // layers: customLayers,

    debug: true,
  };

  classifier = new ml5.neuralNetwork(options);

  // Add training data to the model
  for (let i = 0; i < allData.length; i++) {
    classifier.addData(allData[i].inputs, [allData[i].target]);
  }

  // Train the model
  classifier.train({ epochs: 30 }, finishedTraining);

  // Create DOM elements for classification and clearing the canvas
  resultsP = createP("");
  let guessButton = createButton("classify");
  guessButton.mousePressed(classify);
  let clearButton = createButton("clear");
  clearButton.mousePressed(clearCanvas);
}

function draw() {
  // Allow user to draw on the canvas
  if (mouseIsPressed) {
    strokeWeight(8);
    stroke(0);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function classify() {
  // Convert drawn image to a 28x28 grayscale input
  let inputs = [];
  let img = get();
  img.resize(28, 28);
  img.loadPixels();
  for (let i = 0; i < len; i++) {
    let bright = img.pixels[i * 4]; // Extract brightness from red channel
    inputs[i] = (255 - bright) / 255.0; // Normalize and invert
  }
  classifier.classify(inputs, gotResults);
}

function gotResults(results) {
  resultsP.html(`${results[0].label} (${floor(100 * results[0].confidence)}%)`);
}

function finishedTraining() {
  console.log("Training complete");
}

function clearCanvas() {
  background(255);
}
