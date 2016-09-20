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
projectile = new Mover(initialPos, initialVel, g, 20, 'orange');
projectile.tail = true;
projectile.limit = 50;

velVec = new Arrow(projectile.position,p5.Vector.add(projectile.position,projectile.velocity));
velVec.color = color('red');
velVec.grab = true;
velVec.draggable = false;

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
};

velVec.color = color('red');

velVec.update();
velVec.display();


}

function initiate(){
  projectile.velocity = createVector(velVec.target.x-velVec.origin.x, velVec.target.y-velVec.origin.y);
  p5.Vector.mult(projectile.velocity,.1);
  projectile.acceleration = createVector(0,.981);
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
