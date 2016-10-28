//create sketch2 using fbd object 

var center, weight;

function setup(){
  createCanvas(700,500);
  background('blue');

  m = 10;//mass of block in kg
  g = 9.81;//gravity

  muSlider = createSlider(0.1,0.9,0.5,0.1);
  muSlider.position(100,580);

  mu_s = muSlider.value();//coefficient of static friction
  mu_k = muSlider.value()/2;//kinetic
  weight = new createVector(0,m*g);
  mu = mu_s; //set as static friciton to start



  //slider used to add/subtract y-value to apex of triangle, thus changing the angle of ramp
  rampSlider = createSlider(-150,200,0);
  rampSlider.position(100,550);
  //calculate angle of ramp
  theta = atan((400-(250-rampSlider.value))/(500));
  //setup ramp triangular coordinates using vectors
  rightCorner = new createVector(600,400);
  apex = new createVector(100,250-rampSlider.value());
  //calculate middle of incline as vector so that those coordinates can be used to draw the box
  center = new createVector((apex.x+rightCorner.x)/2,(apex.y+rightCorner.y)/2);

  friction = m*mu*g*cos(theta);
  rampGrav = m*g*sin(theta);

  //where x-dir is parallel to ramp and y-dir is normal to ramp
  boxAccl = new createVector((rampGrav-friction)/m,0);
  boxVel = 0;
  boxPos = 0;


  reset = createButton('reset');
  reset.position(200,200);
  reset.mousePressed(reset2);

 // frameRate(15);
}

//resets the box to middle of ramp and gives it 0 velocity and acceleration
reset2 = function(){
  boxPos=0;
  boxVel=0;
  boxAccl = new createVector(0,0);
}

function draw(){
  angleMode(DEGREES);
  background('blue');
  strokeWeight(1);
  rectMode(CORNER);
  fill('green');
  rect(0,400,700,100); //just some scenic grass

  mu_s = muSlider.value();//coefficient of static friction
  mu_k = muSlider.value()/2;//kinetic

  //coordinates again of triangle ramp and box location
  rightCorner = new createVector(600,400);
  apex = new createVector(100,250-rampSlider.value());
  center = new createVector((apex.x+rightCorner.x)/2,(apex.y+rightCorner.y)/2);
  //recalculate angle in case ramp geometry has changed
  theta = atan((rightCorner.y-apex.y)/(rightCorner.x-apex.x));

  if (boxVel == 0){
    mu = mu_s;
  } else{
    mu = mu_k;
  };

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
      boxVel = boxVel + boxAccl.x;
  } else{
    boxVel = 0;
  };

  //set position vector to be origin of all arrow objects
  gravCenter = new createVector(center.x+(cos(theta)*(boxPos))+(sin(theta)*40), center.y-40+(sin(theta)*(boxPos+10)));

  box_fbd = new FBD(gravCenter,3,true);

box_fbd.showLabels = true;
box_fbd.showResultant = false;

//stops the box from moving when it reaches the stop
if(boxPos > 200){
  boxPos=205;
  boxVel = 0;
  boxAccl = new createVector(0,0);
  friction = rampGrav;
};

  netForce_ = rampGrav - friction;

  box_fbd.mag = [weight.y,normalForce_,friction];
   box_fbd.direction = [90,-90+theta,180+theta];
   box_fbd.xoffsets = [0,0,0];
   box_fbd.yoffsets = [0,0,0];
   if(mu == mu_s){
     box_fbd.labels = ['gravity','normal','static friction'];
   } else if (mu == mu_k){
     box_fbd.labels = ['gravity','normal','kinetic friction'];
   };



  boxAccl = new createVector((rampGrav-friction)/m,0);
  //vector was not used for velocity here because the box only moves uni-directionly along ramp
  //this however should be changed and vectors should be used.....

  boxPos = boxPos + boxVel;

  //draw the ramp
  fill('tan');
  triangle(100,400,apex.x,apex.y,rightCorner.x,rightCorner.y);

  //angle text output
  fill('white');
  text("Angle of Ramp = "+theta.toFixed(2)+" degrees",300,450);
  text("Net Force = "+netForce_.toFixed(2)+" Newtons",500,475);
if (mu == mu_s){
  text("Mu = "+mu+" Static",300,475);
} else{
  text("Mu = "+mu+" Kinetic",300,475);
};


push();
  rectMode(CENTER);
  fill('brown');

  translate(center.x,center.y);//translates coordinate to center so box rotates correctly

  rotate(theta);//rotate box to be flush with ramp according to angle theta

  rect(boxPos,-40,80,80);//(0,0) is new position of center

  stroke('black');
  strokeWeight(15);
  //draw a stop for the box to prevent any weird transitions of box moving from ramp to ground
  line(250,0,250,-40);
pop();

box_fbd.update();
box_fbd.display();

//  console.log(friction)
//  console.log(rampGrav)
//    console.log(mu)
//    console.log(netForce_)
//    console.log(boxVel)
//    console.log(boxVel)

}
