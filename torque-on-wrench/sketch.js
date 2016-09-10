var pointApplied_x;

function setup(){
  createCanvas(900,900);
  background('white');

//Create some vectors, arrows, and a slider
  center = createVector(150,275);
  pointApplied_x = createSlider(0,300,300,10);
  pointApplied_x.position(300,100,200);
  end = createVector(450,450);
  pointApplied = createVector(center.x+pointApplied_x.value(),center.y);
  momentArm = new Arrow(center,pointApplied);
  force1 = new Arrow(momentArm.target,end);

}

function draw(){
  background('white');

//Draw wrench and bolt
  fill('grey');
  rect(200,250,300,50);
  polygon(center.x,center.y,80,6);
  fill('white');
  noStroke();
  rect(70,250,110,50);
  fill(150,20,40);
  polygon(center.x,center.y,30,6);

  stroke(1);
  pointApplied = createVector(center.x+pointApplied_x.value(),center.y);

  momentArm = new Arrow(center,pointApplied);
  momentArm.color = color('blue');
  momentArm.width = 10;
  momentArm.showComponents = false;
  momentArm.draggable = false;
  momentArm.grab = false;
  force1.origin.x = pointApplied.x;
  force1.color = color('red');
  force1.grab = true;
  force1.draggable = false;
  force1.showComponents = true;

  momentArm.update();
  force1.update();
  momentArm.display();
  force1.display();

  //Calculate Torque
  torque = -1*(force1.target.y-force1.origin.y).toFixed(0)*pointApplied_x.value()/10;

  fill('black');
  text("The blue arrow is the position vector corresponding to the moment arm",50,20);
  text("The red arrow is the force vector",50,35);
  text("Torque= "+torque.toFixed(0)+" N-cm",500,400);
  text("Moment Arm Length= "+(pointApplied_x.value()/10).toFixed(0)+" cm",400,100);


  if (torque < 0){
    text("The bolt will tighten (Negative Toqrue, going into screen along -z axis)",50,400);
  } else if (torque > 0){
    text("The bolt will loosen(Positive Torque, coming out of screen along +z axis)",50,400);
  } else{
    text("The bolt will not move! No moment applied!",50,400);
}
}

//taken from p5.js examples
function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
