function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  translate(width/2, height/2);
  
  for (let i=20; i>0; i--){
    let offset = i/100;
    
    let x = radians(frameCount)*1;
    let trig = atan(10*sin(x- offset))/atan(10);

  trigMapped = map(trig, -1,1, -height/4, height/4);
  
    push();
      if(i%2 ==1){
        fill(255);
      }else fill(0);
         circle(0, trigMapped, height* i/50);
      pop();
      }    
}