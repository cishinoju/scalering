let angle = 0;
let targetAngle = 0;
let easing = 0.1;
let numCircles = 12;
let radius = 120;

let notes = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];

let show1 = false, show2 = false, show3 = false, show4 = false, showReset = false

let btnW = 120;      // ボタン幅
let btnH = 15;       // ボタン高さ
let btnGap = 5;    // ボタン間のギャップ
let startX = 10;
let startY = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  
  push();
  createButton('Key -1').position(startX, startY).style('width', '120px').style('height', '15px').style('font-size', '10px').style('color', 'blue').mousePressed(() => {
    targetAngle += 30;
  });
  createButton('Major').position(startX, startY + btnH + btnGap).style('width', '120px').style('height', '15px').style('font-size', '10px').mousePressed(() => {
    show1 = true;
    show2 = false;
    show3 = false;
    show4 = false;
    showReset = false;
  });
  createButton('Harmonic Minor').position(startX, startY + 2 * (btnH + btnGap)).style('width', '120px').style('height', '15px').style('font-size', '10px').mousePressed(() => {
    show1 = false;
    show2 = false;
    show3 = true;
    show4 = false;
    showReset = false;
  });
  createButton('Reset').position(startX, startY + 3 * (btnH + btnGap)).style('width', '120px').style('height', '15px').style('font-size', '10px').style('color', 'green').mousePressed(() => {
    show1 = false;
    show2 = false;
    show3 = false;
    show4 = false;
    showReset = true;
  });
  pop();
  
  push();
  createButton('Key +1').position(startX + btnW + btnGap, startY).style('width', '120px').style('height', '15px').style('font-size', '10px').style('color', 'red').mousePressed(() => {
    targetAngle -= 30;
  });
  createButton('Natural Minor').position(startX + btnW + btnGap, startY + btnH + btnGap).style('width', '120px').style('height', '15px').style('font-size', '10px').mousePressed(() => {
    show1 = false;
    show2 = true;
    show3 = false;
    show4 = false;
    showReset = false;
  });
  createButton('Melodic Minor').position(startX + btnW + btnGap, startY + 2 * (btnH + btnGap)).style('width', '120px').style('height', '15px').style('font-size', '10px').mousePressed(() => {
    show1 = false;
    show2 = false;
    show3 = false;
    show4 = true;
    showReset = false;
  });
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  translate(windowWidth/2, windowHeight/2);

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

  // -- 外側の縁だけの青い円（動かない） --
  push();
  resetMatrix();
  translate(windowWidth/2, windowHeight/2);
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
    translate(windowWidth/2, windowHeight/2);
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
    translate(windowWidth/2, windowHeight/2);
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
    translate(windowWidth/2, windowHeight/2);
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
    translate(windowWidth/2, windowHeight/2);
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
