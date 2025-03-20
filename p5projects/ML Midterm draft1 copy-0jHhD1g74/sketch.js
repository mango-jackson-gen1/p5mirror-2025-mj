let bodyPose;
let video;
let poses = [];
let triggerKeypointsIndex = [11, 12, 15, 16];
const threshold = 0.6;

// Sound Players
const singleDrop = new Tone.Player("audio/single drop.wav").toDestination();
const storm = new Tone.Player("audio/storm.flac").toDestination();
const coolWeather = new Tone.Player("audio/cool weather.flac").toDestination();
const lightning = new Tone.Player("audio/lightning.wav").toDestination();

let singleDropPlay = false;
let stormPlay = false;
let coolWeatherPlay = false;
let lightningPlay = false;

let lastSingleDropPlay = false;
let lastStormPlay = false;
let lastCoolWeatherPlay = false;
let lastLightningPlay = false;

Tone.loaded().then(() => console.log("Audio loaded"));

function preload() {
  bodyPose = ml5.bodyPose("BlazePose", { flipped: true });
}

function setup() {
  createCanvas(600, 500);
  video = createCapture(VIDEO);
  video.size(600, 500);
  video.hide();
  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.1) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.x, keypoint.y, 10, 10);
      }
    }

    let leftHand = pose.keypoints[16];
    let rightHand = pose.keypoints[15];
    let leftShoulder = pose.keypoints[12];
    let rightShoulder = pose.keypoints[11];

    if (leftHand && rightHand && leftShoulder && rightShoulder) {
      if (leftShoulder.y - leftHand.y > 30 || rightShoulder.y - rightHand.y > 30) {
        lightningPlay = true;
      } else {
        lightningPlay = false;
      }

      if (leftShoulder.x - leftHand.x > 30 || rightShoulder.x - rightHand.x > 30) {
        coolWeatherPlay = true;
      } else {
        coolWeatherPlay = false;
      }

      if (rightHand.x - rightShoulder.x > 30 || leftHand.x - leftShoulder.x > 30) {
        stormPlay = true;
      } else {
        stormPlay = false;
      }

      if (leftShoulder.z - leftHand.z > 30 || rightShoulder.z - rightHand.z > 30) {
        singleDropPlay = true;
      } else {
        singleDropPlay = false;
      }
    }

    playSounds();
  }
}

function playSounds() {
  if (singleDropPlay && !lastSingleDropPlay) singleDrop.start();
  if (stormPlay && !lastStormPlay) storm.start();
  if (coolWeatherPlay && !lastCoolWeatherPlay) coolWeather.start();
  if (lightningPlay && !lastLightningPlay) lightning.start();

  lastSingleDropPlay = singleDropPlay;
  lastStormPlay = stormPlay;
  lastCoolWeatherPlay = coolWeatherPlay;
  lastLightningPlay = lightningPlay;
}

function gotPoses(results) {
  poses = results;
}

