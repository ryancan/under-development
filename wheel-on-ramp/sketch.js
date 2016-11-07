//create sketch2 using fbd object

var center, weight;

function setup(){
  createCanvas(700,500);
  background('blue');
  angleMode(DEGREES);

  m = 10;//mass of block in kg
  g = 0.0981;//gravity

  muSlider = createSlider(0.1,0.9,0.5,0.1);
  muSlider.position(100,580);

  mu_s = muSlider.value();//coefficient of static friction
  weight = new createVector(0,m*g);
  mu = mu_s; //set as static friciton to start

  theta = 30;

  //setup ramp triangular coordinates using vectors
  rightCorner = new createVector(600,400);
  apex = new createVector(100,400-(500*tan(theta)));

  friction = m*mu*g*cos(theta);
  rampGrav = m*g*sin(theta);

  //where x-dir is parallel to ramp and y-dir is normal to ramp
  wAccl = new createVector((rampGrav-friction)/m,0);
  wVel = 0;


  w = new wheel(apex.x+cos(theta)*28,apex.y-sin(theta)*28,40);
  w.rotate = true;

  w.cdecorate = true;
  w.vdecorate = false;
  w.rotation = true;
  w.translation = false;
  w.rimColor = color('rgba(0,0,0,1)');
  w.spokeColor = color('rgba(100,100,100,1)');
  w.wheelColor = color('rgba(0,0,0,.1)');

  reset = createButton('reset');
  reset.position(400,200);
  reset.mousePressed(reset2);

//  frameRate(15);
}

//resets the box to middle of ramp and gives it 0 velocity and acceleration
reset2 = function(){
  w.x = apex.x+cos(theta)*28;
  w.y = apex.y-sin(theta)*28;
  wVel=0;
  wAccl = new createVector(0,0);
}

function draw(){
  angleMode(DEGREES);
  background(100,200,230);
  strokeWeight(1);
  rectMode(CORNER);
  fill('green');
  rect(0,400,700,100); //just some scenic grass

  mu_s = muSlider.value();//coefficient of static friction


  normalForce_= m*g*cos(theta);
  friction = mu*normalForce_;
  rampGrav = m*g*sin(theta);

  //keeps box in equilibrium untill gravity overcomes friction
  if (friction > rampGrav){
    friction = rampGrav;
  };

  //where x-dir is parallel to ramp and y-dir is normal to ramp
  //takes care of stopping sliding if ramp is lowered
  if (friction < rampGrav){
      wVel = wVel + wAccl.x;
  } else{
    wVel = 0;
  };


  netForce_ = rampGrav - friction;

  wAccl = new createVector((rampGrav-friction)/m,0);
  //vector was not used for velocity here because the box only moves uni-directionly along ramp
  //this however should be changed and vectors should be used.....

  //draw the ramp
  fill('tan');
  triangle(100,400,apex.x,apex.y,rightCorner.x,rightCorner.y);


  w.update();
  w.draw();

  w.x += wVel*cos(theta);
  w.y += wVel*sin(theta);
  w.trans_speed = 10*wVel;
  w.ang_speed = w.trans_speed / w.r;

  //stops the box from moving when it reaches the stop
  if(w.y > 374){

    w.y = 375
    wAccl = new createVector(0,0);
    friction = rampGrav;
  };


  //angle text output
  fill('white');
  text("Angle of Ramp = "+theta.toFixed(2)+" degrees",300,450);
  text("Net Force = "+netForce_.toFixed(2)+" Newtons",500,475);
if (mu == mu_s){
  text("Mu = "+mu+" Static",300,475);
} else{
  text("Mu = "+mu+" Kinetic",300,475);
};

}
