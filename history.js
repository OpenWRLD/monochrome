// UNDO AND REDO FUNCTIONALITY IS INSPIRED BY THIS PROCESSING SKETCH :
/*https://www.openprocessing.org/sketch/131411*/

function History(howMany) {
  this.uSteps = 0; // amount of undo steps
  this.rSteps = 0; // amount of redo steps
  this.images = new Snapshot(howMany);
  
  this.snap = function() {
    this.uSteps = min(this.uSteps+1, this.images.amount-1); // how many steps can you possibly go back
    this.rSteps = 0; // no redo steps (since you made a new line there is nothing to redo)
    this.images.nextStep(); // go to next step
    this.images.capture(); // take a snapshot
  };
  this.undo = function() {
    if(this.uSteps > 0) {
      this.uSteps--; // subtract one undo step
      this.rSteps++; // add one redo step
      this.images.prevStep(); // go to the previous image
      this.images.show(); // show the previous image
    }
  };
  this.redo = function() {
    if(this.rSteps > 0) {
      this.uSteps++; // add one undo step
      this.rSteps--; // subtract one redo step
      this.images.nextStep(); // go to the next image
      this.images.show(); // show the next image
    }
  };
}

function Snapshot (amount) {
  this.currImg = 0; // index of currently displayed image
  this.amount = amount;
  this.imgs = [];
  this.w = width;
  this.h = height;
  // create array of images with a size of a drawing area and fill with white background
  for (var i = 0; i < amount; i++) {
    this.imgs[i] = createImage(this.w - back.leftW - back.rightW - 1, this.h - back.topH - back.bottomH - 1);
    this.imgs[i] = get(back.leftW + 1, back.topH + 1, this.w - back.leftW - back.rightW - 1, this.h - back.topH - back.bottomH - 1);
  }
  // change index of the current image to the next one
  this.nextStep = function() {
    this.currImg = (this.currImg + 1) % this.amount;
  };
  // change index of the current image to the previous
  this.prevStep = function() {
    this.currImg = (this.currImg - 1 + this.amount) % this.amount;
  };
  // make a screenshot of a drawing area and display it
  this.capture = function() {
    this.imgs[this.currImg] = get(back.leftW + 1, back.topH + 1, this.w - back.leftW - back.rightW - 1, this.h - back.topH - back.bottomH - 1);
    this.show();
  };
  // display the current image
  this.show = function() {
    image(this.imgs[this.currImg], back.leftW + 1, back.topH + 1);
  };
}

