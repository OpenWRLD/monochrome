function setup() {
  createCanvas(windowWidth,windowHeight);
  colorMode(HSL, 360, 100, 100, 1);
  textSize(12);
  background(100);
  back = new Back(); // create a frame around the drawing area
  sidebar = new Sidebar(); // create a user inerface sidebar
  hist = new History(5); // create history that allowas to undo up to 5 steps beck
  mainBrush = new Brush(); // brush used for drawing
}

// This doesn't wokr ;-( // WHY?
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  drawing(); // drawing brushstrokes within the drawing space
  back.show(); // display user interface
  mainBrush.update(); // connet settings from user interface to the main brush
}




















