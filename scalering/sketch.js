let angle = 0;
let targetAngle = 0;
let easing = 0.1;
let numCircles = 12;
let radius = 120;
let radius2 = 90;

let notes = ["D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B", "C", "C#/Db", "D"];

let show1 = false, show2 = false, show3 = false, show4 = false, showReset = false

let btnW = 100;      // ボタン幅
let btnH = 15;       // ボタン高さ
let btnGap = 5;    // ボタン間隔
let startX = 10;
let startY = 10;

let titlesMajor = [
  "C Major", "Db Major", "D Major", "Eb Major", "E Major", "F Major", "F#/Gb Major", "G Major", "Ab Major", "A Major",　"Bb Major", "B Major"
];

let titlesNaturalMinor = [
  "C Natural Minor", "C# Natural Minor", "D Natural Minor", "D#/Eb Natural Minor", "E Natural Minor", "F Natural Minor", "F# Natural Minor", "G Natural Minor", "G# Natural Minor", "A Natural Minor",　"Bb Natural Minor", "B Natural Minor"
];

let titlesHarmonicMinor = [
  "C Harmonic Minor", "C# Harmonic Minor", "D Harmonic Minor", "D#/Eb Harmonic Minor", "E Harmonic Minor", "F Harmonic Minor", "F# Harmonic Minor", "G Harmonic Minor", "G# Harmonic Minor", "A Harmonic Minor",　"Bb Harmonic Minor", "B Harmonic Minor"
];

let titlesMelodicMinor = [
  "C Melodic Minor", "C# Melodic Minor", "D Melodic Minor", "D#/Eb Melodic Minor", "E Melodic Minor", "F Melodic Minor", "F# Melodic Minor", "G Melodic Minor", "G# Melodic Minor", "A Melodic Minor",　"Bb Melodic Minor", "B Melodic Minor"
];



