var rampSlider;
var theta;
var thetaVal;
var rightCorner;
var apex;
var center;

function setup(){
  createCanvas(700,500);
  background('blue');



  rampSlider = createSlider(-150,150,0);
  rampSlider.position(100,550);

  thetaVal = atan((400-(250-rampSlider.value))/(500));
  theta = thetaVal

  rightCorner = new createVector(600,400);
  apex = new createVector(100,250-rampSlider.value());

  center = new createVector((apex.x+rightCorner.x)/2,(apex.y+rightCorner.y)/2);

}

function draw(){
  background('blue');
  rectMode(CORNER);
  fill('green');
  rect(0,400,700,100); //just some scenic grass

  rightCorner = new createVector(600,400);
  apex = new createVector(100,250-rampSlider.value());
  center = new createVector((apex.x+rightCorner.x)/2,(apex.y+rightCorner.y)/2);

  theta = atan((rightCorner.y-apex.y)/(rightCorner.x-apex.x));


  fill('tan');
  triangle(100,400,apex.x,apex.y,rightCorner.x,rightCorner.y);

  fill('white');
  text("Angle = "+theta+" radians",450,450);

  rectMode(CENTER);
  fill('brown');
  translate(center.x,center.y);//translates coordinate to center so box rotates correctly
  rotate(theta);
  rect(0,-40,80,80);//(0,0) is new position of center

}
