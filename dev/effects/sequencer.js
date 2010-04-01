
var tmppath = String(window.location).split('/')
var path = tmppath.slice(0,tmppath.length -2).join('/')


var sounds = {
    'bass': '/lib/sounds/tr606/LC2-606-Bassdrum.wav',
    'clap': '/lib/sounds/tr606/LC2-606-Snare-ACC.wav',
    'cymb': '/lib/sounds/tr606/LC2-606-HiHatCL-ACC.wav'
}

for(i in sounds) sounds[i] = path + sounds[i];


var BPM = 180;
var ticks = 1;

var sequence = {
    'bass': [1,1,0,1,1,0,0,0],
    'clap': [0,0,1,0,0,1,0,0],
    'cymb': [1,0,1,0,1,0,1,0]
}


$(function (){
  var pos = 0;
  var measure_len = sequence.bass.length;
  setInterval(function (){
    for(insturment in sequence){
        if(sequence[insturment][pos]) $.sound.play(sounds[insturment]);
    }
    pos = (pos + 1) % measure_len;
  },(1000 / (BPM / 60 * ticks))) ;
    
})