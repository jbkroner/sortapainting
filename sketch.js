function preload(){
    img = loadImage('vangogh.jpeg');
}

function setup(){
    // setup our sketch, get's called once
    WIDTH = 400;
    HEIGHT = 500;
    createCanvas(WIDTH, HEIGHT);
    imageMode(CORNERS);
    // rectMode(CENTER);

    T = new TileManager(10, 12, 10, 10);

}

function draw(){
    noLoop(); 
    // draw the picture
    image(img, 0, 0, WIDTH - 1, HEIGHT - 1);
    // loadPixels(); // updates the pixels array
    
    // T.drawExteriorBufferBox();
    T.drawInteriorFields();
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

        // calculate and store relative (0,0), width, height
        this.oX = this.exteriorBuff;
        this.oY = this.exteriorBuff;
        this.width = WIDTH - (2 * this.exteriorBuff);
        this.height = HEIGHT - (2 * this.exteriorBuff);
        this.xSideLength = (this.width - ((this.cols - 1) * this.interiorBuff)) / this.cols;
        this.ySideLength = (this.height - ((this.rows - 1) * this.interiorBuff)) / this.rows;

        // store fields here
        this.fields = []
        this.genInteriorFields();
    }

    
    // draw a box aroudn the inside field with dimensions (width - (2 * eb)) * (height - (2 * eb))
    drawExteriorBufferBox(){
        stroke(0, 255, 0);

        // draw vert lines
        line(this.exteriorBuff, this.exteriorBuff, this.exteriorBuff, HEIGHT - this.exteriorBuff);
        line(WIDTH - this.exteriorBuff, this.exteriorBuff, WIDTH - this.exteriorBuff, HEIGHT - this.exteriorBuff);

        // draw horizontal lines
        line(this.exteriorBuff, this.exteriorBuff, WIDTH - this.exteriorBuff, this.exteriorBuff);
        line(this.exteriorBuff, HEIGHT - this.exteriorBuff, WIDTH - this.exteriorBuff, HEIGHT - this.exteriorBuff)
    }
     
    drawInteriorFields(){
        this.fields.forEach(field => field.drawDebug());
    }
    
    // populate this.fields()
    genInteriorFields(){
        for(let x = this.oX; x <= this.width; x = x + (this.xSideLength + this.interiorBuff)){
            for(let y = this.oY; y <= this.height; y = y + (this.ySideLength + this.interiorBuff)){
                let field = new Field(x, y, this.xSideLength, this.ySideLength);
                this.fields.push(field);
            }
        }
    }
}

// a field is like a mini-canvas! it has a '(0,0)' at (oX, oY).  its 
// dimensions are xSideLength by ySideLength.
class Field {
    constructor(oX, oY, xSideLength, ySideLength){
        this.oX = oX;
        this.oY = oY; 
        this.xSideLength = xSideLength;
        this.ySideLength = ySideLength;
    }

    drawDebug(){
        stroke(0,255,0);
        fill(255,0,0);
        rect(this.oX, this.oY, this.xSideLength, this.ySideLength);
    }
}
     









