const my_canvas = document.getElementById("gamecanvas");
const my_scoreboard = document.getElementById("scoreboard");
const my_errorlog = document.getElementById("errorlog");

const ctx = my_canvas.getContext("2d");

// set global variables
const my_tileclr = "Black";
const my_bkgclr = "LightGray";
const my_hitclr = "LightGreen";
const my_missclr = "LightSalmon";
const my_tilewidth = 50;
const my_tilearea = my_tilewidth * my_tilewidth;
const my_interval = 550;

let my_mole = null;
let my_clicked = null;
let my_score = 0;
let my_thisframesuccess = false;

// fill background
ctx.fillStyle = my_bkgclr;
ctx.fillRect(0, 0, my_tilearea, my_tilearea);

// hook up click events
my_canvas.addEventListener("click", function() {clicktile(event)});

// main loop
setInterval(mainloop, my_interval);


function mainloop() {
    // remove previous clicks and mole
    if (my_clicked !== null) {
        my_thisframesuccess = false;
        fillTile(my_clicked, my_bkgclr);
    }
    if (my_mole !== null) {
        fillTile(my_mole, my_bkgclr);
    }

    // get and record random position (range 0-25)
    my_mole = Math.floor(Math.random() * 25);

    // draw tile at random position
    fillTile(my_mole, my_tileclr);
}

function clicktile(event) {
    // get coordinate of click relative to the element
    const rect = event.target.getBoundingClientRect();
    const offsetx = event.clientX - rect.left;
    const offsety = event.clientY - rect.top;

    // once mole is hit this frame, do nothing further
    // if not, allow retries
    if (my_clicked !== null) {
        if (my_thisframesuccess) { return; }
        else { fillTile(my_clicked, my_bkgclr); }
    }

    // find which tile was clicked
    const clicked = xytotile(offsetx, offsety);

    // if mole is clicked
    if (my_mole !== null && clicked == my_mole) {
        fillTile(clicked, my_hitclr);
        my_scoreboard.innerHTML = "Score: " + ++my_score;
        my_thisframesuccess = true;
    } else {
        fillTile(clicked, my_missclr);
        my_thisframesuccess = false;
    }

    // save last clicked
    my_clicked = clicked;
}

function fillTile(tile, clr) {
    const t = tiletoxy(tile);
    ctx.fillStyle = clr;
    ctx.fillRect(t.x, t.y, my_tilewidth, my_tilewidth);
}

function xytotile(x, y) {
    const tilex = Math.floor(x / my_tilewidth);
    const tiley = Math.floor(y / my_tilewidth);
    return 5 * tiley + tilex;
}

function tiletoxy(tile) {
    const x = (tile % 5) * my_tilewidth;
    const y = Math.floor(tile / 5) * my_tilewidth;

    return { x, y };
}