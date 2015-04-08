var canvas = document.createElement("canvas");

var ctx = canvas.getContext("2d");
canvas.x = 16; // number of tiles across
canvas.y = 15; // number of tiles down
canvas.tilesize = 32;
canvas.width = canvas.x*canvas.tilesize;
canvas.height = canvas.y*canvas.tilesize;

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
    //speed: 8,
    x: Math.round(canvas.x/2),
    y: Math.round(canvas.y/2)
	
};
var monster = {
    x: 0,
    y: 0
};
var monstersCaught = 0;

// Player input

var keysDown = {};

addEventListener("keydown", function (e) {
	if (! (e.keyCode in keysDown)) {
		keysDown[e.keyCode] = 0;
	}
	keysDown[e.keyCode] ++;
}, false);

//addEventListener("keyup", function (e) {
 //   delete keysDown[e.keyCode];
//}, false);

// New game

var reset = function () {
    //hero.x = canvas.width / 2; 
    //hero.y = canvas.height / 2;
		//don't want hero position to reset
    
    monster.x = 1 + Math.round((Math.random() * (canvas.x - 2)));
    monster.y = 1 + Math.round((Math.random() * (canvas.y - 2)))
};

// Update objects
var update = function (modifier) {
    if (38 in keysDown) { //Up
        hero.y -= keysDown[38];
		delete keysDown[38];
    }
    if (40 in keysDown) { //Down
        hero.y += keysDown[40];
		delete keysDown[40];
    }
    if (37 in keysDown) { //Left
        hero.x -= keysDown[37];
		delete keysDown[37];
    }
    if (39 in keysDown) { //Right
        hero.x += keysDown[39];
		delete keysDown[39];
    }
    
    // Are they touching?
    if (
		hero.x == monster.x && hero.y == monster.y
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
        ctx.drawImage(heroImage, hero.x*canvas.tilesize, hero.y*canvas.tilesize);
    }
    
    if (monReady) {
        ctx.drawImage(monImage, monster.x*canvas.tilesize, monster.y*canvas.tilesize);
    }
    
    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
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
console.log(hero.x, hero.y, monster.x, monster.y )

main();
