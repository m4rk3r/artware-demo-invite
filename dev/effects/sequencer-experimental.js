
var tmppath = String(window.location).split('/')
var path = tmppath.slice(0,tmppath.length -2).join('/')


var sounds = {
    'bass': '/lib/sounds/tr606/LC2-606-Bassdrum.wav',
    'clap': '/lib/sounds/tr606/LC2-606-Snare-ACC.wav',
    'cymb': '/lib/sounds/tr606/LC2-606-HiHatCL-ACC.wav',
    'blip': '/lib/sounds/game/33230_HardPCM_Chip090.wav',
    'klip': '/lib/sounds/game/34228_HardPCM_Chip106.wav',
    'chip': '/lib/sounds/game/32951_HardPCM_Chip051.wav',
    'chip2':'/lib/sounds/game/32952_HardPCM_Chip052.wav',
    'grate':'/lib/sounds/game/35714_HardPCM_Chip132.wav',
    'grate2':'/lib/sounds/game/35715_HardPCM_Chip133.wav'
}


for(i in sounds){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', path + sounds[i]);
    audioElement.load();
    sounds[i] = audioElement;
}

/*
'bass': [1,1,0,1,1,0,0,0],
'clap': [0,0,1,0,0,1,0,0],
'cymb': [1,0,1,0,1,0,1,0]
*/

var BPM = 300;
var ticks = 1;

var sequence = {
    tracker:[
    {
        'measures': 10,
        'beats': 4,
        'insturments':{
            'bass': [1,1,0,1],
            'clap': [0,0,1,0],
            'cymb': [1,0,1,0],
            'klip': [0,0,1,0],
            'chip': [1,0,0,0]
        },
    },
    {
        'measures': 10,
        'beats': 4,
        'insturments':{
            'bass': [1,1,0,1],
            'clap': [0,0,1,0],
            'cymb': [1,0,1,0],
            'grate2':[0,0,1,0],
            'chip': [0,0,1,0],
        },
    }
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

var volume = {
    'bass' : 1,
    'clap' : 0.5,
    'cymb' : 0.4,
    'blip' : 0.3,
    'klip' : 0.3,
    'grate2' : 0.5,
}


$(function (){
  var pos = 0;
 //var measure_len = sequence.length('clap');
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
    console.log(sequence.beats())
    
  },(1000 / (BPM / 60 * ticks))) ;
    
})