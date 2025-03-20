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
  for (let pass = 0; pass < 7; pass++) {
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
  
  // Store the first point to close the shape later
  let firstX = 0;
  let firstY = 0;
  let hasFirstPoint = false;
  
  for (let i = 0; i <= loops; i++) {
    let x = map(i, 0, loops, 100, width - 100);
    
    // Base dimensions for the ellipse
    let horizontalRadius = map(noise(i * 0.2, timeOffset), 0, 1, 7, 20);
    
    // Create varying vertical stretching - some ellipses tall, some short
    let verticalFactor = map(noise(i * 0.3, timeOffset + 10), 0, 1, 1.3, 7);
    
    // Add random extreme stretching for some ellipses (10% chance)
    if (random(1) < 0.1) {
      verticalFactor *= random(2, 4);
    }
    
    // Calculate the vertical radius using the stretching factor
    let verticalRadius = horizontalRadius * verticalFactor;
    
    // Add random rotation to each ellipse (0 to PI radians)
    let rotation = noise(i * 0.4, timeOffset) * PI;
    
    // Create a second control point for each ellipse (introducing curveVertex behavior)
    let controlAngle = noise(i, timeOffset) * TWO_PI;
    let controlDistance = noise(i * 0.5, timeOffset) * horizontalRadius * 1.5;
    let controlX = x + cos(controlAngle) * controlDistance;
    let controlY = y + sin(controlAngle) * controlDistance;
    
    // Store points for this ellipse
    let points = [];
    
    // Create elliptical shapes with additional curve points
    for (let angle = 0; angle <= TWO_PI; angle += PI / 12) {
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
      
      // Calculate the final point position
      let finalX = x + rotatedX + jitterX;
      let finalY = y + rotatedY + jitterY;
      
      // Store the point
      points.push({x: finalX, y: finalY});
      
      // Save the first point to close the shape later
      if (!hasFirstPoint) {
        firstX = finalX;
        firstY = finalY;
        hasFirstPoint = true;
      }
    }
    
    // Draw the main ellipse points
    for (let p = 0; p < points.length; p++) {
      vertex(points[p].x, points[p].y);
      
      // Add an extra curveVertex after every 3rd point (creates undulation)
      // This introduces more complex curves within each ellipse
      if (p % 3 === 0) {
        // Calculate a position for the extra curve control point
        let nextIndex = (p + 1) % points.length;
        let prevIndex = (p - 1 + points.length) % points.length;
        
        // Create a control point that's offset from the current path
        let avgX = (points[prevIndex].x + points[p].x + points[nextIndex].x) / 3;
        let avgY = (points[prevIndex].y + points[p].y + points[nextIndex].y) / 3;
        
        // Add a curving offset based on noise
        let curveOffset = map(noise(i, p * 0.2, timeOffset), 0, 1, 5, 15);
        let curveAngle = noise(i * 0.2, p * 0.3, timeOffset) * TWO_PI;
        
        // Calculate the control point position
        let ctrlX = avgX + cos(curveAngle) * curveOffset;
        let ctrlY = avgY + sin(curveAngle) * curveOffset;
        
        // Add the extra control point to create more complex curves
        vertex(ctrlX, ctrlY);
        
        // Return to the regular path
        vertex(points[p].x, points[p].y);
      }
    }
    
    // Add the control point to influence curve shape between ellipses
    vertex(controlX, controlY);
  }
  
  // Close the shape by returning to the first point
  if (hasFirstPoint) {
    vertex(firstX, firstY);
  }
  
  endShape();
}