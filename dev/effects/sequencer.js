
var tmppath = String(window.location).split('/')
var path = tmppath.slice(0,tmppath.length -2).join('/')


var sounds = {
    'bass': '/lib/sounds/tr606/LC2-606-Bassdrum.wav',
    'clap': '/lib/sounds/tr606/LC2-606-Snare-ACC.wav',
    'cymb': '/lib/sounds/tr606/LC2-606-HiHatCL-ACC.wav'
}


for(i in sounds){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', path + sounds[i]);
    audioElement.load();
    sounds[i] = audioElement;
}


var BPM = 400;
var ticks = 1;

var sequence = {
    'bass': [1,1,0,1,1,0,0,0],
    'clap': [0,0,1,0,0,1,0,0],
    'cymb': [1,0,1,0,1,0,1,0]
}

var volume = {
    'bass' : 1,
    'clap' : 0.5,
    'cymb' : 0.4
}


$(function (){
  var pos = 0;
  var measure_len = sequence.bass.length;
  
  for(vol in volume){
      sounds[vol].volume = volume[vol];
  }
  
  setInterval(function (){
    for(insturment in sequence){
        if(sequence[insturment][pos]) sounds[insturment].play();
    }
    pos = (pos + 1) % measure_len;
  },(1000 / (BPM / 60 * ticks))) ;
    
})