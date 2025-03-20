/*
Suggestions?
- No repeated names
- Fancy and add some color!
- Maybe some notification when we're finished
- Different font for each presenter
- reset the generator
- Generate based on mouse click instead of re-playing sketch
- Just print all names on canvas, but in a random order or use a drumroll
*/

let names = ["Omi", "Sophia", "Fiona", "Michelle", "Duban", "Surya"];

function setup() {
  createCanvas(400, 400);
  background(220)
  let indexPos = int(random(0,6))

  console.log(indexPos);
  console.log(names[indexPos]);
  
  let chosenOne = names[indexPos];
  
  textSize(40)
  textAlign(CENTER)
  text(chosenOne, width/2, height/2)
}
