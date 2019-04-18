function Brush() {
    this.csat = 80; // saturation
    this.chue = 0; // hue
    this.clight = 50; // lightness
    this.angle = 0;
    this.h = 50;
    this.w = 50;
    
  // WHEN CREATING NEW BRUSH APPLY SETTINGS FROM THE MAIN BRUSH TO THE NEW ONE
  this.applySettings = function() {
    this.chue = sidebar.activeColor.inside;
    this.clight = mainBrush.clight;
    this.angle = mainBrush.angle;
    this.h = mainBrush.h;
    this.w = mainBrush.w;
  }
  // WHEN CHOOSING ONE OF THE BRUSHES APPLY SETTING OF THIS BRUSH TO THE MAIN ONE AND UPDATE SLIDERS
  this.copySettings = function(i,j) {
    this.chue = sidebar.activeColor.inside;
    this.clight = sidebar.brushes[i][j].clight;
    this.angle = sidebar.brushes[i][j].angle;
    this.h = sidebar.brushes[i][j].h;
    this.w = sidebar.brushes[i][j].w;

    // update sliders values
    sidebar.sliders[0].update(this.clight);
    sidebar.sliders[1].update(this.w);
    sidebar.sliders[2].update(this.w / this.h);
    sidebar.sliders[3].update(this.angle);
  }
  // UPDATE MAIN BRUSH WITH SLIDER SETTINGS 
  this.update = function() {
    this.chue = sidebar.activeColor.inside;
    this.clight = sidebar.sliders[0].val;
    this.angle = sidebar.sliders[3].val;
    this.w = sidebar.sliders[1].val;
    this.h = sidebar.sliders[1].val/sidebar.sliders[2].val;
  }
  this.show = function(x, y) {
    push();
    fill(this.chue, this.csat, this.clight);
    noStroke();
    translate(x, y);
    rotate(this.angle);
    ellipse(0, 0, this.w, this.h);
    pop(); 
  }
  // DISPLAY MINI BRUSHES IN THE SIDEBAR
  this.showMini = function(x, y) {
    push();
    fill(sidebar.activeColor.inside, this.csat, this.clight);
    noStroke();
    translate(x, y);
    rotate(this.angle);
    ellipse(0, 0, this.w / 10 * 4, this.h / 10 * 4);
    pop(); 
  }
}

