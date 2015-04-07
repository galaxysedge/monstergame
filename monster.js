var canvas = document.createElement("canvas");

var ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;

document.body.appendChild(canvas);

// background

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {bgReady = true;};
bgImage.src = "images/background.png";

// hero image

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {heroReady = true;};
heroImage.src = "images/hero.png";

// monster image

var monReady = false;
var monImage = new Image();
monImage.onload = function () {monReady = true;};
monImage.src = "images/monster.png"

// Game objects

var hero = {
    speed: 256,
    x: 0,
    y: 0
};
var monster = {
    x: 0,
    y: 0
};
var monstersCaught = 0;

// Player input

var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// New game

var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64))
};

// Update objects
var update = function (modifier) {
    if (38 in keysDown) { //Up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { //Down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { //Left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { //Right
        hero.x += hero.speed * modifier;
    }
    
    // Are they touching?
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        ++monstersCaught;
        reset();
    }
};

// Render objects

var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    
    if (monReady) {
        ctx.drawImage(monImage, monster.x, monster.y);
    }
    
    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
}

// Main game loop

var main = function () {
    var now = Date.now();
    var delta = now - then;
    
    update(delta/1000);
    render();
    
    then = now;
    
    requestAnimationFrame(main);
}

// AnimationFrame cross browser
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();
