


var drawImage = (
    function(source, x, y, context){
      context.drawImage(source, x, y);
      return context
    }
    );

var getImageData = (
    function(x, y, width, height, context){
      return context.getImageData(x, y, width, height);
    }
    );

export {
  drawImage ,
  getImageData ,
  
}
/* drawImage Not a pure module */
