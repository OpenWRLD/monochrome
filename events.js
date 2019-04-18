function drawing() {
  if(mouseIsPressed 
  && mouseX > back.leftW 
  && mouseX < back.w - back.rightW 
  && mouseY > back.topH 
  && mouseY < back.h - back.bottomH) {
    brushLine(mouseX, mouseY, pmouseX, pmouseY);
  }
}

// CODE I USED TO CREATE BRUSHLINE IS INSPIRED BY THIS POST: 
/* http://www.itgo.me/a/1865978057579204487/javascript-drawing-soft-brush */
function brushLine(x,y,px,py) {
 var dis = dist(x,y,px,py);
 if (dis > 0) {
    var step = sidebar.sliders[1].val/dis;
    var myx,myy,t = 0;
   for (var i = 0; i <= dis; i+= step/5) {
      t = max(i / dis);
      myx = mouseX + (pmouseX-mouseX) * t;
      myy = mouseY + (pmouseY-mouseY) * t;
      mainBrush.show(myx,myy);
    }
 } else {
    mainBrush.show(x,y);
 }
}

function mousePressed() {
  // undo button
   if(mouseX > sidebar.buttons[0].x
  && mouseX < sidebar.buttons[0].x + sidebar.buttons[0].w 
  && mouseY > sidebar.buttons[0].y
  && mouseY < sidebar.buttons[0].y + sidebar.buttons[0].h){
    hist.undo();
  }
  // save button
  if(mouseX > sidebar.buttons[2].x 
  && mouseX < sidebar.buttons[2].x + sidebar.buttons[2].w 
  && mouseY > sidebar.buttons[2].y
  && mouseY < sidebar.buttons[2].y + sidebar.buttons[2].h){
    hist.images.imgs[hist.images.currImg].save("myDrawing", "png");
  }
  // redo button
  if(mouseX > sidebar.buttons[1].x 
  && mouseX < sidebar.buttons[1].x + sidebar.buttons[1].w 
  && mouseY > sidebar.buttons[1].y
  && mouseY < sidebar.buttons[1].y + sidebar.buttons[1].h){
    hist.redo();
  }
  // clear button
  if(mouseX > sidebar.buttons[3].x 
  && mouseX < sidebar.buttons[3].x + sidebar.buttons[3].w 
  && mouseY > sidebar.buttons[3].y
  && mouseY < sidebar.buttons[3].y + sidebar.buttons[3].h){
    push();
    fill(100);
    rect(0,0,width,height);
    pop();
  }
  // color bar (search through array to change the active hue and update hue in the drawing and brushes accordingly)
  for(var i = 0; i < sidebar.colors.length; i++){
    if(mouseX >= sidebar.colors[i].x 
    && mouseX <= sidebar.colors[i].x + sidebar.colors[i].size 
    && mouseY >= sidebar.colors[i].y 
    && mouseY <= sidebar.colors[i].size){
      sidebar.activeColor = sidebar.colors[i];
      updateColors();
    }
  }
  // save brush button 
  if(mouseX > back.xbrush 
    && mouseX < back.xbrush + back.brushSize 
    && mouseY > back.ybutt 
    && mouseY < back.ybutt + back.buttH) {
      sidebar.createBrush();
  }
  for(var i = 0; i < sidebar.brushes.length; i++) {
    for(var j = 0; j < sidebar.brushes[i].length; j++) {
      if(mouseX >= j * sidebar.gridSize 
      && mouseX <= j * sidebar.gridSize + sidebar.gridSize 
      && mouseY >= sidebar.y + sidebar.colSize + 4 * sidebar.slidSize + 2 * sidebar.buttSize + i * sidebar.gridSize
      && mouseY <= sidebar.y + sidebar.colSize + 4 * sidebar.slidSize + 2 * sidebar.buttSize + i * sidebar.gridSize + sidebar.gridSize){
        if (keyIsPressed && keyCode == SHIFT) {
          sidebar.brushes[i].splice(j,1); // delete brush
          for (var k = sidebar.brushes.length - 1 - i; k > 0; k--) { // search backwards through rows
            if (sidebar.brushes[i + k].length > 0) { // if there are brushes in the next row push the first one back to the current row
              sidebar.brushes[i + (k - 1)].push(sidebar.brushes[i + k][0]); 
              sidebar.brushes[i + k].shift();  
            }
          }
        } else {
          mainBrush.copySettings(i,j); // select one of the previously saved brushes from the array
        }
      }
    }
  }
}

// take a snapshot of a current drawing space
function mouseReleased() {
  if(mouseX > back.leftW 
  && mouseX < back.w - back.rightW 
  && mouseY > back.topH 
  && mouseY < back.h - back.bottomH) {
    hist.snap();
  }
}