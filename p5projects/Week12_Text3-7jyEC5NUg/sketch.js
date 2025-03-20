// Object literal 
//key: indexing, has to unique. to be secure , to unlock one things

let word_count={
  'hi':1;
  'bye':10;
  
};




function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
      // with object, you have to use key 

  for (let word in word_count){
    text(word, random(width), random(height)))
    let wc = word_count[word];
    
    
  }
  
  noLoops();



}