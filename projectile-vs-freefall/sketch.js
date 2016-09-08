var vSlider;
var resetButton;

function setup(){
  createCanvas(720,400);
  background(230);
  resetButton = createButton('Start/Reset');
  resetButton.position(450,20);
  vSlider = createSlider(0,50,1);
  vSlider.position(50,20);
  text = createDiv("Use this to increase the blue ball's horizontal velocity")
  text.position(50,50);
  pos1 = createVector(50,100);
  vel1 = createVector(0,0);
  pos2 = createVector(150,100);
  vel2 = createVector(vSlider.value(),0);
  g = createVector (0,5);
  ball1 = new Mover(pos1,vel1,g,20,'red');
  ball2 = new Mover(pos2,vel2,g,20,'blue');
  ball1.tail = true;
  ball2.tail = true;

  resetButton.mousePressed(reset);

}
function draw(){
  background(230);
  ball1.update();
  ball2.update();
  ball1.display();
  ball2.display();

  if (ball1.position.y > 400){ball1.velocity.y = 0; ball2.velocity.y = 0; ball2.velocity.x = 0;}

}

function reset(){
    ball1.position.y = 100;
    ball2.position.y = 100;
    ball2.position.x = 150;
    //needed to initiate movement after resetting?
    ball1.velocity.y = ball1.velocity.y + g.y;
    ball2.velocity.y = ball2.velocity.y + g.y;
    ball2.velocity.x = ball2.velocity.x + vSlider.value();
};
