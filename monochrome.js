// UPDATE THE DRAWING AREA WITH A NEW HUE SELECTED FROM THE COLOR BAR

function updateColors() {
  
  hist.images.imgs[hist.images.currImg].loadPixels(); 
  var colHue = sidebar.activeColor.inside; // selected hue

  for(var x = 0; x < hist.images.imgs[hist.images.currImg].width; x++) {
    for(var y = 0; y < hist.images.imgs[hist.images.currImg].height; y++) {
      
      var index = (x + y * hist.images.imgs[hist.images.currImg].width) * 4;
      
      // access each pixel's color channel 
      var r = hist.images.imgs[hist.images.currImg].pixels[index]; 
      var g = hist.images.imgs[hist.images.currImg].pixels[index + 1]; 
      var b = hist.images.imgs[hist.images.currImg].pixels[index + 2]; 
      
      // if the pixel is not white 
      if (r < 255 && g < 255 && b < 255) {
        // if the pixel is not black 
        if (r > 0 && g > 0 && b > 0) {
          colorMode(RGB); // necessary to get the right values as pixels are always rgb
          var col = color(r,g,b);
          var colLight = lightness(col); // extract lightness value of the pixel
          colorMode(HSL);
          var finCol = color(colHue,80,colLight); // create a new color with the right hue
          // extract red, green and blue values
          r = red(finCol);
          g = green(finCol);
          b = blue(finCol);
        }
      }
      // replace color
      hist.images.imgs[hist.images.currImg].pixels[index] = r; 
      hist.images.imgs[hist.images.currImg].pixels[index+1] = g; 
      hist.images.imgs[hist.images.currImg].pixels[index+2] = b; 

    }
  }
  hist.images.imgs[hist.images.currImg].updatePixels();
  // show updated colors
  hist.images.show();
}