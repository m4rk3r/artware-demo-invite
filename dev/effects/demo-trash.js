/*
    wuuut? WHEREUAT artawrez CrewZ?
    --------------------------------------------
    SHOUTOUT TO STEVE WITTENS (http://acko.net/)
*/
function randorder(){
    return (Math.round(Math.random())-0.5); 
}

// $(function (){
//     function checkReady(){
//     alert('checking')
//     if(ready){
//         run()
//     }
//     setTimeout(checkReady,1000);
//     }
// })


$(function (){
	var tmppath = String(window.location).split('/')
	    var path = tmppath.slice(0,tmppath.length -2).join('/')
    
	    var options = {
	    images: [
		     path + '/lib/img/Explode-04-june.gif',
		     path + '/lib/img/01_32_T_animado.gif',
		     path + '/lib/img/bc_cd1.gif',
		     path + '/lib/img/MO_2_animado.gif',
		     path + '/lib/img/s0401-media.gif',
             path + '/lib/img/transdisk_t_animado.gif'
		     ],
	    particles: 20,
	    imageWidth: 0.300 * 2,
	    imageHeight: 0.300 * 2
	};

	// Animation variables.
	var vars = $.extend($('<div>')[0], {
		cameraX: 3,
		cameraY: 3,
		cameraZ: 3,
      
		// More properties are added dynamically in init().

		//// These are needed to make $(vars).animate(...) work.
		customAnimate: true,
		updated: true
	    });

	var ctx;
	var image_choice = new Array();

	// Hack the jQuery step function to allow animating object properties directly.
	var $_fx_step_default = $.fx.step._default;
	$.fx.step._default = function (fx) {
	    if (!fx.elem.customAnimate) return $_fx_step_default(fx);
	    fx.elem[fx.prop] = fx.now;
	    fx.elem.updated = true;
	};
    
	// Move the camera to a new position (animated).
	function moveCamera() {
	    if(Math.round(Math.random()*5)==5)moveSprites()
						  var cx = Math.random() * 2 - 1,
						  cy = Math.random() * 2 - 1,
						  cz = Math.random() * 2 - 1,
						  cl = 2 / Math.sqrt(cx * cx + cy * cy + cz * cz);

	    $(vars).animate({ cameraX: cx * cl }, { duration: 1000, queue: false });
	    $(vars).animate({ cameraY: cy * cl }, { duration: 2000, queue: false });
	    $(vars).animate({ cameraZ: cz * cl }, { duration: Math.round(Math.random()*2000)+1000, queue: false,complete:moveCamera });
	}

	var ani = 0;
	function moveSprites() {
	    for (var i = 0; i < 10; ++i) {
		var sprites = ani++ % options.particles;
		var params = {};
		params['sprite'+ sprites +'x'] = Math.random() * 2 - 1;
		params['sprite'+ sprites +'y'] = Math.random() * 2 - 1;
		params['sprite'+ sprites +'z'] = Math.random() * 2 - 1;

		$(vars).animate(params, { duration: 500 + Math.random() * 1500, queue: false });
	    }
	}

	// Initialize the scene.
	var init = function() {
	    ctx = $('#canvas')[0].getContext("2d");
	    ctx.translate($('#canvas').width()/2, $('#canvas').height()/2);
	    ctx.scale(150, 150);

	    // Load images.
	    var preloaded = 0;
	    $.each(options.images, function(i) {
		    options.images[i] = new Image();
		    options.images[i].onload = function () {
			if (++preloaded == options.images.length) {
			    continueInit();
			}
		    };
		    options.images[i].src = this;
		});
      
	    // Continue init() after images have preloaded.
	    function continueInit() {
		// Spawn particles.
		for (var i = 0; i < options.particles; ++i) {
		    vars['sprite'+ i +'x'] = Math.random() * 2 - 1;
		    vars['sprite'+ i +'y'] = Math.random() * 2 - 1;
		    vars['sprite'+ i +'z'] = Math.random() * 2 - 1;
		}
        
		for(kk=0; kk<options.particles; kk++){
		    // if(Math.round(Math.random()) == 1){
		    // image_choice[kk]=0;
		    // }else{
		    image_choice[kk] = Math.round(Math.random()*(options.images.length - 1))                
			//            }
			}
      
		// Begin drawing loop.
		setInterval(function(){
			if (!vars.updated) return;
			vars.updated = false;

			draw(options);
		    }, 30);
      
		moveCamera();
		setTimeout(moveSprites, 2000);
	    }
	};
    
	// Draw a single frame.
	var draw = function(options) {
	    if(Math.round(Math.random())==1){
		$("#canvas").css({'background-color':'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')'})
	    }
      
	    //ctx.clearRect(-1.333, -1, 2.666, 2);
      
	    // Calculate euler angles.
	    var ry = Math.atan2(vars.cameraX, vars.cameraZ),
	    rx = Math.atan2(vars.cameraY, Math.sqrt(vars.cameraZ * vars.cameraZ + vars.cameraX * vars.cameraX)),
	    cy = Math.cos(ry),
	    sy = Math.sin(ry),
	    cx = Math.cos(rx),
	    sx = Math.sin(rx);
      
	    var transformed = [];

	    // Transform particles
	    for (var i = 0; i < options.particles; ++i) {
		var x1 = vars['sprite'+ i +'x'] + vars.cameraX,
		    y1 = vars['sprite'+ i +'y'] + vars.cameraY,
		    z1 = vars['sprite'+ i +'z'] + vars.cameraZ,
           
		    x2 = x1*cy - z1*sy,
		    y2 = y1,
		    z2 = x1*sy + z1*cy,
           
		    x3 = x2,
		    y3 = y2*cx - z2*sx,
		    z3 = y2*sx + z2*cx;
        
		if (z3 > .01) {
		    z3 = 1 / z3;
          
		    var x = x3 * z3,
			y = y3 * z3,
			w = options.imageWidth * z3,
			h = options.imageHeight * z3;
         
		    transformed.push([z3, x - w/2, y - h/2, w, h, i]);
		}
	    }
      
	    // Depth sort particles
	    transformed.sort(function (a, b) {
		    return a[0] < b[0] ? -1 : (a[0] > b[0]) ? 1 : 0;
		});
      
	    for (i in transformed) {
		// ctx.drawImage(options.images[transformed[i][5] % options.images.length], transformed[i][1], transformed[i][2], transformed[i][3], transformed[i][4]);
		ctx.drawImage(options.images[image_choice[i]], transformed[i][1], transformed[i][2], transformed[i][3], transformed[i][4]);
	    }
      
	};

	init();

    })