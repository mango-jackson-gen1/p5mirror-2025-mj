let video;
let handPose;
let hands = [];
let painting;
let px = 0;
let py = 0;
let bubbleImg;

function preload() {
  bubbleImg = loadImage("images/fishroll.PNG");
}

function setup() {
  createCanvas(640, 480);

  painting = createGraphics(640, 480);
  painting.clear();
  painting.noStroke();

  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  handPose = ml5.handPose(video, () => console.log('Handpose model loaded'));
  handPose.detectStart(video, gotHands);
  video.hide();

  let eraseButton = createButton('Clear Canvas');
  eraseButton.position(20, 20);
  eraseButton.mousePressed(() => painting.clear());
  eraseButton.style('background-color', '#ff3366');
  eraseButton.style('color', 'white');
  eraseButton.style('border', 'none');
  eraseButton.style('padding', '10px 15px');
  eraseButton.style('border-radius', '5px');
  eraseButton.style('font-size', '16px');
  eraseButton.style('cursor', 'pointer');
}

function gotHands(results) {
  hands = results;
}

function draw() {
  image(video, 0, 0);

  if (hands.length > 0) {
    let hand = hands[0];

    let thumb = hand.annotations.thumb[3];
    let index = hand.annotations.indexFinger[3];

    let x = (thumb[0] + index[0]) / 2;
    let y = (thumb[1] + index[1]) / 2;
    let d = dist(thumb[0], thumb[1], index[0], index[1]);

    if (d < 25) {
      drawImageTrail(x, y);
    }
  }

  image(painting, 0, 0);
}

function drawImageTrail(x, y) {
  painting.image(
    bubbleImg,
    x + random(-20, 20),
    y + random(-20, 20),
    bubbleImg.width / 4,
    bubbleImg.height / 4
  );
}

