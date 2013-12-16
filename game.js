// //  Game classes

var Board = function()
{
	var boardTexture = PIXI.Texture.fromImage("board.png");

	this.boardSprite = new PIXI.Sprite(boardTexture);

	this.boardSprite.position.x = 30;
	this.boardSprite.position.y = 30;

	this.addChild(this.boardSprite);

	this.addTetromino();
}

Board.prototype = new PIXI.DisplayObjectContainer();
Board.prototype.constructor = Board;

Board.prototype.addTetromino = function()
{
	this.currentTetromino = new TTetromino();

	this.currentTetromino.position.x = 150;
	this.currentTetromino.position.y = 30;

	this.addChild(this.currentTetromino);

	console.log(this);
}

Board.prototype.rotate = function()
{
	this.currentTetromino.rotate();
}

Board.prototype.moveLeft = function()
{
	// console.log(this);

	this.currentTetromino.position.x -= 30;
}

Board.prototype.moveRight = function(e)
{
	// console.log(this.currentTetromino);
	this.currentTetromino.position.x += 30;
}

Board.prototype.moveDown = function()
{
	// console.log(this.currentTetromino);
	this.currentTetromino.position.y += 30;
}

Board.prototype.drop = function()
{
	console.log("drop");
}

//  Game code
var rendererWeight = 800;
var rendererHeight = 700;

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x000000);
	
// create a renderer instance
var renderer = PIXI.autoDetectRenderer(rendererWeight, rendererHeight);
	
// add the renderer view element to the DOM
document.body.appendChild(renderer.view);


var board = new Board();

stage.addChild(board);


function pressUp(e)
{
	board.rotate();
}

function pressLeft(e)
{
	board.moveLeft();
}

function pressRight(e)
{
	board.moveRight();
}

function pressDown(e)
{
	board.moveDown();
}

function pressSpace(e)
{
	board.drop();
}


kd.UP.press(pressUp);
kd.LEFT.press(pressLeft);
kd.RIGHT.press(pressRight);
kd.DOWN.press(pressDown);
kd.SPACE.press(pressSpace);

requestAnimFrame( gameloop );

function gameloop()
{
    requestAnimFrame( gameloop );

    // just for fun, lets rotate mr rabbit a little
    // bunny.rotation += 0.1;
	
    // render the stage   
    renderer.render(stage);

    kd.tick();
}