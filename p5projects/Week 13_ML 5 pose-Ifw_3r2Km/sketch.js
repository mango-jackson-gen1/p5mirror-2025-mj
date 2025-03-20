//Classify images!

let classifier;
let video; 
let label = '';
let osc;


// https://docs.ml5js.org/#/reference/image-classifier?id=imageclassifier
// we woudl like continuous classification, 

// do preload/ download the pretraining model embedding
function preload(){
  classifier = ml5.imagesClassifier("MobileNet");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();  
  //imageClassifier.classifyStart(media, ?kNumber, callback);
  imageClassifier.classifyStart(video, gotResult);

  textSize(24);
  textAlign(LEFT, TOP);
  osc = new p5.oscilator  
  
  
}

function draw() {
  background(220);
  image(video, 0,0);
  text(label, 20, 20 )
}

function gotResult(result){
  console.log(result);
}