/*
   form demo
*/

var flatlandConfig = {
    server: "https://flatland.earth",
    land: 'default',
    updateIntervall: 40,
    debug: true,
    clearscreen: true,
    backgroundcolor: [255, 255, 255],
    backgroundblend: 0.5
}

var machineConfig = {
    name: 'forms',
    maxCount: 10,
    minSize: 20,
    maxSize: 30,
    lifetime: 20000,
    color1: [255, 0, 255],
    color1Opacity: 0.1,
    color2: [0, 255, 255],
    color2Opacity: 0.1,
    pendown: true

}



// ---------------------------------------------------------------
class Machine extends defaultMachine {
    setup() {
        // initialize your machine
        if (int(random(2)) == 0) { // throw the coin
            this.type = MachineType.RECT;
        } else {
            this.type = MachineType.CIRCLE;
        }
        this.offset = random(2 * PI);
        this.size = random(10, 100);
        this.rad = random(10, width/2);
        this.color1 = color(random(255), random(255), random(255));
        this.penDown();
    }
    move() {
        // how does your machine move 
        this.rotation = noise(this.id * 100, millis() * 0.0001) * 40;
        this.pos.x = cos(this.offset + (millis() * 0.001)) * this.rad;
        this.pos.y = sin(this.offset + (millis() * 0.001)) * this.rad;

    }
}
// --------------------------------------------------------------




let gui;
let flatland;


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    flatland = new Flatland(); // connect to the flatland server
    initGui();
    frameRate(100);
    initSocketIO(flatlandConfig.server);
    gravitation = createVector(0, 0);
}


function draw() {
    flatland.update(); // update + draw flatland
}
