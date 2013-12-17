// //  Game classes

var Board = function()
{
	var boardTexture = PIXI.Texture.fromImage("images/board.png");

	this.boardSprite = new PIXI.Sprite(boardTexture);

	this.boardSprite.position.x = 30;
	this.boardSprite.position.y = 30;

	this.addChild(this.boardSprite);

	this.addTetromino();

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
	this.currentTetromino = new JTetromino();

	this.currentTetromino.position.x = 150;
	this.currentTetromino.position.y = 30;

	this.addChild(this.currentTetromino);
}

Board.prototype.rotate = function()
{
	this.currentTetromino.rotate();
}

Board.prototype.moveLeft = function()
{
	var currentTetrominoPosition = this.currentTetromino.position.x / this.blockSize;

	currentTetrominoPosition += this.currentTetromino.leftMostBrickPosition();

	if (currentTetrominoPosition > 1)
	{
		this.currentTetromino.position.x -= 30;
	};
}

Board.prototype.moveRight = function(e)
{
	var currentTetrominoPosition = this.currentTetromino.position.x / this.blockSize;

	currentTetrominoPosition += this.currentTetromino.rightMostBrickPosition();

	if (currentTetrominoPosition < 10)
	{
		this.currentTetromino.position.x += 30;
	}
}

Board.prototype.moveDown = function()
{
	this.currentTetromino.position.y += 30;

	this.currentTetromino.showAllBlocks();
}

Board.prototype.drop = function()
{
	console.log("drop");
}