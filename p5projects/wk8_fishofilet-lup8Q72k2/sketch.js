let img;
function preload() {
    img = loadImage("filetofish.png");
}
function setup() {
    createCanvas(400, 400);
}
function draw() {
    imageMode(CENTER);
    image(img, random(width), random(height),
        random(25,150), random(25,40));
}