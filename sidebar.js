function Sidebar() {
  this.x = 0;
  this.y = 0;
  this.w = 280; // width
  this.colors = [];
  this.colNum = 14; 
  this.colSize = this.w / this.colNum; 
  this.sliders = []; 
  this.slidSize = 40;
  this.buttons = [];
  this.buttSize = 40;
  this.buttWidth = this.w / 2;
  this.brushes = [];
  this.counter = 0;
  
  this.gridRows = 3; // how many rows
  this.gridCols = 7; // how many brush "boxes" in a row 
  this.gridSize = this.w / this.gridCols; // how big are the boxes
  
  // create 2D array for brushes
  for (var i = 0; i < this.gridRows; i++) {
    this.brushes[i] = [];
  }
  // create color bar
  for(var i = 0; i < this.colNum; i++){
    this.colors[i] = new Color(this.colSize, i, i*this.colSize, i * 360/this.colNum);
  }
  this.activeColor = this.colors[0]; // choose red as an default 
  // create sliders
  this.sliders[0] = new Slider(this.y + this.colSize + this.slidSize/2, 140, 0, 100); // lightness
  this.sliders[1] = new Slider(this.y + this.colSize + this.slidSize/2 + this.slidSize, 140, 10, 90); // size
  this.sliders[2] = new Slider(this.y + this.colSize + this.slidSize/2 + 2 * this.slidSize, 35, 1, 5); // proportion
  this.sliders[3] = new Slider(this.y + this.colSize + this.slidSize/2 + 3 * this.slidSize, 35,  0, PI); // angle
  // create buttons
  this.buttons[0] = new Button(this.x, this.y + this.colSize + 4 * this.slidSize, "UNDO");
  this.buttons[1] = new Button(this.x + this.buttWidth, this.y + this.colSize + 4 * this.slidSize, "REDO");
  this.buttons[2] = new Button(this.x, this.y + this.y + this.colSize + 4 * this.slidSize + this.buttSize, "SAVE");
  this.buttons[3] = new Button(this.x + this.buttWidth, this.y + this.colSize + 4 * this.slidSize + this.buttSize, "CLEAR");
  
  this.run = function() {
    // BORDERS AROUND SIDEBAR
    line(this.x, this.y, this.x, back.h);
    line(this.w, this.y, this.w, back.h);
    this.colors.forEach(function(i){i.show()});
    this.sliders.forEach(function(i){i.run()});
    this.buttons.forEach(function(i){i.show()});
    this.colorsBorder(); // make a border of the active color thicker
    this.slidersVisuals(); // show slider visuals
    this.brushesGrid(); // show a grid of saved brushes
  }
  this.colorsBorder = function() {
    for(var i = 0; i < this.colors.length; i++){
      if (i == this.activeColor.posInArray) {
        this.colors[i].border = 2;
      } else {
        this.colors[i].border = 1;
      }
    }
  }
  this.slidersVisuals = function(){
  push();
  //  lightness
  fill(0);
  rect(sidebar.sliders[0].x+10,sidebar.sliders[0].y-5,10,10);
  fill(100);
  rect(sidebar.sliders[0].x+260,sidebar.sliders[0].y-5,10,10);
  //  size
  stroke(0);
  line(sidebar.sliders[1].x+10, sidebar.sliders[1].y, sidebar.sliders[1].x+20, sidebar.sliders[1].y);
  line(sidebar.sliders[1].x+260, sidebar.sliders[1].y, sidebar.sliders[1].x+270, sidebar.sliders[1].y);
  line(sidebar.sliders[1].x+265, sidebar.sliders[1].y-5, sidebar.sliders[1].x+265, sidebar.sliders[1].y+5);
  fill(0);
  //  proportion
  noStroke();
  rect(sidebar.sliders[2].x+260, sidebar.sliders[2].y, 10, 2);
  ellipse(sidebar.sliders[2].x+15, sidebar.sliders[2].y, 10, 10);
  //  angle
  noStroke();
  text("0\xB0",sidebar.sliders[3].x+10, sidebar.sliders[3].y+5);
  text("180\xB0",sidebar.sliders[3].x+252, sidebar.sliders[3].y+5);
  pop();
  }
  this.brushesGrid = function() {
    push();
    stroke(0);
    // empty grid
    for (var x = 0; x < this.gridCols; x++) {
      for (var y = 0; y < this.gridRows; y++) {
        // HOVER EFFECT
        if (mouseX >= x * this.gridSize 
        && mouseX <= x * this.gridSize + this.gridSize 
        && mouseY >= this.y + this.colSize + 4 * this.slidSize + 2 * this.buttSize + y * this.gridSize
        && mouseY <= this.y + this.colSize + 4 * this.slidSize + 2 * this.buttSize + y * this.gridSize + this.gridSize){
          fill(back.backColor-10);
        } else {
          fill(back.backColor);
        }
        rect(x * this.gridSize, 260 + y * this.gridSize, this.gridSize, this.gridSize);
      }
    }
    // display saved brushes 
    for (var i = 0; i < this.brushes.length; i++){
      for (var j = 0; j < this.brushes[i].length; j++){
        this.brushes[i][j].showMini(this.gridSize/2 + j * this.gridSize, 280 + i * this.gridSize);
      }
    }
    pop();
  }
  // save new brush and apply to it settings of the main brush
  this.createBrush = function() {
    var addOne = false; // used to add to the couter
    for (var i = 0; i < this.gridRows; i++) {
      if (i === 0) { // for the first row
        if (this.brushes[i].length < this.gridCols) { 
          this.brushes[i].push(new Brush()); // push and apply main brush's settings
          this.brushes[i][this.brushes[i].length-1].applySettings();
          return;
        }
      } else { // for the rest
        if(this.brushes[i - 1].length == this.gridCols && this.brushes[i].length < this.gridCols) {
          this.brushes[i].push(new Brush());
          this.brushes[i][this.brushes[i].length-1].applySettings();
          return;
        }
      }
      if (this.brushes[this.gridRows - 1].length == this.gridCols) { // when the grid is full
        if(this.counter >= this.gridCols * i && this.counter < this.gridCols * (i + 1)) { // gradually star filling the grid over again
          this.brushes[i].splice(this.counter - this.gridCols * i,new Brush());
          this.brushes[i][this.counter - this.gridCols * i].applySettings();
          addOne = true; // this stops the counter going wild
        }
      }
    }
    if (addOne) {
      if(this.counter == (this.gridCols * this.gridRows) - 1) { // if the grid id filled with the second batch of brushes
        this.counter = 0; // start refilling again
      } else {
        this.counter++;
      }
      addOne = false;
    }
  }
}


