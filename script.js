//constants
const frame_time = 500;
const cycle_time = 2000;
const tot_frames = cycle_time/frame_time;
const colors = ["red","green","blue","white","yellow","orange","cyan","purple","magenta","pink","brown","aqua","crimson","fuchsia","gold","lime","olive","sienna","teal","turquoise",]
const display = document.getElementById("screen");
const context = display.getContext("2d");
const square_size = 50;
const square_x = (canvas.width/2)+(square_size/2)
const square_y = (canvas.height/2)+(square_size/2)

//variables
let frame = 0;
let class_init = true;
let square1 = new Square (square_x,square_y,square_size);

canvas.width = 700;
canvas.height = 500;
canvas.style.width = '100%';
canvas.style.height = '100%';
//context.fillStyle = "red";
//context.fillRect(10, 10, 200, 200);

//classes
class Square {
  constructor(posx,posy,size){
    this.posx = posx;
    this.posy = posy;
    this.size = size;
    this.col = "";
  }

  draw(){
    this.#select_color();
    context.fillStyle(col);
    display.fillRect(this.posx,this.posy,this.size,this.size);
  }

  erase(){
    display.fillRect(0,0,display.width,display.height);
  }

  #select_color(){
    let num = Math.floor((Math.random()*colors.length())+1);
    col = colors[num];
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

//main
alert("test");
square1.draw();