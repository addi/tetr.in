// //  Game classes

var Board = function()
{
	var boardTexture = PIXI.Texture.fromImage("images/board.png");

	this.boardSprite = new PIXI.Sprite(boardTexture);

	this.boardSprite.position.x = 30;
	this.boardSprite.position.y = 30;

	this.addChild(this.boardSprite);

	this.timeSinceLastTetrominoMovedDown = 0;

	this.addTetromino();
	// this.addTetromino();

	this.blockSize = 30;

	this.board = new Array(10);
  
  	for (var x = 0; x < 10; x++)
  	{
    	this.board[x] = new Array(20);
  	}
}

Board.prototype = new PIXI.DisplayObjectContainer();
Board.prototype.constructor = Board;

Board.prototype.addTetromino = function()
{
	console.log("addTetromino ... ");

	console.log(this.currentTetromino);

	var newTetromino = new JTetromino();

	newTetromino.position.x = 150;
	newTetromino.position.y = 30;

	console.log("add child");

	this.addChild(newTetromino);

	console.log("done adding the Child");	

	this.currentTetromino = newTetromino;

	console.log(this.currentTetromino);
}

Board.prototype.rotate = function()
{
	var currentTetrominoPosition = this.currentTetromino.position.x / this.blockSize;

	this.currentTetromino.rotate();

	var rightMostPosition = currentTetrominoPosition + this.currentTetromino.rightMostBrickPosition();
	var leftMostPosition = currentTetrominoPosition + this.currentTetromino.leftMostBrickPosition();

	if (rightMostPosition > 10)
	{
		this.currentTetromino.position.x -= this.blockSize;
	}
	else if(leftMostPosition < 1)
	{
		this.currentTetromino.position.x += this.blockSize;
	}
}

Board.prototype.moveLeft = function()
{
	var currentTetrominoPosition = this.currentTetromino.position.x / this.blockSize;

	currentTetrominoPosition += this.currentTetromino.leftMostBrickPosition();

	if (currentTetrominoPosition > 1)
	{
		this.currentTetromino.position.x -= this.blockSize;
	};
}

Board.prototype.moveRight = function(e)
{
	var currentTetrominoPosition = this.currentTetromino.position.x / this.blockSize;

	currentTetrominoPosition += this.currentTetromino.rightMostBrickPosition();

	if (currentTetrominoPosition < 10)
	{
		this.currentTetromino.position.x += this.blockSize;
	}
}

Board.prototype.moveDown = function()
{
	this.currentTetromino.showAllBlocks();
	this.timeSinceLastTetrominoMovedDown = 0;

	var currentYPosition = this.currentTetromino.position.y / this.blockSize;
	
	currentYPosition += this.currentTetromino.lowestBrickPosition();

	if (currentYPosition < 19)
	{
		this.currentTetromino.position.y += this.blockSize;
	}
	else
	{
		console.log("addTetromino");

		console.log(this);

		this.addTetromino();
	}
}

Board.prototype.drop = function()
{
	console.log("drop");
}

// Board.prototype.update = function(delta)
// {
// 	this.timeSinceLastTetrominoMovedDown += delta;

// 	if (this.timeSinceLastTetrominoMovedDown > 1000)
// 	{
// 		// this.moveDown();
// 	};
	
// }