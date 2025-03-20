/* What's different about the 3 approaches below? What does each approach allow you to do?
*/

// Approach 0: Add 2 numbers together
function add0() {
  console.log(3 + 5);
}

// Approach 1: Add 2 numbers together
function add1(a, b) {
  console.log(a + b);
}
// Approach 2: Add 2 numbers

let sum;
function add2(a, b) {
  sum = a + b;
}

add2(3, 5);
console.log(sum);

// Approach 3: Add 2 numbers together
function add3(a, b) {
  return a + b;
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}