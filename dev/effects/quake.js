/* quake.js +++ resize window and shake */

$(function (){
    $('html,body').css({'overflow':'hidden'})
    var div = 2;
    //moveTo(0,0)
    
    
    var width = 1024;
    var height = 768;

    resizeTo(width,height)
    var toolbar_height;
    if(window.outerHeight > window.innerHeight){
        toolbar_height = window.outerHeight - window.innerHeight;
    }else{
        toolbar_height = 0;
    }

    
    // quake
    var duration = 1000;
    var time = 0;
    var centx = screen.width/2 - width/2; 
    var centy = screen.height/2 - height/2 ;
    moveTo(centx,centy);
    
    function dt(){ return (new Date().getTime())/1000 }
    var last = (new Date().getTime())/1000;
    var quake = Math.round(Math.random()*20);
    
    var anim = setInterval(function (){
        var sign = Math.round(Math.random()) ? -1 : 1;
        var randx = Math.round(Math.random()*quake);
        var randy = Math.round(Math.random()*quake);
        
        if(dt() - last > 10){
            quake = Math.round(Math.random()*20)
        }

        moveTo(centx,centy);
        moveTo(window.screenX + randx * sign, window.screenY + randy * sign);
        time += 1
        if(time>duration) clearInterval(anim)
    },50) // was 30
    
})