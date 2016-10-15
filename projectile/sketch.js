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
no_g = createVector(0,0); //a zero vector used to keep the ball stationary
projectile = new KineticMass(initialPos, initialVel, no_g, 20, 'orange');
projectile.tail = true; //enabled to track projectile motion
projectile.limit = 10; //used to keep projectile visible on screen if the user tries to apply too large an initial velocity
projectile.tailFill = color('white');
projectile.tailStroke = color('white');

//create arrow objects to represent vectors based off of the projectiles actual velocity and acceleratiion

velVec = new Arrow(projectile.position,p5.Vector.add(projectile.position,projectile.velocity));
velVec.color = color('red');
velVec.grab = true; //enables user to grab vector tip to change initial applied velocity
velVec.draggable = false;
velVec.width = 10;//make the arrow vector objects a little thinner to have comparable size with projectile

gravVec = new Arrow(projectile.position,p5.Vector.add(projectile.position,projectile.acceleration));
gravVec.color = color('purple');
gravVec.grab = false; // booleans set to false so that user cannot affect gravitational force
gravVec.draggable = false;
gravVec.width = 10;//make the arrow vector objects a little thinner to have comparable size with projectile

}

function draw(){
background('white');
fill('green');
rect(0,349,720,50); //scenic grass
fill('blue');
rect(0,0,720,350); //scenic sky

//Conditional used to induce bouncing
if (projectile.position.y > 340){
  projectile.velocity.y *= -.8;
  projectile.position.y = 340;
};

//update prjectile before it's corresponding arrow vectors so that the arrows reflect the current values
projectile.update();
projectile.display();

//this conditional allows the velocity arrow vector to only be able to be grabbed and changed
//when the projectile is in the initial starting position
if (projectile.velocity.x == 0 && projectile.velocity.y == 0){
  velVec.grab = true;
}else{
  velVec = new Arrow(projectile.position,p5.Vector.add(projectile.position,projectile.velocity));
  velVec.grab = false;
  gravVec = new Arrow(projectile.position,p5.Vector.add(projectile.position,projectile.acceleration));

  //scale the velocity and gravity arrow vectors to make visible to the user
  velVec.target = p5.Vector.add(projectile.position,p5.Vector.mult(projectile.velocity,5));
  gravVec.target = p5.Vector.add(projectile.position,p5.Vector.mult(projectile.acceleration,200));

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

//function to apply initial velocity to stationary projectile based off of user input dragged velocity Vector
//function also applies gravity as there is no real ground providing a normal force on the ball to keep stationary
function initiate(){
  projectile.velocity = createVector(velVec.target.x-velVec.origin.x, velVec.target.y-velVec.origin.y);
  projectile.acceleration = createVector(0,.981/5);
}

//function that resets ball after being launched to original position and sets velocity and acceleration to zero
//function also re-enables the velocity vector tip to be grabbed to change the initial velocity that will be applied using the initiate button
function fetchBall() {
  projectile.position.x = initialPos.x;
  projectile.position.y = initialPos.y;
  projectile.velocity.x = initialVel.x;
  projectile.velocity.y = initialVel.y;
  projectile.acceleration.x = no_g.x;
  projectile.acceleration.y = no_g.y;
  velVec = new Arrow(projectile.position,p5.Vector.add(projectile.position,projectile.velocity));
  velVec.draggable = false;
  gravVec = new Arrow(projectile.position,p5.Vector.add(projectile.position,no_g));
  gravVec.grab = false;
  gravVec.draggable = false;
}
