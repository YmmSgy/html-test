function Cd(x, y) {
    this.x = x;
    this.y = y;
    this.toMonoCd = () => 10 * this.y + x;
    // vector addition
    this.add = (other) => new Cd(this.x + other.x, this.y + other.y);
}

const screen = document.getElementById("screen");
const initxy = new Cd(4, 4);

const buffer = {
    tiles: [],

    // flush buffer
    flush: function() {
        let src = this.tiles;
        let arr = [];
        // group 10 chars of src, then insert newline
        for (let i = 0; i < src.length; i += 10) {
            // slice() returns a sub-array, join() converts to string, add this to arr
            arr.push(src.slice(i, i + 10).join(""));
            // add newline to arr
            arr.push("\n");
        }
        // join into full string, slicing out unnecessary newline at the end
        screen.innerHTML = arr.slice(0, arr.length - 1).join("");
    },

    // clear and fill buffer
    fill: function(tile) {
        this.tiles = [];
        for (let i = 0; i < 100; ++i) {
            this.tiles.push(tile);
        }
    },

    // set tile in buffer
    settile: function(cd, tile) {
        this.tiles[cd.toMonoCd()] = tile;
    }
};

const snake = {
    body: [initxy, initxy],

    dir: new Cd(0, 1),

    isInBody: function(cd) {
        let flag = false;
        for (let i = 0; i < this.body.length; ++i) {
            const bodypart = this.body[i];
            if (bodypart.x === cd.x && bodypart.y === cd.y) { flag = true; }
        }
        return flag;
    }
};

function wrap(cd) {
    wrapint = (wraplen, i) => ((i % wraplen) + wraplen) % wraplen;
    return new Cd(wrapint(10, cd.x), wrapint(10, cd.y));
}

function initactions() {
    buffer.fill(".");
    buffer.settile(initxy, "O");
    buffer.flush();
}

function turnactions() {
    // remove the tail (index 0) and add prevhead+dir to the head (index length-1)
    const prevtail = snake.body.shift();
    const prevhead = snake.body[snake.body.length - 1];
    const newhead = wrap(prevhead.add(snake.dir));
    snake.body.push(newhead);

    // clear screen and redraw whole snake
    buffer.fill(".");
    snake.body.forEach((partcd) => buffer.settile(partcd, "O"));
    buffer.flush();
}

initactions();
document.getElementById("btn").onclick = turnactions;
//setInterval(turnactions, 1000);
