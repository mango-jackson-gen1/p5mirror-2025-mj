/*
CALCULATE ring size unit (400 ÷ 4 = 100 pixels)
CALCULATE slice angle unit (full circle ÷ 4 = quarter circle)
SET color unit to 50
START angle at 0

FOR each slice from 1 to 4:
    FOR each ring from 4 down to 1:
        
        CALCULATE current ring diameter (ring number × size unit)
        CALCULATE ending angle for this slice
        CALCULATE color (ring number × color unit)
        
        ADD black outline
        FILL with calculated color
        DRAW pie slice at center of canvas with:
            - current ring diameter
            - from previous angle to current angle
*/

function setup() {
  createCanvas(400, 400);
    noStroke();
    let nTracks = 4;
    let nSteps = 4;
    
    let d = width / nTracks; // diameter unit
    let a = TWO_PI / nSteps; // angle unit
    let c = 50; // color unit

    let prevAngle = 0;
    let angle;
    for (let step = 1; step <= nSteps; step++) { 
      for (let track = nTracks; track > 0; track--) { 
  
        let diameter = d * track;
        angle = a * step;
        let f = track*c;
        
        stroke(0);
        fill(f);
        arc(width/2, height/2, diameter, diameter, prevAngle, angle, PIE);
      }
      prevAngle = angle;
    }
}

function draw() {

}