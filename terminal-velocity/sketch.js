//note --- the webpage does not work when page is refreshed in browser


var mass; //mass
var g; //gravity
var rho;
var Cd;
var R;
var A;//frontal area
var start;
var equaiton;

function setup() {

  canvas = createCanvas(800, 500);
  canvas.parent('sketch-holder');

  equation = loadImage("/drag_equation.jpeg");

  g = -9.81;//m/s2
  mass = createSlider(1,25,5);//kg
  mass.position(50,290);
  //massText = createDiv('Use this slider to change mass');
  //massText.position(350,800);
  rho = createSlider(1,30,1);
  rho.position(50,320);//kg/m3
  //rhoText = createDiv('Use this to change density of fluid medium');
  //rhoText.position(10,800);
  Cd = .15;//dimensionless
  R = createSlider(0.2,0.5,0.25,0.05);//m
  R.position(50,350);
  //Rtext = createDiv('Use this to change radius of sphere');
  //Rtext.position(200,200);
  A = PI*(R.value()*R.value());//m2 - half the surface area of a sphere

  start = createButton('Click to start freefall');
  start.position(50,200);
  start.mousePressed(run);

  velocity = createVector(0,0);
  acceleration = createVector(0,0);
  basePosition = createVector(width/2,height/2);
  weight = createVector(0,-(mass.value()*g));
  drag = createVector(0,0);

  bg = new movingBackground('clouds',basePosition,velocity,acceleration);

  center = createVector((width/2)+150,height/2);
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
bg.acceleration = createVector(0,0);
}

function draw() {
  background('white');

//Limits the freefall velocity using net force(weight-drag) to acheive terminal velocity

    weight = createVector(0,-(mass.value()*g));
    A = PI*(R.value()*R.value());//m2 - half the surface area of a sphere

    drag.y = ((rho.value())*(Cd)*(A)*((bg.velocity.y)*(bg.velocity.y)))/2; //mimics real drag equation, scalar quantity
    bg.acceleration = createVector(0,-(weight.y-drag.y)/mass.value());//accel must be negative to mimic falling in science lib

    if (abs(drag.y) > abs(weight.y)){
      drag.y = abs(weight.y);
    }

    bg.update();
    bg.display();

  rectMode(CORNER);
  push();
  velVec.target = p5.Vector.add(center,p5.Vector.mult(bg.velocity,-2));//cloud vel positive, ball falling needs to be made negative
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
  ellipse(center.x,center.y,R.value()*100,R.value()*100);//scale size of ball to mass

  fill('white');
  rect(0,0,370,500);

  fill('orange');
  text("Mass: "+mass.value()+" kg",225,150);
  text("Fluid Density: "+rho.value()+" kg/m^3",225,180);
  text("Sphere Radius: "+R.value()+" m",225,210);
  text("Frontal Area: "+A.toFixed(2)+" m^2",225,240);

  text("Velocity: "+bg.velocity.y.toFixed(2)+"m/s",150,300);

image(equation,100,400,10,10);//not showing up??




console.log(weight.y)
console.log(bg.velocity.y)
console.log(bg.acceleration.y)
console.log(drag.y)
}
function run() {
loop();
if (bg.velocity.y < 0){
  bg.velocity.y = 0;
}
//  bg.velocity = createVector(0+bg.acceleration.x,0+bg.acceleration.y);
}
