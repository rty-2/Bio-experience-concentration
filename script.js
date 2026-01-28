//constants
const frame_time = 500;
const cycle_time = 2000;
const tot_frames = cycle_time/frame_time;
const colors = ["red","green","blue","white","yellow","orange","cyan","purple","magenta","pink","brown","aqua","crimson","fuchsia","gold","lime","olive","sienna","teal","turquoise",]

//variables
let frame = 0;

//classes
class Display {
  constructor(name,sizex = '100%',sizey = '100%'){
    this.name = name;
    this.properties;
    this.sizex = sizex;
    this.sizey = sizey;
    this.output;
    this.context;
  }

  get_properties(type){
    this.properties = this.output.getBoundingClientRect();
    return(this.properties[type]);
  }

  init_canvas(){
    this.output.style.width = this.sizex;
    this.output.style.height = this.sizey;
    this.output.width = this.get_properties("width");
    this.output.height = this.get_properties("height");
    this.context = this.output.getContext("2d");
  }

  link_canvas(){
    this.output = document.getElementById(this.name);
    this.init_canvas();
  }
}

class Square {
  constructor(display,frac){
    this.display = display;
    this.display_height = this.display.get_properties("height");
    this.display_width = this.display.get_properties("width");
    this.sizex = Math.floor(this.display_height/frac);
    this.sizey = Math.floor(this.display_width/frac);
    this.posx = Math.floor(frac/2)*this.sizex;
    this.posy = Math.floor(frac/2)*this.sizey;
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
    this.display.context.fillStyle = this.col;
    this.display.context.fillRect(this.posx,this.posy,this.sizex,this.sizey);
  }

  erase(){
    context.fillRect(0,0,display.width,display.height);
  }

  #select_color(){
    let num = Math.floor((Math.random()*colors.length)+1);
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
      break;
    case 1:
      break;
  }
  frame = (frame + 1) % tot_frames;
  setTimeout(frame_time,loop);
}

function test(){

}
let display1 = new Display("screen")
display1.link_canvas();
let square1 = new Square (display1,5);
//main
square1.draw();
