                                                                  
$(function (){

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var canvasData = ctx.createImageData(canvas.width, canvas.height);


        for (var x = 0; x < canvasData.width; x++) {
            for (var y = 0; y < canvasData.height; y++) {

                // Index of the pixel in the array
                var idx = (x + y * canvas.width) * 4;

                // Update the values of the pixel;
                canvasData.data[idx + 0] = Math.random()*255;
                canvasData.data[idx + 1] = Math.random()*255;
                canvasData.data[idx + 2] = Math.random()*255;
                canvasData.data[idx + 3] = 255;
            }
        }

        ctx.putImageData(canvasData, 0, 0);

})