function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
  push();
  
  let buttonWidth = 2 * windowWidth / 5;
  let buttonHeight = windowHeight / 20;
  let buttonTextSize = 2 * buttonWidth / 50;
  
  createButton('Key -1').position(startX, startY).style('width', (buttonWidth) + 'px').style('height', (buttonHeight) + 'px').style('font-size', (buttonTextSize) + 'px').style('color', 'blue').mousePressed(() => {
    targetAngle += 30;
  });
  
  createButton('Major').position(startX, startY + buttonHeight + btnGap).style('width', (buttonWidth) + 'px').style('height', (buttonHeight) + 'px').style('font-size', (buttonTextSize) + 'px').mousePressed(() => {
    show1 = true;
    show2 = false;
    show3 = false;
    show4 = false;
    showReset = false;
  });
  
  createButton('Harmonic Minor').position(startX, startY + 2 * (buttonHeight + btnGap)).style('width', (buttonWidth) + 'px').style('height', (buttonHeight) + 'px').style('font-size', (buttonTextSize) + 'px').mousePressed(() => {
    show1 = false;
    show2 = false;
    show3 = true;
    show4 = false;
    showReset = false;
  });
  
  createButton('Reset').position(startX, startY + 3 * (buttonHeight + btnGap)).style('width', (buttonWidth) + 'px').style('height', (buttonHeight) + 'px').style('font-size', (buttonTextSize) + 'px').style('color', 'green').mousePressed(() => {
    show1 = false;
    show2 = false;
    show3 = false;
    show4 = false;
    showReset = true;
  });
  
  pop();
  
  push();
  
  createButton('Key +1').position(startX + buttonWidth + btnGap, startY).style('width', (buttonWidth) + 'px').style('height', (buttonHeight) + 'px').style('font-size', (buttonTextSize) + 'px').style('color', 'red').mousePressed(() => {
    targetAngle -= 30;
  });
  
  createButton('Natural Minor').position(startX + buttonWidth + btnGap, startY + buttonHeight + btnGap).style('width', (buttonWidth) + 'px').style('height', (buttonHeight) + 'px').style('font-size', (buttonTextSize) + 'px').mousePressed(() => {
    show1 = false;
    show2 = true;
    show3 = false;
    show4 = false;
    showReset = false;
  });
  
  createButton('Melodic Minor').position(startX + buttonWidth + btnGap, startY + 2 * (buttonHeight + btnGap)).style('width', (buttonWidth) + 'px').style('height', (buttonHeight) + 'px').style('font-size', (buttonTextSize) + 'px').mousePressed(() => {
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

  // -- MIDI音名 --
  
  push();
  
  angleMode(DEGREES);
  
  for (let i = 0; i < numCircles; i++) {
    let theta = i * 360 / numCircles;
    let x = cos(theta) * radius;
    let y = sin(theta) * radius;
    
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
  
  pop();
  
  // -- 白鍵 --
  
  push();
  
  fill(255);
  noStroke();
  ellipse(0, 0, 180, 180);
  
  pop();
  
  // -- 白鍵の境界線 --
  
  push();
  
  angleMode(RADIANS);
  
  let angles = [PI / 4, PI / 4, PI / 3, PI / 3, PI / 4, PI /4, PI /3]; //    各間隔
  let thetaSum = 0;
  
  stroke(0);
  
  for (let i = 0; i < angles.length; i++) {
    let rad = thetaSum;
    let x = cos(rad) * radius2;
    let y = sin(rad) * radius2;
    line(0, 0, x, y);

    thetaSum += angles[i];
    
    push();
    translate(x, y);
    rotate(-angle);
    pop();
}
  
  pop();
  
  // -- 黒鍵 --
  
  push();
  angleMode(RADIANS);
  fill(0);
  
  let cx = 0;
  let cy = 0;
  let outerR = 90;  // 外半径
  let innerR = 50;   // 内半径
  let theta0 = 0;        // 開始角
  let theta1 = PI /12;   // 終了角（30°）
  let theta2 = PI / 6;
  
  beginShape();
  
  // --- 外弧 ---
  　for (let i = theta0; i <= theta1; i += 0.01) {
    vertex(cx + cos(i)*outerR, cy + sin(i)*outerR);
  　}
  
  　// --- 切り口1本目（終了角の放射線で内環へ）---
  　for(let i = theta1; i >= theta0; i -= 0.01){
    vertex(cx + cos(i)*innerR, cy + sin(i)*innerR);
  　}
  
  // --- 切り口2本目（開始角の放射線で外環へ閉じる）---
  endShape(CLOSE);

  // 2つ目のバウムクーヘン片（角度をオフセット）
　　let offset1 = 5 * PI / 12; // 75°
    let offset2 = PI / 3; // 60°
    let offset3 = PI / 2; // 90°
  
　beginShape();
　　for (let i = theta0; i <= theta2; i += 0.01) {
  　vertex(cx + cos(i + offset1)*outerR, cy + sin(i + offset1)*outerR);
　　}
　　for (let i = theta2; i >= theta0; i -= 0.01) {
  　vertex(cx + cos(i + offset1)*innerR, cy + sin(i + offset1)*innerR);
　　}
　endShape(CLOSE);
  
  beginShape();
　　for (let i = theta0; i <= theta2; i += 0.01) {
  　vertex(cx + cos(i + offset1 + offset2)*outerR, cy + sin(i + offset1 + offset2)*outerR);
　　}
　　for (let i = theta2; i >= theta0; i -= 0.01) {
  　vertex(cx + cos(i + offset1 + offset2)*innerR, cy + sin(i + offset1 + offset2)*innerR);
　　}
　endShape(CLOSE);

  beginShape();
　　for (let i = theta0; i <= theta2; i += 0.01) {
  　vertex(cx + cos(i + offset1 + 2 * offset2)*outerR, cy + sin(i + offset1 + 2 * offset2)*outerR);
　　}
　　for (let i = theta2; i >= theta0; i -= 0.01) {
  　vertex(cx + cos(i + offset1 + 2 * offset2)*innerR, cy + sin(i + offset1 + 2 * offset2)*innerR);
　　}
　endShape(CLOSE);

  beginShape();
　　for (let i = theta0; i <= theta2; i += 0.01) {
  　vertex(cx + cos(i + offset1 + 2 * offset2 + offset3)*outerR, cy + sin(i + offset1 + 2 * offset2 + offset3)*outerR);
　　}
　　for (let i = theta2; i >= theta0; i -= 0.01) {
  　vertex(cx + cos(i + offset1 + 2 * offset2 + offset3)*innerR, cy + sin(i + offset1 + 2 * offset2 + offset3)*innerR);
　　}
　endShape(CLOSE);
  
  beginShape();
　　for (let i = theta0; i <= theta2; i += 0.01) {
  　vertex(cx + cos(i + offset1 + 3 * offset2 + offset3)*outerR, cy + sin(i + offset1 + 3 * offset2 + offset3)*outerR);
　　}
　　for (let i = theta2; i >= theta0; i -= 0.01) {
  　vertex(cx + cos(i + offset1 + 3 * offset2 + offset3)*innerR, cy + sin(i + offset1 + 3 * offset2 + offset3)*innerR);
　　}
　endShape(CLOSE);
  
  pop();


  // -- 外側の縁だけの青い円（動かない） --
  
  push();
  
  angleMode(DEGREES);
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
  
  // -- 白鍵の縁 --
  
  push();
  
  noFill();
  stroke(0, 85, 255);
  strokeWeight(4);
  ellipse(0, 0, 180, 180);
  
  pop();
  
  // ---- 個別のスケール ----
  
  push();
  
  angleMode(DEGREES);
  
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
    
     // タイトルインデックス（0-11）を角度から計算
    let normalized = ((-Math.round(angle / 30)) % 12 + 12) % 12;
    let titleText = titlesMajor[normalized];

    // 中心にタイトルを描画
    rotate(60);
    fill(0);
    stroke(255);
    strokeWeight(2);
    textAlign(CENTER, CENTER);
    textSize(28);
    text(titleText, 0, 0);
    
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
    
     // タイトルインデックス（0-11）を角度から計算
    let normalized = ((-Math.round(angle / 30)) % 12 + 12) % 12;
    let titleText = titlesNaturalMinor[normalized];

    // 中心にタイトルを描画
    rotate(30);
    fill(0);
    stroke(255);
    strokeWeight(2);
    textAlign(CENTER, CENTER);
    textSize(18);
    text(titleText, 0, 0);
    
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
    
     // タイトルインデックス（0-11）を角度から計算
    let normalized = ((-Math.round(angle / 30)) % 12 + 12) % 12;
    let titleText = titlesHarmonicMinor[normalized];

    // 中心にタイトルを描画
    rotate(60);
    fill(0);
    stroke(255);
    strokeWeight(2);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(titleText, 0, 0);
    
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
    
    // タイトルインデックス（0-11）を角度から計算
    let normalized = ((-Math.round(angle / 30)) % 12 + 12) % 12;
    let titleText = titlesMelodicMinor[normalized];

    // 中心にタイトルを描画
    rotate(60);
    fill(0);
    stroke(255);
    strokeWeight(2);
    textAlign(CENTER, CENTER);
    textSize(17);
    text(titleText, 0, 0);
    
    pop();
  }
  
  pop();
  
}