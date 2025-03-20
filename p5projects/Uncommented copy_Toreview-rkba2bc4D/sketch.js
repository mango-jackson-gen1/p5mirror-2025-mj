
let words = []; // 1. Declare a variable words and initialize it with an empty array.
let p; // 2. Declare a variable p to hold parapgraph element
let str = ''; // 3. Declare str variable and initialize with an empty string.

function preload() { // 4. Pre-load text file and calls process when it's done
  loadStrings('bang.txt', process);
}

function setup() {
  noCanvas(); // 15. Don't draw a canvas
  p = createP(); // 16. Create a paragraph element and assign it p
}

function draw() {
  if(frameCount%30 ==0) { // Every 30 frames
    let next_word = random(words); // Pick a random word out of the words array and assign it to the next_word variable
    str +=  next_word + ' '; // Add next_word and space to str variable
    p.html(str); // Update html of paragraph with ENTIRE str
  }
}

function process(lines) { // 5. Turning the text into individual words
  for(let ln of lines) { // 5. Iterate through each line of the text
    let tokens = splitTokens(ln); // 6. Split the line into word units stored in an array
    words = words.concat(tokens); // 7. Add tokens to the words array as individual words
  }
  
  for(let w = words.length - 1; w >=0; w--) { // 8. Loop through words backwards
    let word = words[w]; // 9. Get me the words stored at index w in the words array, assign it to a variable called word
    word = word.replace(/[\-_!?.,;:\(\)]/g, ''); // 10. Take the word, replace any punctuation with nothing and assign it back to word.
    word = word.toLowerCase(); // 11. Take the word, lowercase it and assign it back to word.
    word = word.trim(); // 12. Take the word, get rid of whitespace before/after and assign it back to word
    if(word.length < 1) words.splice(w, 1); // 13. If empty word, remove it from the array
    else words[w] = word; // 14. Otherwise assign back to the array at index w
  }
}