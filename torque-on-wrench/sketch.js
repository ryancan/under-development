var pointApplied_x;

function setup(){
  createCanvas(900,900);
  background('white');

//Create some vectors, arrows, and a slider
  center = createVector(150,275);
  pointApplied_x = createSlider(0,350,300,10);
  pointApplied_x.position(80,100,200);
  end = createVector(450,450);
  pointApplied = createVector(center.x+pointApplied_x.value(),center.y);
  positionVector = new Arrow(center,pointApplied);
  force1 = new Arrow(positionVector.target,end);

}

function draw(){
  background('white');
  strokeWeight(1);
//Draw wrench and bolt
  fill('grey');
  rect(200,250,300,50);
  polygon(center.x,center.y,80,6);
  fill('white');
  noStroke();
  rect(70,250,110,50);
  fill('gray');
  stroke(1);
  polygon(center.x,center.y,28,6);
  fill('white');
  ellipse(center.x,center.y,30,30);
  line(85,250,180,250);
  line(85,300,180,300);
  line(180,250,180,300);

  stroke(1);
  pointApplied = createVector(center.x+pointApplied_x.value(),center.y);

  positionVector = new Arrow(center,pointApplied);
  positionVector.color = color('blue');
  positionVector.width = 10;
  positionVector.showComponents = false;
  positionVector.draggable = false;
  positionVector.grab = false;

//save old value to use for compensating for slider change
  oldX = force1.origin.x;

  force1.origin.x = pointApplied.x;
  force1.color = color('red');
  force1.grab = true;
  force1.draggable = false;
  force1.showComponents = false;


//keeping integrity of force vector while enduring slider change
  if (mouseIsPressed){
    dx = force1.origin.x - oldX;
    force1.target.x = force1.target.x + dx;
  };

  positionVector.update();
  force1.update();
  positionVector.display();
  force1.display();

  //calculate angle phi between position and force vector (limited to (-90,90)degrees)
  //so absolute value of x so that y value is used to give proper sign/sense for torque calculation
  phi = atan((force1.target.y-force1.origin.y)/abs(force1.target.x-force1.origin.x));
  force1mag = dist(force1.origin.x,force1.origin.y,force1.target.x,force1.target.y);

  //Calculate Torque
  torque = -1*sin(phi)*force1mag*pointApplied_x.value()/100;
  //when pointApplied_x.val = 100 , take to be 100mm, divide by 100 for N-m torque calculation


  fill('black');
  text("Applied Force (F) = "+force1mag.toFixed(0)+" N",100,20);
  text("Torque = "+torque.toFixed(0)+" N-m",100,50);
  text("Position Vector (r) = "+(pointApplied_x.value()/10).toFixed(0)+" cm",100,100);
  text("F",force1.target.x+15,force1.target.y+15);
  text("r",positionVector.target.x-20,positionVector.target.y+15);

//draw torque vector into or out of page at center of nut/bolt
  if (torque < 0){
    strokeWeight(3);
    line(center.x-10,center.y-10,center.x+10,center.y+10);
    line(center.x-10,center.y+10,center.x+10,center.y-10);
    noFill();
    arc(center.x, center.y, 30, 30, 0, TWO_PI);

  } else if (torque > 0){
    strokeWeight(3);
    ellipse(center.x, center.y, 5, 5);
    noFill();
    arc(center.x, center.y, 30, 30, 0, TWO_PI);
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
