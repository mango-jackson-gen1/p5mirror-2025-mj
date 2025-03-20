
let words = []; // 1. Declare a variable words and initialize it with an empty array.
let p; // 2. Declare a variable p to hold parapgraph element
let str = ''; // 3. Declare str variable and initialize with an empty string.

function preload() { // 4. Pre-load text file and calls process when it's done
  loadStrings('bang.txt', process);
}

function setup() {
  noCanvas();
  p = createP();
}

function draw() {
  if(frameCount%30 ==0) {
    let next_word = random(words);
    str +=  next_word + ' ';
    p.html(str);    
  }
}

function process(lines) { // 5. Turning the text into individual words
  for(let ln of lines) { // 5. Iterate through each line of the text
    let tokens = splitTokens(ln); // 6. Split the line into word units stored in an array
    words = words.concat(tokens); // 7. Add tokens to the words array as individual words
  }
  
  for(let w = words.length - 1; w >=0; w--) { // 8. loop through words backward
    let word = words[w];
    word = word.replace(/[\-_!?.,;:\(\)]/g, '');
    word = word.toLowerCase();
    word = word.trim();
    if(word.length < 1) words.splice(w, 1);
    else words[w] = word;
  }
}