/*
Part 1: Unscramble the code below.

1. Move the statements into either the setup(), draw(), or mousePressed() functions in order to:
2. Draw a square in the center of the Canvas.
3. When the mouse is inside the square,
and you click the mouse, change the square's color.
*/

let isOn = false;
let enter = true;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  rectMode(CENTER);
  rect(width / 2, height / 2, 200);

  if (isOn == false) {
    fill(0);
  } else {
    fill(255);
  }
  
   if (mouseX > 100 && mouseX < 300 && mouseY > 100 && mouseY < 300) {
    // isOn = true;
    
    // for Part 2
    // if (isOn == true) {
    //   isOn = false
    // } else {
    //   isOn = true;
    // }
    
    // shortcut for the above
    if(enter){
      isOn = !isOn;
      enter=false;
    }
    console.log(isOn)
  }else{
      enter=true;
    }
}

function mousePressed() {
  if (mouseX > 100 && mouseX < 300 && mouseY > 100 && mouseY < 300) {
    // isOn = true;
    
    // for Part 2
    // if (isOn == true) {
    //   isOn = false
    // } else {
    //   isOn = true;
    // }
    
    // shortcut for the above
    isOn = !isOn;
    
    console.log(isOn)
  }
}




//The boolean variable isOn can only have two values: true or false. Toggling means switching between these two states each time a condition (in this case, a mouse click) is met.

// logical NOT operator.
// It negates the current value of isOn. So, if isOn is true, !isOn becomes false, and vice versa. By assigning !isOn back to isOn, you toggle its state in a more concise way.

// Example of What Happens on a Click:
// Initial state: isOn is false.
// Click detected inside the rectangle: isOn = !isOn flips isOn to true.
// Next click inside the rectangle: isOn = !isOn flips isOn back to false.
//Each click toggles the state of isOn between true and false.



/*
Part 2: Add on
Toggle the state of the square.
Can you create an interaction where you flip the color back and forth from white to black and back?

If it is white, click to flip it to black.
If it is black, click to flip it to white.

Just like flipping a light switch on and off.

Extra: Can you toggle the background color at the same time, too?
*/
