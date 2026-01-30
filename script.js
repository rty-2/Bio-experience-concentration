//constants
const colors = [
  "red",
  "green",
  "blue",
  "white",
  "yellow",
  "orange",
  "purple",
  "brown",
  "fuchsia",
  "gold",
  "lime",
  "sienna",
  "teal",
  "turquoise",
];
const text_col = ["red", "white"];

//variables
let frame = 0;
let active_color = "";
let armed = false;
let active = false;
let col_on = false;
let input = false;
let other_miss = 0;
let timeout = 0;
let hit_miss = 0;
let other_hits = 0;
let target_hits = 0;
let text_col_state = 0;
let target_col = "red";
let key_hit = 0;
let total = 0;
let frame_time = 250;
let cycle_time = 1500;
let tot_frames = cycle_time / frame_time;
let prop = 13;
let results = [];

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

class Save {
  constructor(
    a,
    act,
    o_ms,
    h_ms,
    tout,
    o_ht,
    tgt_ht,
    tgt_col,
    tot,
    ft,
    ct,
    t_fm,
    rt,
  ) {
    this.armed = a;
    this.active = act;
    this.other_miss = o_ms;
    this.hit_miss = h_ms;
    this.timeout = tout;
    this.other_hits = o_ht;
    this.target_hits = tgt_ht;
    this.target_col = tgt_col;
    this.total = tot;
    this.frame_time = ft;
    this.cycle_time = ct;
    this.tot_frames = t_fm;
    this.prop = rt;
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
          timeout++;
        }
        break;
      default:
        square1.erase();
        break;
    }
    frame = (frame + 1) % tot_frames;
    if (!armed) {
      print_stats();
      ctx.fillText("Test mode", 50, 90);
    }
  } else {
    square1.erase();
    ctx.fillStyle = text_col[text_col_state];
    ctx.font = "50px serif";
    ctx.fillText("Experience inactive", 50, 90);
    ctx.fillStyle = "white";
    ctx.fillText("Armed = " + armed, 50, 140);
    print_stats();
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
    case "CapsLock":
      if (active) {
        lap();
      }
      break;
    case "r":
      if (!active) {
        reset();
      }
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
          other_miss++;
        }
      } else {
        if (square1.col == target_col) {
          hit_miss++;
        } else {
          other_hits++;
        }
      }
      input = true;
    }
  }
}

function reset() {
  armed = true;
  active = false;
  col_on = false;
  input = false;
  other_miss = 0;
  hit_miss = 0;
  timeout = 0;
  other_hits = 0;
  target_hits = 0;
  text_col_state = 0;
  target_col = "red";
  key_hit = 0;
  total = 0;
  frame_time = 250;
  cycle_time = 1500;
  tot_frames = cycle_time / frame_time;
  prop = 13;
}

function change_time_values(ft, ct) {
  frame_time = ft;
  cycle_time = ct;
  tot_frames = cycle_time / frame_time;
}

function lap() {
  let save1 = new Save(
    armed,
    active,
    other_miss,
    hit_miss,
    timeout,
    other_hits,
    target_hits,
    target_col,
    total,
    frame_time,
    cycle_time,
    tot_frames,
    prop,
  );
  results.push(save1);
}

function print_results() {
  console.log(results);
}

function print_stats() {
  ctx.fillStyle = "white";
  ctx.font = "50px serif";
  ctx.fillText("Target hits = " + target_hits, 50, 190);
  ctx.fillText("Other hits = " + other_hits, 50, 240);
  ctx.fillText("Hit misses = " + hit_miss, 50, 290);
  ctx.fillText("Other misses = " + other_miss, 50, 340);
  ctx.fillText("Timeout = " + timeout, 50, 390);
  ctx.fillText("Target = " + target_col, 50, 440);
  ctx.fillText("Keys pressed = " + key_hit, 50, 490);
  ctx.fillText("Total = " + total, 50, 540);
  ctx.fillText("Frame time = " + frame_time, 50, 590);
  ctx.fillText("Cycle time = " + cycle_time, 50, 640);
}

//main
let square1 = new Square(canvas, prop);
document.addEventListener("keydown", key_check);
loop();
