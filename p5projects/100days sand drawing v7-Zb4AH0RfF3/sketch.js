function setup() {
  createCanvas(800, 600);
  background(10); // Start with a very dark background
  strokeWeight(0.5);
  noFill();
  frameRate(0.5); // Control animation speed
}

function draw() {
  // Apply semi-transparent background to create the trailing effect
  background(10, 15); // Dark background with low alpha for layering effect
  
  let numRows = 7;
  let loopsPerRow = 15;
  let verticalSpacing = height / (numRows + 1);
  
  // Draw multiple passes for layering effect
  for (let pass = 0; pass < 10; pass++) {
    // Vary stroke transparency using noise for organic feel
    let alpha = 100 + noise(frameCount * 0.02 + pass) * 100;
    stroke(230, alpha); // Pale gray with varying transparency
    
    for (let row = 0; row < numRows; row++) {
      // Use noise for subtle vertical movement based on time
      let rowShift = noise(row, frameCount * 0.01, pass * 0.5) * 20 - 10;
      let y = (row + 1) * verticalSpacing + rowShift;
      
      // Pass the current time value to create gentle animation
      drawLoopRow(y, loopsPerRow, frameCount * 0.01 + pass * 0.2 + row * 0.3);
    }
  }
  
  // Stop after sufficient frames to build up layers
  if (frameCount > 0.5) {
    noLoop();
  }
}

function drawLoopRow(y, loops, timeOffset) {
  beginShape();
  for (let i = 0; i <= loops; i++) {
    let x = map(i, 0, loops, 100, width - 100);
    
    // Base dimensions for the ellipse
    let horizontalRadius = map(noise(i * 0.2, timeOffset), 0, 1, 7, 20);
    
    // Create varying vertical stretching - some ellipses tall, some short
    // Use a stronger multiplier (0.5 to 2.5) to create more dramatic stretching
    let verticalFactor = map(noise(i * 0.3, timeOffset + 10), 0, 1, 1.3, 7);
    
    // Add random extreme stretching for some ellipses (10% chance)
    if (random(1) < 0.1) {
      verticalFactor *= random(2, 4);
    }
    
    // Calculate the vertical radius using the stretching factor
    let verticalRadius = horizontalRadius * verticalFactor;
    
    // Add random rotation to each ellipse (0 to PI radians)
    let rotation = noise(i * 0.4, timeOffset) * PI;
    
    // Create elliptical shapes instead of circles
    for (let angle = 0; angle <= TWO_PI; angle += PI / 12) {
      // Apply parametric equation for ellipse with rotation
      // x = a * cos(t) * cos(rotation) - b * sin(t) * sin(rotation)
      // y = a * cos(t) * sin(rotation) + b * sin(t) * cos(rotation)
      
      // Add irregularity to the ellipse shape
      let irregularity = map(noise(i, angle, timeOffset), 0, 1, 0.8, 1.2);
      
      // Calculate ellipse coordinates with rotation
      let ellipseX = horizontalRadius * cos(angle) * irregularity;
      let ellipseY = verticalRadius * sin(angle) * irregularity;
      
      // Apply rotation transformation
      let rotatedX = ellipseX * cos(rotation) - ellipseY * sin(rotation);
      let rotatedY = ellipseX * sin(rotation) + ellipseY * cos(rotation);
      
      // Add slight jitter
      let jitterX = random(-1, 1);
      let jitterY = random(-1, 1);
      
      vertex(x + rotatedX + jitterX, y + rotatedY + jitterY);
    }
  }
  endShape();
}