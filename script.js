//constants
const frame_time = 250;
const cycle_time = 1500;
const tot_frames = cycle_time / frame_time;
const colors = [
  "red",
  "green",
  "blue",
  "white",
  "yellow",
  "orange",
  "purple",
  "brown",
  "crimson",
  "fuchsia",
  "gold",
  "lime",
  "sienna",
  "teal",
  "turquoise",
];
const text_col = ["red", "white"];
const prop = 13;

//variables
let frame = 0;
let active_color = "";
let armed = false;
let active = false;
let col_on = false;
let input = false;
let miss_counter = 0;
let other_hits = 0;
let target_hits = 0;
let text_col_state = 0;
let target_col = "red";
let key_hit = 0;
let total = 0;

//cancas init
let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");
canvas.style.height = window.innerHeight + "px";
canvas.style.width = window.innerWidth + "px";
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//classes
class Square {
  constructor(display, frac) {
    this.display = display;
    this.display_height = display.height;
    this.display_width = display.width;
    this.sizex = Math.floor(this.display_height / frac);
    this.sizey = Math.floor(this.display_height / frac);
    this.posx = (this.display_width - this.sizey) / 2;
    this.posy = Math.floor(frac / 2) * this.sizex;
    this.col = "";
    this.test = 0;
  }

  draw(rng = true) {
    if (rng) {
      this.#select_color();
    } else {
      this.#test_color();
    }
    ctx.fillStyle = this.col;
    ctx.fillRect(this.posx, this.posy, this.sizex, this.sizey);
  }

  erase() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.display.width, this.display.height);
  }

  #select_color() {
    console.log("randomly selecting");
    let num = Math.floor(Math.random() * colors.length);
    this.col = colors[num];
  }

  #test_color() {
    this.col = colors[this.test];
    this.test = (this.test + 1) % colors.length;
  }
}

//functions
function loop() {
  if (active) {
    switch (frame) {
      case 0:
        square1.erase();
        square1.draw(armed);
        col_on = true;
        input = false;
        total++;
        break;
      case 1:
        square1.erase();
        break;
      case tot_frames - 1:
        square1.erase();
        //col_on = false;
        if (!input) {
          miss_counter++;
        }
        break;
      default:
        square1.erase();
        break;
    }
    frame = (frame + 1) % tot_frames;
    if (!armed) {
      ctx.fillStyle = "white";
      ctx.font = "50px serif";
      ctx.fillText("Test mode", 50, 90);
      ctx.fillText("Target hits = " + target_hits, 50, 190);
      ctx.fillText("Other hits = " + other_hits, 50, 240);
      ctx.fillText("Misses = " + miss_counter, 50, 290);
      ctx.fillText("Target = " + target_col, 50, 340);
      ctx.fillText("Keys pressed = " + key_hit, 50, 390);
      ctx.fillText("Total = " + total, 50, 440);
    }
  } else {
    square1.erase();
    ctx.fillStyle = text_col[text_col_state];
    ctx.font = "50px serif";
    ctx.fillText("Experience inactive", 50, 90);
    ctx.fillStyle = "white";
    ctx.fillText("Armed = " + armed, 50, 140);
    ctx.fillText("Target hits = " + target_hits, 50, 190);
    ctx.fillText("Other hits = " + other_hits, 50, 240);
    ctx.fillText("Misses = " + miss_counter, 50, 290);
    ctx.fillText("Target = " + target_col, 50, 340);
    ctx.fillText("Keys pressed = " + key_hit, 50, 390);
    ctx.fillText("Total = " + total, 50, 440);
    text_col_state = (text_col_state + 1) % text_col.length;
  }
  setTimeout(loop, frame_time);
}

function key_check(e) {
  key_hit++;
  switch (e.key) {
    case " ":
      check_col(true);
      break;
    case "Enter":
      active = !active;
      break;
    default:
      check_col(false);
      break;
  }
}

function check_col(is_target) {
  if (col_on) {
    if (!input) {
      if (is_target) {
        if (square1.col == target_col) {
          target_hits++;
        } else {
          miss_counter++;
        }
      } else {
        if (square1.col == target_col) {
          miss_counter++;
        } else {
          other_hits++;
        }
      }
      input = true;
    }
  }
}

//main
let square1 = new Square(canvas, prop);
document.addEventListener("keydown", key_check);
loop();
