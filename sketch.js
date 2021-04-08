function preload(){
    img = loadImage('vangogh.jpeg');
}

function setup(){
    // setup our sketch, get's called once
    WIDTH = 400;
    HEIGHT = 500;
    createCanvas(WIDTH, HEIGHT);
    imageMode(CORNERS);
    rectMode(CENTER);
    T = new TileManager(4, 4, 10, 10);
}

function draw(){
    noLoop(); 
    // draw the picture
    image(img, 0, 0, WIDTH - 1, HEIGHT - 1);
    // loadPixels(); // updates the pixels array
    
    T.wireframe();
    
}

// laundry list
// - determine proper canvas
// - stretch the image to match canvas size
// - get the index of some pixel in the pixels array


// pixels[] - [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4]
// 


// in:  x, y
// out: index of some pixel in Pixels
function getIndexInPixels(x, y, WIDTH){
    return (x * 4) + (y * WIDTH);
}

function test(i){
            // x
    return (i / 4) % WIDTH, floor((i / 4) / WIDTH);
}
// getIndexInPixels(0, 0) -> 0
// 

class TileManager {
    constructor(cols, rows, exteriorBuff, interiorBuff){
        this.cols = cols;
        this.rows = rows;
        this.exteriorBuff = exteriorBuff;
        this.interiorBuff = interiorBuff;
    }

    wireframe() {
        console.log(`TileManager: Wireframing tilegrid...`);
        for(let i = this.exteriorBuff; i < WIDTH - this.exteriorBuff; i = i + (WIDTH / this.cols)){
            stroke(255, 0, 0);
            line(i, 0, i, HEIGHT);

            for(let j = this.exteriorBuff; j < HEIGHT - this.exteriorBuff; j = j + (HEIGHT / this.rows)){
                stroke(0, 255, 0);
                line(0, j, WIDTH, j);
                rect(i, j, 20, 20);
            }
        }
    }

    wireframe2(){
        for(let i = 0; i < this.cols; ++i) {
            stroke(255,0,0);
            line(i, 0, i, HEIGHT);
        }


    }

}
