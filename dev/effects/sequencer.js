
var tmppath = String(window.location).split('/')
var path = tmppath.slice(0,tmppath.length -2).join('/')


var sounds = {
    'bass': '/lib/sounds/tr606/LC2-606-Bassdrum.wav',
    'clap': '/lib/sounds/tr606/LC2-606-Snare-ACC.wav',
    'cymb': '/lib/sounds/tr606/LC2-606-HiHatCL-ACC.wav',
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


var BPM = 200;
var ticks = 1;

var sequence = {
    // 'bass': [1,1,0,1,1,0,0,0],
    // 'clap': [0,0,1,0,0,1,0,0],
    // 'cymb': [1,0,1,0,1,0,1,0]
    'grate': [1,0,0,1],
    'grate2':[1,1,0,0],
    'chip' : [0,1,1,0],
    'chip2': [1,1,0,0],
    'bass' : [1,0,1,0]
}

var volume = {
    'grate2' : 0.5,
    'clap' : 0.5,
    'cymb' : 0.4
}


$(function (){
  var pos = 0;
  var measure_len = 4;//sequence.bass.length;
  
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