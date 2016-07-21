//note --- the webpage does not work when page is refreshed in browser


var mass; //mass
var g; //gravity
var rho;
var Cd;
var A;
var start;

function setup() {

  canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');

  g = -9.81;//m/s2
  mass = createSlider(1,20,10);//kg
  mass.position(350,750);
  massText = createDiv('Use this slider to change mass');
  massText.position(350,800);
  rho = createSlider(0,100,1.225);
  rho.position(10,750);//kg/m3
  rhoText = createDiv('Use this to change density of fluid medium');
  rhoText.position(10,800);
  Cd = .15;//dimensionless
  A = 0.05;//m2

  start = createButton('Click to start freefall');
  start.position(50,150);
  start.mousePressed(run);

  velocity = createVector(0,0);
  acceleration = createVector(0,0);
  basePosition = createVector(width/2,height/2);
  weight = createVector(0,-(mass.value()*g));
  drag = createVector(0,0);

  bg = new movingBackground('clouds',basePosition,velocity,acceleration);

  center = createVector(width/2,height/2);
  velVec = new Arrow(center,p5.Vector.add(center,bg.velocity))
  velVec.color="green";
  velVec.grab = false;
  velVec.draggable = false;
  velVec.showComponents = false;

  accelVec = new Arrow(center,p5.Vector.add(center,bg.acceleration))
  accelVec.color="purple";
  accelVec.grab = false;
  accelVec.draggable = false;
  accelVec.showComponents = false;

  dragVec = new Arrow(center,p5.Vector.add(center,drag))
  dragVec.color = "blue";
  dragVec.grab = false;
  dragVec.draggable = false;
  dragVec.showComponents = false;

  gravVec = new Arrow(center,p5.Vector.add(center,weight))
  gravVec.color = "red";
  gravVec.grab = false;
  gravVec.draggable = false;
  gravVec.showComponents = false;

  frameRate(30);//use to slow things down a bit

  noLoop();
}

function draw() {
  background('white');

//Limits the freefall velocity using net force(weight-drag) to acheive terminal velocity


    weight = createVector(0,-(mass.value()*g));

    drag.y = ((rho.value())*(Cd)*(A)*((bg.velocity.y)*(bg.velocity.y)))/2; //mimics real drag equation, scalar quantity
    bg.acceleration = createVector(0,-(weight.y-drag.y)/mass.value());//accel must be negative to mimic falling in science lib


    bg.update();
    bg.display();

  rectMode(CORNER);
  push();
  velVec.target = p5.Vector.add(center,p5.Vector.mult(bg.velocity,-1));//cloud vel positive, ball falling needs to be made negative
  velVec.update();
  velVec.display();
  pop();
  dragVec.target = p5.Vector.add(center,p5.Vector.mult(drag,-1));//drag needs to be given direction
  dragVec.update();
  dragVec.display();
  gravVec.target = p5.Vector.add(center,p5.Vector.mult(weight,1));
  gravVec.display();
  accelVec.target = p5.Vector.add(center,p5.Vector.mult(bg.acceleration,-1*mass.value()));//really force vector, multiplied by mass to be equivalent with weight vec at start of sim
  accelVec.update();
  accelVec.display();
  fill('orange');
  ellipse(center.x,center.y,mass.value()*3,mass.value()*3);//scale size of ball to mass



console.log(weight.y)
console.log(bg.velocity.y)
console.log(bg.acceleration.y)
console.log(drag.y)
}
function run() {
  loop();
}
