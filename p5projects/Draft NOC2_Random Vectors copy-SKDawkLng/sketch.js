// Random Vectors in Four Sections with Delayed Display
// Based on The Nature of Code by Daniel Shiffman
function setup() {
  createCanvas(400, 400);
  background(0);
  
  // Create arrays to store our vectors
  vectors1 = [];
  vectors2 = [];
  vectors3 = []; // New vector array
  vectors4 = []; // New vector array
  
  // Maximum number of vectors to display
  maxVectors = 20;
  
  // Variables to control the delay
  showVectors3 = false;
  showVectors4 = false;
  
  // Set timers to show the additional vectors after delays
  setTimeout(function() {
    showVectors3 = true;
  }, 10000); // 10 seconds delay
  
  setTimeout(function() {
    showVectors4 = true;
  }, 20000); // 20 seconds delay
}

function draw() {
  // Clear with transparent background for a fade effect
  fill(0, 5);
  noStroke();
  rect(0, 0, width, height);
  
  // First vector - positioned at x/4, y/4
  push(); // Save the current drawing state
  translate(width/4, height/4); // Center at x/4, y/4
  
  // Create a new vector for the first set
  let v1 = p5.Vector.random2D();
  v1.mult(random(10, 30));
  vectors1.push(v1);
  
  // Remove oldest vector if we exceed the maximum
  if (vectors1.length > maxVectors) {
    vectors1.shift();
  }
  
  // Draw all vectors in the first set
  strokeWeight(1);
  stroke(255, 50); // Semi-transparent white
  for (let v of vectors1) {
    line(0, 0, v.x, v.y);
  }
  pop(); // Restore the original drawing state
  
  // Second vector - positioned at 3x/4, y/4
  push();
  translate(3*width/4, height/4); // Center at 3x/4, y/4
  
  // Create a new vector for the second set
  let v2 = p5.Vector.random2D();
  v2.mult(randomGaussian(40, 4));
  vectors2.push(v2);
  
  // Remove oldest vector if we exceed the maximum
  if (vectors2.length > maxVectors) {
    vectors2.shift();
  }
  
  // Draw all vectors in the second set
  strokeWeight(1);
  stroke(255, 100, 100, 50); // Semi-transparent red for contrast
  for (let v of vectors2) {
    line(0, 0, v.x, v.y);
  }
  pop();
  
  // Third vector (appears after 10 seconds) - positioned at x/4, 3y/4
  if (showVectors3) {
    push();
    translate(width/4, 3*height/4); // Center at x/4, 3y/4
    
    // Create a new vector for the third set
    let v3 = p5.Vector.random2D();
    v3.mult(sin(frameCount * 0.05) * 20 + 30); // Oscillating size
    vectors3.push(v3);
    
    // Remove oldest vector if we exceed the maximum
    if (vectors3.length > maxVectors) {
      vectors3.shift();
    }
    
    // Draw all vectors in the third set
    strokeWeight(1);
    stroke(100, 255, 100, 50); // Semi-transparent green
    for (let v of vectors3) {
      line(0, 0, v.x, v.y);
    }
    pop();
  }
  
  // Fourth vector (appears after 20 seconds) - positioned at 3x/4, 3y/4
  if (showVectors4) {
    push();
    translate(3*width/4, 3*height/4); // Center at 3x/4, 3y/4
    
    // Create a new vector for the fourth set
    let v4 = p5.Vector.random2D();
    v4.rotate(frameCount * 0.02); // Rotating direction
    v4.mult(random(15, 35));
    vectors4.push(v4);
    
    // Remove oldest vector if we exceed the maximum
    if (vectors4.length > maxVectors) {
      vectors4.shift();
    }
    
    // Draw all vectors in the fourth set
    strokeWeight(1);
    stroke(100, 100, 255, 50); // Semi-transparent blue
    for (let v of vectors4) {
      line(0, 0, v.x, v.y);
    }
    pop();
  }
  
  // Add text to show when new vectors will appear or have appeared
  fill(255);
  noStroke();
  textSize(10);
  
  if (!showVectors3) {
    text("Third vector appears in " + Math.ceil((10000 - (millis() % 10000)) / 1000) + " seconds", 10, height - 30);
  } else if (!showVectors4) {
    text("Fourth vector appears in " + Math.ceil((20000 - millis()) / 1000) + " seconds", 10, height - 30);
  } else {
    text("All vectors are now visible", 10, height - 30);
  }
}