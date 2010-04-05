
var tmppath = String(window.location).split('/')
var path = tmppath.slice(0,tmppath.length -2).join('/')+'/lib/sounds/'

$(function (){
    var width = 1024;
    var height = 768;
    var scroll_height = 150;

    resizeTo(width,height)
    var toolbar_height;
    if(window.outerHeight > window.innerHeight){
        toolbar_height = window.outerHeight - window.innerHeight;
    }else{
        toolbar_height = 0;
    }
    var centx = screen.width/2 - width/2; 
    var centy = screen.height/2 - height/2 - scroll_height/2;
    moveTo(centx,centy);    
    
})

var sounds = {
    'grate': 'game/35714_HardPCM_Chip132.wav',
    'grate2':'game/35715_HardPCM_Chip133.wav',
    'blip' : 'g8b/Blip 001.wav',
    'blip3' :'g8b/Blip 003.wav',
    'blip9' :'g8b/Blip 009.wav',
    'kick2': 'g8b/Kick 003.wav',
    'clap': 'dr110/LC1-DR110-Clap-AC.wav'
}

var num_of_sounds = function (){ var x = 0; for(i in sounds) x++; return x}
num_of_sounds = num_of_sounds()

var preloaded = 0;
for(i in sounds){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', path + sounds[i]);
    
    // audioElement.addEventListener("progress", function(e) { 
    //     //console.log('# '+preloaded+' '+e.loaded+' of '+e.total)
    //     if(e.loaded == e.total){
    //         if (++preloaded == num_of_sounds) {
    //         //console.log('LOADED')
    //          ready = true;
    //          run();
    //         }else{
    //           //console.log('loaded '+preloaded+' of '+num_of_sounds)
    //         // console.log(e.loaded+' of '+e.total)
    //         }
    //     }
    //  },false);     
    audioElement.load();
    sounds[i] = audioElement;

}





var sequence = {
    tracker:[
     {
         'measures': 4,
         'beats': 8,
         'insturments':{
             'kick2': [1,0,1,0,1,0,1,0],
             'clap' : [0,1,1,0,1,0,1,0],
             'grate': [0,1,0,1,1,0,1,0],
             'blip3': [1,1,0,1,1,0,1,0],
         }
     },
     {
         'measures': 4,
         'beats': 8,
         'insturments':{
             'kick2': [1,0,1,0,1,0,1,0],
             'blip9': [0,1,1,0,1,0,1,0],
             'blip': [0,1,0,1,1,0,1,0],
             'blip3': [1,1,0,1,1,0,1,0],
         }
     },
     {
         'measures': 4,
         'beats': 8,
         'insturments':{
             'kick2': [1,0,1,0,1,0,1,0],
             'clap' : [0,1,1,0,1,0,1,0],
             'grate2': [0,1,0,1,1,0,1,0],
             'blip3': [1,1,0,1,1,0,1,0],
         }
     },
    ],

    i : 0,
    count : 1,
    measures : function (){ return this.tracker[this.i].measures},
    tick : function (){
        if(this.count > this.measures()) this.advance();
        this.count += 1;
    },
    advance : function (){
        this.count = 1;
        this.i = (this.i+1) % this.tracker.length;
    },
    current : function (insturment,pos){
        return this.tracker[this.i].insturments[insturment][pos];
    },
    insturments : function (){
        return this.tracker[this.i].insturments;
    },
    beats : function (){
        return this.tracker[this.i].beats;
    }
}



var pos = 0;
var measure = 0;
var count = 0;
var BPM = 300;
var ticks = 1;

var volume = {
    'clap' : 1,
    'blip' : 0.3,
    'grate2' : 0.8,
    'grate' : 0.8,
}


$(function (){
    var pos = 0;
    var measure = 0;
    var count = 0;

    for(vol in volume){
        sounds[vol].volume = volume[vol];
    }

    setInterval(function (){
    	if(pos==0) sequence.tick();  
    	for(insturment in sequence.insturments()){
    	    if(sequence.current(insturment,pos)) sounds[insturment].play();
    	}
    	pos = (pos + 1) % sequence.beats();
    },(1000 / (BPM / 60 * ticks)));

})

