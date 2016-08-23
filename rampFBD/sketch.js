var rampSlider;
var theta;
var thetaVal;
var m;
var g;
var boxAccl;
var boxVel;
var boxPos;
var reset;
var mu;
var friction;
var rampGrav;


function setup(){
  createCanvas(700,500);
  background('blue');

  m = 5;//mass of block
  g = 0.0981;//gravity
  mu = .3;//coefficient of static friction

  //slider used to add/subtract y-value to apex of triangle, thus changing the angle of ramp
  rampSlider = createSlider(-150,150,0);
  rampSlider.position(100,550);

  //calculate angle of ramp
  theta = atan((400-(250-rampSlider.value))/(500));

  //setup ramp triangular coordinates using vectors
  rightCorner = new createVector(600,400);
  apex = new createVector(100,250-rampSlider.value());

  //calculate middle of incline as vector so that those coordinates can be used to draw the box
  center = new createVector((apex.x+rightCorner.x)/2,(apex.y+rightCorner.y)/2);

  boxAccl = new createVector(0,0);
  boxVel = 0;
  boxPos = 0;

//  gravVec = new Arrow(center,p5.Vector.add(center,boxAccl));
//  gravVec.color="purple";
//  gravVec.grab = false;
//  gravVec.draggable = false;
//  gravVec.showComponents = false;

  //trying to use science lib fbd on box
//  box_fbd = new FBD(center,4,true);

  reset = createButton('reset');
  reset.position(200,200);
  reset.mousePressed(reset2);
}

//resets the box to middle of ramp and gives it 0 velocity and acceleration
reset2 = function(){
  boxPos=0;
  boxVel=0;
  boxAccl = new createVector(0,0);
}

function draw(){
  background('blue');
  strokeWeight(1);
  rectMode(CORNER);
  fill('green');
  rect(0,400,700,100); //just some scenic grass

  //coordinates again of triangle ramp and box location
  rightCorner = new createVector(600,400);
  apex = new createVector(100,250-rampSlider.value());
  center = new createVector((apex.x+rightCorner.x)/2,(apex.y+rightCorner.y)/2);

  //recalculate angle in case ramp geometry has changed
  theta = atan((rightCorner.y-apex.y)/(rightCorner.x-apex.x));


  friction = m*mu*g*cos(theta);
  rampGrav = m*g*sin(theta);

  if (friction > rampGrav){
    friction = rampGrav;
  };

  boxAccl = new createVector(0,(rampGrav-friction)/m);
  //vector was not used for velocity here because the box only moves uni-directionly along ramp
  //this however should be changed and vectors should be used.....
  boxVel = boxVel + boxAccl.y;
  boxPos = boxPos + boxVel;

  //draw the ramp
  fill('tan');
  triangle(100,400,apex.x,apex.y,rightCorner.x,rightCorner.y);

  //angle text output
  //how to limit sig figs ???
  fill('white');
  text("Angle = "+theta+" degrees",450,450);

  rectMode(CENTER);
  fill('brown');
  translate(center.x,center.y);//translates coordinate to center so box rotates correctly
  rotate(theta);//rotate box to be flush with ramp according to angle theta
  rect(boxPos,-40,80,80);//(0,0) is new position of center
  stroke('black');
  strokeWeight(15);
  //draw a stop for the box to prevent any weird transitions of box moving from ramp to ground
  line(250,0,250,-40);

  //stops the box from moving when it reaches the stop
  if(boxPos > 200){
    boxPos=205;
    boxVel = 0;
    boxAccl = 0;
  };

  angleMode(DEGREES);

//  box_fbd.mag = [550*g,friction,rampGrav,friction/mu];
//  box_fbd.direction = [90,180+theta,-1*theta,theta];
//  box_fbd.xoffsets = [0,0,0,0];
//  box_fbd.yoffsets = [0,0,0,0];
//  box_fbd.labels = ['force 1','force 2','force 3','force 4'];

  //fill('red');
//  box_fbd.update();
//  box_fbd.display();

 //gravVec.target = p5.Vector.add(center,p5.Vector.mult(g,1000));
//  gravVec.update();
//  gravVec.display();

}