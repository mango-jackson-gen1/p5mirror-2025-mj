function setup() {
  createCanvas(800, 600);
  background(10); // Start with a very dark background
  strokeWeight(0.5);
  noFill();
  frameRate(30); // Control animation speed
}

function draw() {
  // Apply semi-transparent background to create the trailing effect
  background(10, 15); // Dark background with low alpha for layering effect
  
  let numRows = 7;
  let loopsPerRow = 15;
  let verticalSpacing = height / (numRows + 1);
  
  // Draw multiple passes for layering effect
  for (let pass = 0; pass < 5; pass++) {
    // Vary stroke transparency using noise for organic feel
    let alpha = 100 + noise(frameCount * 0.02 + pass) * 100;
    stroke(230, alpha); // Pale gray with varying transparency
    
    for (let row = 0; row < numRows; row++) {
      // Use noise for subtle vertical movement based on time
      let rowShift = noise(row, frameCount * 0.01, pass * 0.5) * 20 - 10;
      let y = (row + 1) * verticalSpacing + rowShift;
      
      // Pass the current time value to create gentle animation
      // Add row value to create more variation between rows
      drawLoopRow(y, loopsPerRow, frameCount * 0.01 + pass * 0.2 + row * 0.5);
    }
  }
  
  // Stop after sufficient frames to build up layers
  if (frameCount > 10) {
    noLoop();
  }
}

function drawLoopRow(y, loops, timeOffset) {
  beginShape();
  for (let i = 0; i <= loops; i++) {
    let x = map(i, 0, loops, 100, width - 100);
    
    // Enhanced radius variation techniques:
    
    // 1. Base radius variation using multiple noise dimensions
    let baseRadius = map(noise(i * 0.2, timeOffset), 0, 1, 8, 27);
    
    // 2. Add secondary oscillation using sin function
    let oscillation = sin(i * 0.5 + timeOffset * 2) * 10;
    
    // 3. Add location-based size variation (larger near center, smaller at edges)
    let positionFactor = 1 - abs(map(i, 0, loops, -1, 1)) * 0.5;
    
    // 4. Random spikes in size
    let randomSpike = random(1) < 0.2 ? random(5, 15) : 0;
    
    // Combine all variation factors with different weights
    let loopRadius = baseRadius * 0.6 + oscillation * 0.2 + 
                     positionFactor * baseRadius * 0.4 + randomSpike;
    
    // Constrain to reasonable range
    loopRadius = constrain(loopRadius, 5, 50);
    
    // Create looping circles to form continuous scribbles
    for (let angle = 0; angle <= TWO_PI; angle += PI / 10) {
      // 5. Vary the radius even within a single circle for more organic shapes
      let radiusVariation = map(noise(i, angle * 0.3, timeOffset), 0, 1, 0.8, 1.2);
      let currentRadius = loopRadius * radiusVariation;
      
      // Add time-based movement to the circles
      let jitterX = map(noise(i, angle, timeOffset), 0, 1, -2, 2);
      let jitterY = map(noise(i, angle, timeOffset + 5), 0, 1, -1, 1);
      
      let offsetX = cos(angle) * currentRadius + jitterX;
      let offsetY = sin(angle) * currentRadius + jitterY;
      vertex(x + offsetX, y + offsetY);
    }
  }
  endShape();
}