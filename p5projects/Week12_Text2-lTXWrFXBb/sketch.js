let str = '';
let p;
let words=[];

//use preload, so all the data is in beofore the sketch is load


function preload(){
  loadStrings('turkey.txt', process) ; 
  // after the text is loaded, then process function / callback will be triggered. 
}
function setup() {
  noCanvas();
  p = createP();
  
}

function draw() {
  if (frameCount % 5 ==1){
    str += random(words) + '';
      p.html(str);
  }
}

function process(lines){
//  console.log(lines);
  for(let line of lines){
    console.log('before', line);
    let tokens = splitTokens(line);
        console.log('tokens', token);
    words.push(tokens);
    
//     for (let token of tokens) word.push(token);
//     words = words.concat(tokens);
    
    
    for(let word of words){
      let word = words[w];
      word = word.trim();
      word = word.toLowerCase();
      word = word.replace(/[-_:.,''()?!]/g, '') // replace and remove all the puctuations, put - first 
      words[w] = word;
      console.log('after', word);
    }
    
  }
}
