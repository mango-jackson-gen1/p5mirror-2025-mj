let cam;
let x = 0;


function setup() {
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();
  createCanvas(cam.width, cam.height);
}

function draw() {
  //background(220);
  //image(cam, 0, 0);
  
  //Since each slit is only 10 pixels high, the y position changes by increments of 10 for each row, ensuring that each strip is drawn directly beneath the previous one.

  
  for (let y = 0; y < height; y += 10) {
    // Copy the current horizontal line of cam footage
    let slit = createImage(width, 10);
    slit.copy(cam, 0, y, width, 10, 0, 0, width, 10);
    
    // Delay time
    let delay = y * 10;
    // Set a timer to draw this slit in delay milliseconds
    // BIND the slit image and y-position to the function
    setTimeout(drawSlit.bind(null, slit, y), delay);
  }
}

// Draw a particular slit at a y-location
function drawSlit(slit, y){
  // Draw slit image at x = 0, y = y
  image(slit, 0, y);
}
