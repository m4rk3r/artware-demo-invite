/* quake.js +++ resize window and shake */

$(function (){
    $('html,body').css({'overflow':'hidden'})
    var div = 2;
    moveTo(0,0)
    resizeTo(screen.width,screen.height)
    
    var width = screen.width/div;
    var height = screen.height/div;
    
    resizeTo(width,height);
    moveTo(width - width/div,height - height/div);
    
    // quake
    var duration = 300;
    var time = 0;
    var centx = width - width/div, 
        centy = height - height/div;
    var anim = setInterval(function (){
        var sign = Math.round(Math.random()) ? -1 : 1;
        var randx = Math.round(Math.random()*30);
        var randy = Math.round(Math.random()*30);

        moveTo(centx,centy);
        moveTo(window.screenX + randx * sign, window.screenY + randy * sign);
        time += 1
        if(time>duration) clearInterval(anim)
    },30)
    
})