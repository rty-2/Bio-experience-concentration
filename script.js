//constants
const frame_time = 250;
const cycle_time = 1500;
const tot_frames = cycle_time/frame_time;
const colors = ["red","green","blue","white","yellow","orange","purple","brown","crimson","fuchsia","gold","lime","sienna","teal","turquoise",]
const prop = 13;

//variables
let frame = 0;
let active_color = "";
let armed = false;
let active = false;

//cancas init
let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");
canvas.style.height = window.innerHeight + "px";
canvas.style.width = window.innerWidth + "px";
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//classes
class Square {
  constructor(display,frac){
    this.display = display;
    this.display_height = display.height;
    this.display_width = display.width;
    this.sizex = Math.floor(this.display_height/frac);
    this.sizey = Math.floor(this.display_height/frac);
    this.posx = (this.display_width - this.sizey)/2;
    this.posy = Math.floor(frac/2)*this.sizex;
    this.col = "";
    this.test = 0;
  }

  draw(rng = true){
    if(rng){
      this.#select_color();
    }
    else {
      this.#test_color();
    }
    console.log("drawing square")
    console.log(this.sizex)
    console.log(this.sizey)
    console.log(this.posx)
    console.log(this.posy)
    
    ctx.fillStyle = this.col;
    ctx.fillRect(this.posx,this.posy,this.sizex,this.sizey);
  }

  erase(){
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,this.display.width,this.display.height);
  }

  #select_color(){
    console.log("randomly selecting")
    let num = Math.floor((Math.random()*colors.length));
    this.col = colors[num];
  }

  #test_color(){
    this.col = colors[this.test];
    this.test = (this.test + 1)%colors.length;
  }
}

//functions
function loop(){
  switch (frame) {
    case 0:
      square1.draw(armed);
      break;
    case 1:
      square1.erase();
      break;
    default:
      break;
  }
  frame = (frame + 1) % tot_frames;
  setTimeout(loop,frame_time);
}

//main
let square1 = new Square (canvas,prop);
loop();