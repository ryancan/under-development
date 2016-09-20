var start;
var fetch;

function setup(){
createCanvas(720,400);
background('white');

start = createButton('Apply Initial Velocity');
start.position(50,10);
start.mousePressed(initiate);

fetch = createButton('Fetch Ball');
fetch.position(50,50);
fetch.mousePressed(fetchBall);

initialPos = createVector(50,340);
initialVel = createVector(0,0);
g = createVector(0,0);
projectile = new KineticMass(initialPos, initialVel, g, 20, 'orange');
projectile.tail = true;
projectile.limit = 10;
projectile.tailFill = color('white');
projectile.tailStroke = color('white');


velVec = new Arrow(projectile.position,p5.Vector.add(projectile.position,projectile.velocity));
velVec.color = color('red');
velVec.grab = true;
velVec.draggable = false;
velVec.width = 10;

gravVec = new Arrow(projectile.position,p5.Vector.add(projectile.position,projectile.acceleration));
gravVec.color = color('purple');
gravVec.grab = false;
gravVec.draggable = false;
gravVec.width = 10;

}

function draw(){
background('white');
fill('green');
rect(0,349,720,50);
fill('blue');
rect(0,0,720,350);

projectile.update();
projectile.display();

if (projectile.velocity.x == 0 && projectile.velocity.y == 0){
  velVec.grab = true;
}else{
  velVec = new Arrow(projectile.position,p5.Vector.add(projectile.position,projectile.velocity));
  velVec.grab = false;
  gravVec = new Arrow(projectile.position,p5.Vector.add(projectile.position,projectile.acceleration));

  push();
  gravVec.target.add(0,50);
  pop();
};

velVec.color = color('red');
gravVec.color = color('purple');
velVec.width = 10;
gravVec.width = 10;


gravVec.update();
gravVec.display();
velVec.update();
velVec.display();

}

function initiate(){
  projectile.velocity = createVector(velVec.target.x-velVec.origin.x, velVec.target.y-velVec.origin.y);
  p5.Vector.mult(projectile.velocity,.1);
  projectile.acceleration = createVector(0,.981/5);
}

function fetchBall() {
  projectile.position.x = initialPos.x;
  projectile.position.y = initialPos.y;
  projectile.velocity.x = initialVel.x;
  projectile.velocity.y = initialVel.y;
  projectile.acceleration.x = g.x;
  projectile.acceleration.y = g.y;
  velVec = new Arrow(projectile.position,p5.Vector.add(projectile.position,projectile.velocity));
  velVec.draggable = false;
}
