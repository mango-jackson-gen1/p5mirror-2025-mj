let str ='I dunk a skunk in a trunk full of gunk';
let x; 
let y;
let c;

//console.log(str.chartAt(1));

function setup() {
  createCanvas(400, 400);
  textSize(36);
  textAlign(LEFT, TOP); //Tolook up 
}

function draw() {
  //background(220);  
  for (let c= 0; c< str.lenghth; c++) {
  let ch = str.charAt(c);
  text(ch, x, y);
  x+=textWidth(ch);
    if(x> width){
      x = 0;
      y += textAscent() + textDescent();//?
    }
  }
  c++;
  C%=str.length;
}