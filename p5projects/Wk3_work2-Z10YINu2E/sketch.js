// Challenge: Change the behavior so that when you mouse over a column, you turn it red and it stays red until the next time you mouse over it again, at which point the column goes back to white. (Just get this working for one column.)



function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
  
  if(mouseX <= width/2 && mouseY <= height/2){
    if (mouseIsPressed){
       fill(253, 62, 129);
    rect(0,0,width/2, height);
    }
  }else{
    fill(47, 45, 46);
    rect(width/2,0, width, height);
  }  
}