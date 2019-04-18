function Back() {
  this.x = 0;
  this.y = 0;
  this.h = height;
  this.w = width;
  this.leftW = 310; // space btw the beginning of the canvas and the left side of the drawing area
  this.rightW = 190; // space btw the end of the canvas and the right side of the drawing area
  this.topH = 30; // space btw the top of the canvas and the top of the drawing area
  this.bottomH = 50; // space btw the bottom of the canvas and the bottom of the drawing area
  this.backColor = 75; // gray background 
  this.xbrush = this.w - 150; // x position of the brush preview
  this.ybrush = this.topH + 10; // y position of the brush preview
  this.brushSize = 100;
  this.ybutt = this.ybrush + this.brushSize + 20; // y position of the "SAVE BRUSH" button
  this.buttH = 40; // height of the "SAVE BRUSH" button
  this.show = function() {
    push();
    noStroke();
    // GRAY BACKGROUND
    fill(this.backColor);
    rect(this.x, this.y, this.leftW, this.h);
    rect(this.leftW, this.x, this.w-this.leftW, this.topH);
    rect(this.leftW, this.h - this.bottomH, this.w-this.leftW, this.bottomH);
    rect(this.w - this.rightW, this.topH, this.rightW, this.h);
    // FRAME AROUND THE DRAWING AREA
    stroke(0);
    noFill();
    rect(this.leftW, this.topH, this.w - this.leftW - this.rightW, this.h - this.bottomH - this.topH);
    sidebar.run(); // activate sidebar
    this.brushPrev(); // activate brush preview
    this.brushButton(); // activate "SAVE BRUSH" button
    pop();
  }
  this.brushPrev = function() {
    push();
    stroke(0);
    fill(100);
    rect(this.xbrush, this.ybrush, this.brushSize, this.brushSize);
    mainBrush.show(this.xbrush + this.brushSize/2, this.ybrush + this.brushSize/2);
    if(mainBrush.clight > 95){
      push();
      noFill;
      stroke(0);
      strokeWeight(1);
      ellipse(this.xbrush + this.brushSize/2, this.ybrush + this.brushSize/2, mainBrush.h, mainBrush.w);
      pop();
    }
    pop();
  }
  this.brushButton = function() {
    push();
    var textx = this.xbrush + 11;
    var texty = this.ybutt + 25;
    // HOVER EFFECT
    if(mouseX > this.xbrush 
    && mouseX < this.xbrush + this.brushSize 
    && mouseY > this.ybutt 
    && mouseY < this.ybutt + this.buttH){
      fill(this.backColor - 10);
    } else {
      fill(this.backColor);
    }
    rect(this.xbrush, this.ybutt, this.brushSize, this.buttH);
    noStroke();
    fill(0);
    text("SAVE BRUSH", textx, texty);
    pop();
  }
}

