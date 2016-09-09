var pointApplied_x;

function setup(){
  createCanvas(900,900);
  background('white');

  center = createVector(150,275);
  pointApplied_x = createSlider(0,300,300,10);
  pointApplied_x.position(300,100,200);
  end = createVector(450,450);
  pointApplied = createVector(center.x+pointApplied_x.value(),center.y);
  momentArm = new Arrow(center,pointApplied);
  momentArm.color = color('blue');
  momentArm.width = 10;
  momentArm.showComponents = false;
  momentArm.draggable = false;
  momentArm.grab = false;
  force1 = new Arrow(pointApplied,end);
  force1.color = color('red');
  force1.grab = true;
  force1.draggable = false;
  force1.showComponents = true;
}

function draw(){
  background('white');

  fill('grey');
  rect(200,250,300,50);
  polygon(center.x,center.y,75,6);


  momentArm.update();
  force1.update();
  momentArm.display();
  force1.display();
  torque = (force1.target.y-force1.origin.y).toFixed(0)*pointApplied_x.value()/10;

  text("Torque= "+torque.toFixed(0)+" N-cm",500,400);
  text("Moment Arm Length= "+(pointApplied_x.value()/10).toFixed(0)+" cm",400,100);

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
