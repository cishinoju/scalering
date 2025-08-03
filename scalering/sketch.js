let angle = 0;
let targetAngle = 0;
let easing = 0.1;
let numCircles = 12;
let radius = 120;

let notes = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];

let show1 = false, show2 = false, show3 = false, show4 = false, showReset = false

let btnW = 40; // ボタン幅目安
let btnGap = 20; // ボタン間の間隔
let startX = 10;

function setup() {
  createCanvas(600, 500);
  angleMode(DEGREES);

  let button1 = createButton('Key -1');
  button1.position(startX, 10);
  button1.mousePressed(() => {
    targetAngle += 30;
  });
  
  let button2 = createButton('Key +1');
  button2.position(startX + btnW + btnGap, 10);
  button2.mousePressed(() => {
    targetAngle -= 30;
  });

  createButton('Major').position(10, 40).mousePressed(() => {
    show1 = true;
    show2 = false;
    show3 = false;
    show4 = false;
    showReset = false;
  });

  createButton('Natural Minor').position(65, 40).mousePressed(() => {
    show1 = false;
    show2 = true;
    show3 = false;
    show4 = false;
    showReset = false;
  });
  
  createButton('Harmonic Minor').position(167, 40).mousePressed(() => {
    show1 = false;
    show2 = false;
    show3 = true;
    show4 = false;
    showReset = false;
  });
  
  createButton('Melodic Minor').position(283, 40).mousePressed(() => {
    show1 = false;
    show2 = false;
    show3 = false;
    show4 = true;
    showReset = false;
  });

  createButton('Reset').position(10, 70).mousePressed(() => {
    show1 = false;
    show2 = false;
    show3 = false;
    show4 = false;
    showReset = true;
  });
}

function draw() {
  background(0);

  translate(width/2, height/2);

  let diff = targetAngle - angle;
  angle += diff * easing;
  rotate(angle);

  for (let i = 0; i < numCircles; i++) {
    let theta = i * 360 / numCircles;
    let x = cos(theta) * radius;
    let y = sin(theta) * radius;

    // ---- MIDI音名描画（常に白字） ----
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(15);
    push();
    translate(x, y);
    rotate(-angle);
    text(notes[i], 0, 0);
    pop();
  }

  // -- 動かない外側の縁の円 --
  push();
  resetMatrix();
  translate(width/2, height/2);
  noFill();
  stroke(0, 85, 255);
  strokeWeight(4);
  for (let i = 0; i < numCircles; i++) {
    rotate(30);
    ellipse(0, -120, 55, 55);
  }
  pop();
  
  if (show1) {
    push();
    resetMatrix();
    translate(width/2, height/2);
    fill(0, 85, 255);
    noStroke();
    rotate(30);
    ellipse(0, -120, 55, 55);
    rotate(60);
    ellipse(0, -120, 55, 55);
    rotate(90);
    ellipse(0, -120, 55, 55);
    rotate(60);
    ellipse(0, -120, 55, 55);
    rotate(60);
    ellipse(0, -120, 55, 55);
    pop();
  }
  
  if (show2) {
    push();
    resetMatrix();
    translate(width/2, height/2);
    fill(0, 85, 255);
    noStroke();
    rotate(30);
    ellipse(0, -120, 55, 55);
    rotate(90);
    ellipse(0, -120, 55, 55);
    rotate(60);
    ellipse(0, -120, 55, 55);
    rotate(90);
    ellipse(0, -120, 55, 55);
    rotate(60);
    ellipse(0, -120, 55, 55);
    pop();
  }
  
  if (show3) {
    push();
    resetMatrix();
    translate(width/2, height/2);
    fill(0, 85, 255);
    noStroke();
    rotate(30);
    ellipse(0, -120, 55, 55);
    rotate(90);
    ellipse(0, -120, 55, 55);
    rotate(60);
    ellipse(0, -120, 55, 55);
    rotate(90);
    ellipse(0, -120, 55, 55);
    rotate(30);
    ellipse(0, -120, 55, 55);
    pop();
  }
  
  if (show4) {
    push();
    resetMatrix();
    translate(width/2, height/2);
    fill(0, 85, 255);
    noStroke();
    rotate(30);
    ellipse(0, -120, 55, 55);
    rotate(90);
    ellipse(0, -120, 55, 55);
    rotate(60);
    ellipse(0, -120, 55, 55);
    rotate(60);
    ellipse(0, -120, 55, 55);
    rotate(60);
    ellipse(0, -120, 55, 55);
    pop();
  }
}