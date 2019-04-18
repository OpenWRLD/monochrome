/* SLIDERS */
function Slider(_y, startPos, minVal, maxVal) {
  this.x = back.x; 
  this.y = _y;
  this.w = this.x + 280; // width
  this.minPos = this.x + 35; // beginning
  this.maxPos = this.w - 35; // end
  this.slider = startPos; // position of the sliding part of the slider
  this.minVal = minVal; // mainimal value
  this.maxVal = maxVal; // maximal value
  // UPDATE VALUES TO THE POSITION OF THE SLIDER
  this.slide = function(){
    this.val = map(this.slider, this.minPos, this.maxPos, this.minVal, this.maxVal);
    if(mouseIsPressed 
    && mouseX >= this.x  
    && mouseX <= this.w 
    && mouseY >= this.y-20 
    && mouseY <= this.y+20){
      this.slider = mouseX;
      this.slider = constrain(this.slider, this.minPos, this.maxPos);
    }
  }
  // updating sliders when one of the saved brushes is chosen
  this.update = function(what){
    this.slider = map(what, this.minVal, this.maxVal, this.minPos, this.maxPos);
  }
  this.show = function(){
    push();
    strokeWeight(1);
    stroke(0);
    line(this.minPos, this.y, this.maxPos, this.y);
    line(this.x, this.y+20, this.w, this.y+20);
    fill(back.backColor);
    rect(this.slider-5, this.y-10, 10, 20);
    pop();
  }
  this.run = function(){
    this.show();
    this.slide();
  }
}

/* COLORS */
function Color(_size, index, _x, _fill) {
  active = false;
  this.posInArray = index; 
  this.x = _x;
  this.y = back.y;
  this.inside = _fill; // hue
  this.size = _size;
  this.sat = 80; // saturation
  this.light = 50; // lightness
  this.border = 1; // border stroke weight
  this.show = function() {
    push();
    fill(this.inside,this.sat,this.light);
    strokeWeight(this.border);
    rect(this.x,this.y,this.size,this.size);
    pop();
  };
}

/* BUTTONS */
function Button(_x, _y, _text) {
  this.x = _x;
  this.y = _y;
  this.w = 140;
  this.h = 40;
  this.func = _text; // what's the button intended for
  this.inside = back.backColor; // fill
  this.show = function() {
    push();
    stroke(0);
    // HOVER EFFECT
    if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
      fill(this.inside - 10);
    } else {
      fill(this.inside);
    }
    rect(this.x,this.y,this.w,this.h);
    noStroke();
    fill(0);
    text(this.func, this.x + 50, this.y + 25);
    pop();
  };
}