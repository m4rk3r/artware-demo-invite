var width = 800 //screen.width;
var height = 800 //screen.height;

// find smallest dimension for popup
testdim = get_smallest_possible()
var winw = testdim.x;
var winh = testdim.x;
var layer = 0;
if(testdim.y > testdim.x){
    // browser bar
    var discrepancy = testdim.y - testdim.x;
}
winw+=discrepancy;


function get_smallest_possible(){
    var dim = {}
    var w = window.open('','','width=0,height=0')
    dim.x = w.outerWidth; dim.y = w.outerHeight;
    w.close();
    return dim
}


// run it
$(function (){
   var params = 'height='+winh+',width='+winw+',scrollbars=0,resizable=0,toolbar=0,location=0,status=0';
   var windows = new Array();
   
   var origin = {
       'x':screen.width/2 - width/2,
       'y':screen.height/2 - height/2
   }
                    
   function spawn_absolute(x,y){
       params += ',left='+x+',top='+y;
       windows[layer].push(window.open('','',params))       
   }
   function spawn(x,y){
       params += ',left='+(origin.x +(winw * x))+',top='+(origin.y + ((winh+discrepancy) * y));
       windows[layer].push(window.open('','',params))
   }
    
   var cols = Math.ceil(height/(winh+discrepancy))
   var rows = Math.ceil(width/winw)

   
   windows[layer] = new Array();
    while(rows > 2 && cols > 2){
       for(y=0;y<cols;y++){
           for(x=0;x<rows;x++){
                spawn(x,y)
           }
       }
       rows -= 2;
       cols -= 2;
       origin.x += winw
       origin.y += winh + discrepancy
       layer += 1
      windows[layer] = new Array();
    }
    
    // add centroid
    var x = screen.width/2 - (winw/2);
    var y = screen.height/2 -(winh/2);
    spawn_absolute(x,y)

function newRGB(){
    var col = new Object;
    col.r = Math.round(Math.random()*255);
    col.g = Math.round(Math.random()*255);
    col.b = Math.round(Math.random()*255);
    return col;
}

    var col = newRGB();
   setInterval(function (){
       // for(i=0;i<rows*cols;i++){
       //     if(!windows[i].closed)
       //     windows[i].document.body.style.backgroundColor = 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')'
       // }
       if(col.r<0 && col.g <0 && col.b < 0){
           col = newRGB();
        }
        
       for(i=0; i < windows.length; i++){
           var layerrgb = 'rgb('+Math.round(col.r-=10)+','+Math.round(col.g-=10)+','+Math.round(col.b-=10)+')'
           for(w in windows[i]){
               windows[i][w].document.body.style.backgroundColor = layerrgb;
           }
       }
   },20);

})