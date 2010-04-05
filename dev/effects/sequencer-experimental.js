
var tmppath = String(window.location).split('/')
var path = tmppath.slice(0,tmppath.length -2).join('/')+'/lib/sounds/'

$(function (){
    var width = 1024;
    var height = 768;

    resizeTo(width,height)
    var toolbar_height;
    if(window.outerHeight > window.innerHeight){
        toolbar_height = window.outerHeight - window.innerHeight;
    }else{
        toolbar_height = 0;
    }
    var centx = screen.width/2 - width/2; 
    var centy = screen.height/2 - height/2;
    moveTo(centx,centy);    

    run()
    runSound();
    ready = true;
})

var sounds = {
    //'bass': 'tr606/LC2-606-Bassdrum.wav',
    //'clap': 'tr606/LC2-606-Snare-ACC.wav',
    // 'cymb': 'tr606/LC2-606-HiHatCL-ACC.wav',
    // 'blip': '33230_HardPCM_Chip090.wav',
    // 'klip': 'game/34228_HardPCM_Chip106.wav',

    // 'chip': 'game/32951_HardPCM_Chip051.wav',
    // 'chip2':'game/32952_HardPCM_Chip052.wav',

    'grate': 'game/35714_HardPCM_Chip132.wav',
    'grate2':'game/35715_HardPCM_Chip133.wav',
    
    'blip' : 'g8b/Blip 001.wav',
    //'blip2' :'g8b/Blip 002.wav',
    'blip3' :'g8b/Blip 003.wav',
    //'blip4' :'g8b/Blip 004.wav',
    //'blip5' :'g8b/Blip 005.wav',
    //'blip6' :'g8b/Blip 006.wav',
    //'blip7' :'g8b/Blip 007.wav',
    //'blip8' :'g8b/Blip 008.wav',
    'blip9' :'g8b/Blip 009.wav',
    
    //'kick' : 'g8b/Kick 002.wav',
    'kick2': 'g8b/Kick 003.wav',
    //'kick3': 'g8b/Kick 006.wav',
    
    //'snare': 'g8b/Snare 002.wav',
    //'snare2': 'g8b/Snare 005.wav',
    
    // 'tom' : 'tr606/LC2-606-HiTom-ACC.wav',
    // 'tom2': 'tr606/LC2-606-HiTom.wav',
    // 'tom3': 'tr606/LC2-606-LoTom-ACC.wav',
    
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




/* 
    need to add a touch of preloading to assure smooth sailing ;)
*/

 function runSound(){

    var BPM = 300;
    var ticks = 1;

    var sequence = {
        tracker:[
        // {
        //      'measures': 4,
        //      'beats': 8,
        //      'insturments':{
        //          'kick3': [1,0,1,0,1,0,1,0],
        //          'blip2': [0,1,1,0,1,0,1,0],
        //          'blip3': [0,1,0,1,1,0,1,0],
        //          'blip8': [1,1,0,1,1,0,1,0],
        //      }
        //  },
        //  {
        //          'measures': 4,
        //          'beats': 8,
        //          'insturments':{
        //              'kick3': [1,0,1,0,1,0,1,0],
        //              'blip2': [0,1,1,0,1,0,1,0],
        //              'blip6': [0,1,0,1,1,0,1,0],
        //              'blip5': [1,1,0,1,1,0,1,0],
        //          }
        //      },
        //      {
        //          'measures': 4,
        //          'beats': 8,
        //          'insturments':{
        //              'kick3': [1,0,1,0,1,0,1,0],
        //              'blip9': [0,1,1,0,1,0,1,0],
        //              'blip': [0,1,0,1,1,0,1,0],
        //              'blip7': [1,1,0,1,1,0,1,0],
        //          }
        //      },
        //  {
        //      'measures': 4,
        //      'beats': 8,
        //      'insturments':{
        //          'kick2': [1,0,1,0,1,0,1,0],
        //          'blip9': [0,1,1,0,1,0,1,0],
        //          'blip' : [0,1,0,1,1,0,1,0],
        //          'blip3': [1,1,0,1,1,0,1,0],
        //      }
        //  },
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
        //  {
        //      'measures': 4,
        //      'beats': 8,
        //      'insturments':{
        //          'kick': [1,0,1,0,1,0,1,0],
        //          'grate2' : [0,1,1,0,1,0,1,0],
        //          'blip8': [1,1,0,1,1,0,1,0],
        //      }
        //  },
        //  {
        //      'measures': 4,
        //      'beats': 8,
        //      'insturments':{
        //          'kick': [1,0,1,0,1,0,1,0],
        //          'clap' : [0,1,1,0,1,0,1,0],
        //          'clap':  [1,1,0,1,1,0,1,0],
        //      }
        //  },
        // {
        //     'measures': 4,
        //     'beats': 8,
        //     'insturments':{
        //         'kick': [1,0,1,0,1,0,1,0],
        //         'grate2': [0,1,1,0,1,0,1,0],
        //         'blip8': [1,1,0,1,1,0,1,0],
        //     }
        // },
        // {
        //     'measures': 4,
        //     'beats': 8,
        //     'insturments':{
        //         'kick': [1,0,1,0,1,0,1,0],
        //         'blip6': [0,1,1,0,1,0,1,0],
        //         'snare': [1,1,0,1,1,0,1,0],
        //     }
        // },
        // {
        //     'measures': 4,
        //     'beats': 8,
        //     'insturments':{
        //         'kick': [1,0,1,0,1,0,1,0],
        //         'blip3': [0,1,1,0,1,0,1,0],
        //         'grate2': [1,1,0,1,1,0,1,0],
        //     }
        // },
        // {
        //     'measures': 10,
        //     'beats': 4,
        //     'insturments':{
        //         'bass': [1,1,0,1],
        //         'clap': [0,0,1,0],
        //         'cymb': [1,0,1,0],
        //         'klip': [0,0,1,0],
        //         'chip': [1,0,0,0]
        //     },
        // },
        // {
        //     'measures': 10,
        //     'beats': 4,
        //     'insturments':{
        //         'bass': [1,1,0,1],
        //         'clap': [0,0,1,0],
        //         'cymb': [1,0,1,0],
        //         'grate2':[0,0,1,0],
        //         'chip': [0,0,1,0],
        //     },
        // },
        // {
        //     'measures': 10,
        //     'beats': 4,
        //     'insturments':{
        //         'bass': [1,1,0,1],
        //         'clap': [0,0,1,0],
        //         'cymb': [1,0,1,0],
        //         'klip': [0,0,1,0],
        //         'chip': [1,0,0,0]
        //     },
        // },
        // {
        //     'measures': 10,
        //     'beats': 4,
        //     'insturments':{
        //         'bass': [1,1,0,1],
        //         'clap': [0,0,1,0],
        //         'cymb': [1,0,1,0],
        //         'grate2':[0,0,1,0],
        //         'chip': [0,0,1,0],
        //     },
        // }
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
        //'bass' : 1,
        'clap' : 1,
        //'cymb' : 0.4,
        'blip' : 0.3,
        //'klip' : 0.3,
        'grate2' : 0.8,
        'grate' : 0.8,
    }


    //$(function (){
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
        //console.log(sequence.beats())
    
      },(1000 / (BPM / 60 * ticks)));
    
   //})
}