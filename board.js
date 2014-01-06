// //  Game classes

var NORMAL_BLOCK = 1;

var Board = function()
{
	PIXI.DisplayObjectContainer.call( this );

	var boardTexture = PIXI.Texture.fromImage("images/board.png");

	this.boardSprite = new PIXI.Sprite(boardTexture);

	this.addChild(this.boardSprite);

	this.timeSinceLastTetrominoMovedDown = 0;

	this.blockSize = 30;

	this.board = new Array(10);
  
  	for (var x = 0; x < 10; x++)
  	{
    	this.board[x] = new Array(20);

    	for (var y = 0; y < 20; y++)
    	{
    		this.board[x][y] = 0;
    	}
  	}

  	this.done = false;

  	this.addTetromino();
}

Board.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Board.prototype.constructor = Board;

Board.prototype.addTetromino = function()
{
	console.log("addTetromino ... ");

	var randomNumber = Math.floor((Math.random()*7));

	// randomNumber = 2;

	if (randomNumber == 0)
	{
		this.currentTetromino = new TTetromino();
	}
	else if(randomNumber == 1)
	{
		this.currentTetromino = new OTetromino();
	}
	else if(randomNumber == 2)
	{
		this.currentTetromino = new ITetromino();
	}
	else if(randomNumber == 3)
	{
		this.currentTetromino = new JTetromino();
	}
	else if(randomNumber == 4)
	{
		this.currentTetromino = new LTetromino();
	}
	else if(randomNumber == 5)
	{
		this.currentTetromino = new STetromino();
	}
	else //if(randomNumber == 6)
	{
		this.currentTetromino = new ZTetromino();
	}

	// this.currentTetromino = new JTetromino();

	this.currentTetromino.position.x = this.blockSize * 4;
	this.currentTetromino.position.y = 0;

	this.addChild(this.currentTetromino);
}

Board.prototype.rotate = function()
{
	this.currentTetromino.rotate();

	var currentTetrominoPosition = this.currentTetromino.position.x / this.blockSize;

	var rightMostPosition = currentTetrominoPosition + this.currentTetromino.rightMostBrickPosition();
	var leftMostPosition = currentTetrominoPosition + this.currentTetromino.leftMostBrickPosition();

	if (rightMostPosition > 9)
	{
		this.currentTetromino.position.x -= this.blockSize;
	}
	else if(leftMostPosition < 0)
	{
		this.currentTetromino.position.x += this.blockSize;
	}
}

Board.prototype.moveLeft = function()
{
	var currentXPosition = this.currentTetromino.position.x / this.blockSize;
	var currentYPosition = this.currentTetromino.position.y / this.blockSize;

	if (this.canMoveTo(currentXPosition - 1, currentYPosition))
	{
		this.currentTetromino.position.x -= this.blockSize;
	}
}

Board.prototype.moveRight = function(e)
{
	var currentXPosition = this.currentTetromino.position.x / this.blockSize;
	var currentYPosition = this.currentTetromino.position.y / this.blockSize;

	if (this.canMoveTo(currentXPosition + 1, currentYPosition))
	{
		this.currentTetromino.position.x += this.blockSize;
	}
}

Board.prototype.moveDown = function()
{
	this.timeSinceLastTetrominoMovedDown = 0;

	var currentXPosition = this.currentTetromino.position.x / this.blockSize;
	var currentYPosition = this.currentTetromino.position.y / this.blockSize;

	if (this.canMoveTo(currentXPosition, currentYPosition + 1))
	{
		this.currentTetromino.showMoreNegativeBlocks();

		this.currentTetromino.position.y += this.blockSize;
	}
	else
	{
		this.savePosition();
		this.addTetromino();
	}
}

Board.prototype.drop = function()
{
	var currentXPosition = this.currentTetromino.position.x / this.blockSize;
	var currentYPosition = this.currentTetromino.position.y / this.blockSize;

	var howFarDown = 0;

	while(this.canMoveTo(currentXPosition, currentYPosition + howFarDown))
	{
		howFarDown += 1
	}


	if (howFarDown < 2)
	{
		this.moveDown();
	}
	else
	{
		this.timeSinceLastTetrominoMovedDown = 0;

		// a bit too far down
		howFarDown -= 1;

		this.currentTetromino.showMoreNegativeBlocks();
		
		if (howFarDown > 1)
		{
			this.currentTetromino.showMoreNegativeBlocks();
		}

		this.currentTetromino.position.y += this.blockSize * howFarDown;

		this.savePosition();
		this.addTetromino();
	}
}

Board.prototype.canMoveTo = function(x, y)
{
	var currentTetrominoPositions = this.currentTetromino.currentPositions();

	for (var b = 0; b < currentTetrominoPositions.length;  b++)
	{
		var blockX = x+currentTetrominoPositions[b][0]
		var blockY = y+currentTetrominoPositions[b][1]

		// console.log(blockX + " - "+ blockY);

		if (blockY >= 0 && (
			blockX < 0 ||
			blockX > 9 ||
			blockY > 19 || 
			this.board[blockX][blockY] != 0))
		{
			return false;
		}
	}

	return true;
}

Board.prototype.savePosition = function()
{
	var currentXPosition = this.currentTetromino.position.x / this.blockSize;
	var currentYPosition = this.currentTetromino.position.y / this.blockSize;

	var currentTetrominoPositions = this.currentTetromino.currentPositions();

	for (var b = 0; b < currentTetrominoPositions.length;  b++)
	{
		var blockX = currentXPosition+currentTetrominoPositions[b][0]
		var blockY = currentYPosition+currentTetrominoPositions[b][1]

		if (blockY >= 0 && this.board[blockX][blockY] == 0)
		{
			this.board[blockX][blockY] = NORMAL_BLOCK;
		}
	}
}

Board.prototype.update = function(delta)
{
	this.timeSinceLastTetrominoMovedDown += delta;

	if (this.timeSinceLastTetrominoMovedDown > 1000)
	{
		this.moveDown();
	}
}