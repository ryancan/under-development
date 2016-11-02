var vSlider;
var resetButton;

function setup(){
  createCanvas(720,400);
  background(230);
  resetButton = createButton('Start/Reset');
  resetButton.position(450,20);
  vSlider = createSlider(0,7,1);
  vSlider.position(50,20);
  text = createDiv("Use this to increase the blue ball's horizontal velocity")
  text.position(50,50);
  pos1 = createVector(50,100);
  vel1 = createVector(0,0);
  pos2 = createVector(150,100);
  vel2 = createVector(vSlider.value(),0);
  g = createVector (0,.0981);
  ball1 = new KineticMass(pos1,vel1,g,20,'red');
  ball2 = new KineticMass(pos2,vel2,g,20,'blue');
  ball1.tail = true;
  ball2.tail = true;

  resetButton.mousePressed(reset);

}
function draw(){
  background(300);

  ball1.tail = true;
  ball2.tail = true;

  ball1.update();
  ball2.update();
  ball1.display();
  ball2.display();

  ball1a = new Arrow(ball1.position,p5.Vector.add(ball1.position,p5.Vector.mult(g,300)));
  ball1a.color = color('purple');
  ball1a.width = 10;

  ball2a = new Arrow(ball2.position,p5.Vector.add(ball2.position,p5.Vector.mult(g,300)));
  ball2a.color = color('purple');
  ball2a.width = 10;

  ball1v = new Arrow(ball1.position,p5.Vector.add(ball1.position,p5.Vector.mult(ball1.velocity,5)));
  ball1v.color = color('green');
  ball1v.width = 10;

  ball2v = new Arrow(ball2.position,p5.Vector.add(ball2.position,p5.Vector.mult(ball2.velocity,5)));
  ball2v.color = color('green');
  ball2v.width = 10;

  ball1a.update();
  ball1a.display();
  ball2a.update();
  ball2a.display();

  ball1v.update();
  ball1v.display();
  ball2v.update();
  ball2v.display();

  if (ball1.position.y > 420){ball1.velocity.y = 0; ball2.velocity.y = 0; ball2.velocity.x = 0;g = createVector(0,0);}

  console.log(ball1.acceleration.y)
}

function reset(){
    ball1.position.y = 100;
    ball2.position.y = 100;
    ball2.position.x = 150;
    g = createVector (0,.0981);
    ball2.velocity.x = ball2.velocity.x + vSlider.value();
};
