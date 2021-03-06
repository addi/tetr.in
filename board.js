// //  Game classes

var NORMAL_BLOCK = 1;

var Board = function()
{
	PIXI.DisplayObjectContainer.call( this );

	var boardTexture = PIXI.Texture.fromImage("images/board.png");

	this.boardSprite = new PIXI.Sprite(boardTexture);

	this.addChild(this.boardSprite);

	this.blockSize = 30;

	this.boardWidth = 10
	this.boardHeight = 20

	// this.lastTetrominos = [1,5,6,1,5,6]
	this.lastTetrominos = [1,5,6]

	this.lines = new Array(this.boardHeight)

	for (var l = 0; l < this.boardHeight; l++)
	{
		this.lines[l] = new Array(this.boardWidth);

    	for (var b = 0; b < this.boardWidth; b++)
    	{
    		this.lines[l][b] = { "type": 0 };
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

	this.timeSinceLastTetrominoMovedDown = 0;

	var randomNumber

	do
	{
		randomNumber = Math.floor((Math.random()*7));

	} while(this.lastTetrominos.indexOf(randomNumber) > -1);

	this.lastTetrominos.push(randomNumber)

	if (this.lastTetrominos.length > 2)
	{
		// console.log(this.lastTetrominos)

		this.lastTetrominos = this.lastTetrominos.slice(-2);

		// console.log(this.lastTetrominos)
	};

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
	this.currentTetromino.position.y = this.blockSize;

	this.addChild(this.currentTetromino);
}

Board.prototype.rotateRight = function()
{
	var currentXPosition = this.currentTetromino.position.x / this.blockSize;
	var currentYPosition = this.currentTetromino.position.y / this.blockSize;

	this.currentTetromino.rotateRight();

	if (this.canMoveTo(currentXPosition, currentYPosition) == false)
	{
		var wallkicks = this.currentTetromino.currentWallKicks()

		var wallkickWorked = false

		for (var k = 0; k < wallkicks.length;  k++)
		{
			if (this.canMoveTo(currentXPosition + wallkicks[k][0], currentYPosition + wallkicks[k][1]))
			{
				this.currentTetromino.position.x += wallkicks[k][0] * this.blockSize;
				this.currentTetromino.position.y += wallkicks[k][1] * this.blockSize;

				wallkickWorked = true;

				break;
			}
		}

		if (wallkickWorked == false)
		{
			this.currentTetromino.rotateLeft();
		}
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
	var currentXPosition = this.currentTetromino.position.x / this.blockSize;
	var currentYPosition = this.currentTetromino.position.y / this.blockSize;

	if (this.canMoveTo(currentXPosition, currentYPosition + 1))
	{
		this.timeSinceLastTetrominoMovedDown = 0;

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

	while(this.canMoveTo(currentXPosition, currentYPosition + howFarDown + 1))
	{
		howFarDown += 1
	}

	

	this.currentTetromino.showMoreNegativeBlocks();
	
	this.currentTetromino.position.y += this.blockSize * howFarDown;

	this.savePosition();
	this.addTetromino();
}

Board.prototype.canMoveTo = function(x, y)
{
	var currentTetrominoPositions = this.currentTetromino.currentPositions();

	for (var b = 0; b < currentTetrominoPositions.length;  b++)
	{
		var blockX = x+currentTetrominoPositions[b][0]
		var blockY = y+currentTetrominoPositions[b][1]

		// console.log(blockX + " - "+ blockY);

		if ((
				blockX < 0 ||
				blockX > 9 ||
				blockY > 19
			) 
			||
			(
				blockY >= 0 && 
				this.lines[blockY][blockX]["type"] != 0
			))
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

	this.removeChild(this.currentTetromino);

	var blocks = []

	for (var b = 0; b < currentTetrominoPositions.length;  b++)
	{
		var blockX = currentXPosition+currentTetrominoPositions[b][0]
		var blockY = currentYPosition+currentTetrominoPositions[b][1]

		var blockSprite = this.currentTetromino.children[b]

		blockSprite.position.x = blockX * this.blockSize;
		blockSprite.position.y = blockY * this.blockSize;

		// shitmix, wtf is going on here? why cant i just add you as a child?!?
		blocks.push(blockSprite)

		// console.log(blockY+"-"+blockX)

		if (blockY >= 0 && this.lines[blockY][blockX]["type"] == 0)
		{
			this.lines[blockY][blockX]["type"] = NORMAL_BLOCK;

			this.lines[blockY][blockX]["sprite"] = blockSprite;
		}
	}

	for (var i = 0; i < blocks.length;  i++)
	{
		this.addChild(blocks[i])
	}

	this.checkLines()

	// this.debug();
}

Board.prototype.checkLines = function()
{
	var checkAgain = false

	for (var l = this.lines.length-1; l > 0;  l--)
	{
		var line = this.lines[l]

		if (this.isLineFull(line))
		{
			console.log("line is full!");

			this.removeLine(line)
			this.moveLinesDown(l)

			checkAgain = true
		}
	}

	if (checkAgain)
	{
		this.checkLines();
	}
}

Board.prototype.debug = function()
{
	var output = ""

	for (var l = 0; l < this.lines.length;  l++)
	{
		this.lines[l]

		for (var b = 0; b < this.lines[l].length;  b++)
		{
			output += this.lines[l][b]["type"];
		}	

		output += "\n"
	}

	console.log(output)
}

Board.prototype.moveLinesDown = function(lineIndex)
{
	var lineToPutOnTop = this.lines[lineIndex]

	for (var l = lineIndex; l > 0;  l--)
	{
		this.lines[l] = this.lines[l-1]

		this.moveDownLineSprites(this.lines[l])
	}

	this.lines[0] = lineToPutOnTop
}

Board.prototype.moveDownLineSprites = function(line)
{
	for (var b = 0; b < line.length;  b++)
	{
		if (line[b]["type"] != 0)
		{
			line[b]["sprite"].position.y += this.blockSize;
		}
	}
}

Board.prototype.isLineFull = function(line)
{
	for (var b = 0; b < line.length;  b++)
	{
		if (line[b]["type"] == 0)
		{
			return false
		}
	}

	return true
}

Board.prototype.removeLine = function(line)
{
	for (var b = 0; b < line.length;  b++)
	{
		this.removeChild(line[b]["sprite"])

		line[b]["type"] = 0

 		line[b]["sprite"] = null
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