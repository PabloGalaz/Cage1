var sound, amplitude, cnv, button, peakDetect, img;
//var myHeader;
var myLink;

function preload(){
  sound = loadSound('sounds/Bacchanale.mp3');
  img = loadImage("images/cage_02.jpeg");
}


function setup() {
  cnv = createCanvas(windowWidth,windowHeight);
  amplitude = new p5.Amplitude();
  amplitude.toggleNormalize(true); 
  cnv.position(0, 0);
  cnv.style("z-index", "-1");
   /* myHeader = createElement('header', "Following Cage");
  myHeader.position(width/2, 10);*/
  //image(img, 0, 0);
  button = createButton("play/stop");
  button.mousePressed(playSound);
  button.position(10, windowHeight - 25) ; 
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect();
  peakDetect.threshold = 0.1;

  myLink = createA('https://www.youtube.com/watch?v=SwJLGUgs1jc', 'music credits');
  myLink.position(windowWidth-100,windowHeight - 25);

  
}

// start / stop the sound when canvas is clicked
  function playSound () {
    if (sound.isPlaying() ){
      sound.stop();
    } else {
      sound.play();
    }
  }
  
  function windowResized(){
            resizeCanvas(windowWidth,windowHeight);
        }




function draw() {
  
  
  
  var ampLevel = amplitude.getLevel();
  var alfa = map(ampLevel, 0, 0.3, 0, 255);
  var ellipSize = map(ampLevel, 0, 0.3, 0, 500);
  var ellipOffset = map(ampLevel, 0, 0.3, 5, 50)
  noStroke();
  ellipseMode(CENTER);
  fill(random(255), alfa, alfa, alfa );
  ellipse(width/2 - ellipOffset, height/2 + ellipOffset, ellipSize+random(15), ellipSize+random(20));
  


  fft.analyze();
  peakDetect.update(fft);



  if (peakDetect.isDetected){
    console.log("got attack");
  
  var textX = 50+random(100);
  var textY = 50+random(50);
  fill((random (255)), 0 , 0, (random(200, 255)));
  fill(random(255), 0 , random(50), alfa);
  rotate(random (.5));
  background(img);
  }
  else {

  textX = 30;
  textY = 50
  fill(0, (random (100)) , (random (100)), (random (90)));
  }
  
  var txtspace = Math.round (map(ampLevel, 0, 1, 30, 200));
  var txtsize = map(ampLevel, 0, 1, 30, 35);
/*  var textX = map(ampLevel, 0, 1, width/2-10, width/2+10);
  var textY = map(ampLevel, 0, 1, 50, 60);*/
  //var alplha = map(ampLevel, 0, 1, 0.5, .4);

  
  textSize(txtsize);
  textLeading(txtspace);
  text("Following\nCage", textX+random(1), textY+random(1));

  
  
}







