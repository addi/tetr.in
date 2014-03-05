//  Tetromino classes

var Tetromino = function()
{
	PIXI.DisplayObjectContainer.call( this );

	this.rotationIndex = 0;

	this.blockSize = 30;

	this.positions = [];

	this.wallKicks = 
	[ 
		[[-1,0],[-1,1],[0,-2],[-1,-2]],
		[[-1,0],[-1,-1],[0,2],[-1,2]],
		[[1,0],[1,1],[0,-2],[1,-2]],
		[[1,0],[1,-1],[0,2],[1,2]]
	];

	this.shouldShowNegativePositionBlocks = -1;
}

// Tetromino.prototype = new PIXI.DisplayObjectContainer();
Tetromino.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Tetromino.prototype.constructor = Tetromino;

Tetromino.prototype.rotateRight = function()
{
	if (this.positions.length > 1)
	{
		this.rotationIndex = ++this.rotationIndex % this.positions.length;

		this.setRotation();
	};
}

Tetromino.prototype.rotateLeft = function()
{
	if (this.positions.length > 1)
	{
		this.rotationIndex -= 1

		if (this.rotationIndex < 0)
		{
			this.rotationIndex += this.children.length
		}

		this.setRotation();
	}
}

Tetromino.prototype.setRotation = function()
{
	for (var b = 0; b < this.children.length;  b++)
	{
		var tmpBlock = this.children[b];

		tmpBlock.position.x = this.positions[this.rotationIndex][b][0]*this.blockSize;
		tmpBlock.position.y = this.positions[this.rotationIndex][b][1]*this.blockSize;

		tmpBlock.visible = (this.positions[this.rotationIndex][b][1] >= this.shouldShowNegativePositionBlocks)
	}
}

Tetromino.prototype.rotationPositions = function()
{
	var nextRotationIndex = (this.rotationIndex + 1) % this.positions.length;

	return this.positions[this.rotationIndex];
}

Tetromino.prototype.currentPositions = function()
{
	return this.positions[this.rotationIndex];
}

Tetromino.prototype.currentWallKicks = function()
{
	return this.wallKicks[this.rotationIndex];
}

Tetromino.prototype.addBlocks = function(blockTexture)
{
	for (var b = 0; b < this.positions[this.rotationIndex].length;  b++)
	{
		var tmpBlock = new PIXI.Sprite(blockTexture);

		tmpBlock.position.x = this.positions[this.rotationIndex][b][0]*this.blockSize;
		tmpBlock.position.y = this.positions[this.rotationIndex][b][1]*this.blockSize;

		this.addChild(tmpBlock);
	}
}

Tetromino.prototype.showMoreNegativeBlocks = function(blockTexture)
{
	this.shouldShowNegativePositionBlocks -= 1;

	for (var b = 0; b < this.children.length;  b++)
	{
		this.children[b].visible = (this.positions[this.rotationIndex][b][1] >= this.shouldShowNegativePositionBlocks)
	}
}

Tetromino.prototype.leftMostBrickPosition = function()
{
	var leftmost = 4;

	for (var b = 0; b < this.positions[this.rotationIndex].length;  b++)
	{
		leftmost = Math.min(leftmost, this.positions[this.rotationIndex][b][0]);
	}

	return leftmost;
}

Tetromino.prototype.rightMostBrickPosition = function()
{
	var rightmost = -4;

	for (var b = 0; b < this.positions[this.rotationIndex].length;  b++)
	{
		rightmost = Math.max(rightmost, this.positions[this.rotationIndex][b][0]);
	}

	return rightmost;
}

Tetromino.prototype.lowestBrickPosition = function()
{
	var lowest = -4;

	for (var b = 0; b < this.positions[this.rotationIndex].length;  b++)
	{
		lowest = Math.max(lowest, this.positions[this.rotationIndex][b][1]);
	}

	return lowest;
}

// 	###
// 	 # 

var TTetromino = function()
{
	Tetromino.call( this );

	var blockTexture = PIXI.Texture.fromImage("images/blocks/purple.block.png");

	this.positions = 
	[ 
		[[1,-1],[0,0],[1,0],[2,0]],
		[[1,-1],[1,0],[2,0],[1,1]],
		[[0,0],[1,0],[2,0],[1,1]],
		[[1,-1],[0,0],[1,0],[1,1]]
	];

	this.addBlocks(blockTexture);
}

TTetromino.prototype = Object.create(Tetromino.prototype);
TTetromino.prototype.constructor = TTetromino;


// 	##
// 	##

var OTetromino = function()
{
	Tetromino.call( this );

	var blockTexture = PIXI.Texture.fromImage("images/blocks/yellow.block.png");

	this.positions = 
	[ 
		[[0,-1],[1,-1],[0,0],[1,0]],
	];

	this.addBlocks(blockTexture);
}

// OTetromino.prototype = new Tetromino();
OTetromino.prototype = Object.create(Tetromino.prototype);
OTetromino.prototype.constructor = OTetromino;


// ####

var ITetromino = function()
{
	Tetromino.call( this );

	var blockTexture = PIXI.Texture.fromImage("images/blocks/light.blue.block.png");

	this.positions = 
	[ 
		[[-1,-1],[0,-1],[1,-1],[2,-1]],
		[[1,-2],[1,-1],[1,0],[1,1]],
		[[-1,0],[0,0],[1,0],[2,0]],
		[[0,-2],[0,-1],[0,0],[0,1]]
	];

	this.wallKicks = 
	[ 
		[[-2,0],[1, 0],[-2,1],[1,-2]],
		[[-1, 0],[2, 0],[-1,-2],[2,1]],
		[[2, 0],[-1, 0],[2,-1],[-1,2]],
		[[1, 0],[-2, 0],[1,-2],[-2,1]]
	];

	this.addBlocks(blockTexture);
}

ITetromino.prototype = Object.create(Tetromino.prototype);
ITetromino.prototype.constructor = ITetromino;


//   #
//   #
//  ##

var JTetromino = function()
{
	Tetromino.call( this );

	console.log("JTetromino children count: "+this.children.length);

	var blockTexture = PIXI.Texture.fromImage("images/blocks/dark.blue.block.png");

	this.positions = 
	[
		[[0,-1],[0,0],[1,0],[2,0]],
		[[1,-1],[2,-1],[1,0],[1,1]],
		[[0,0],[1,0],[2,0],[2,1]],
		[[1,-1],[1,0],[0,1],[1,1]]
	];

	this.addBlocks(blockTexture);
}

JTetromino.prototype = Object.create(Tetromino.prototype);
JTetromino.prototype.constructor = JTetromino


//  #
//  #
//  ##

var LTetromino = function()
{
	Tetromino.call( this );

	var blockTexture = PIXI.Texture.fromImage("images/blocks/orange.block.png");

	this.positions = 
	[
		[[2,-1],[0,0],[1,0],[2,0]],
		[[1,-1],[1,0],[1,1],[2,1]],
		[[0,0],[1,0],[2,0],[0,1]],
		[[0,-1],[1,-1],[1,0],[1,1]]
	];

	this.addBlocks(blockTexture);
}

LTetromino.prototype = Object.create(Tetromino.prototype);
LTetromino.prototype.constructor = LTetromino


//   ##
//  ##

var STetromino = function()
{
	Tetromino.call( this );

	var blockTexture = PIXI.Texture.fromImage("images/blocks/green.block.png");

	this.positions = 
	[
		[[1,-1],[2,-1],[0,0],[1,0]],
		[[1,-1],[1,0],[2,0],[2,1]],
		[[1,0],[2,0],[0,1],[1,1]],
		[[0,-1],[0,0],[1,0],[1,1]]
	];

	this.addBlocks(blockTexture);
}

STetromino.prototype = Object.create(Tetromino.prototype);
STetromino.prototype.constructor = STetromino


//  ##
//   ##

var ZTetromino = function()
{
	Tetromino.call( this );

	var blockTexture = PIXI.Texture.fromImage("images/blocks/red.block.png");

	this.positions = 
	[
		[[0,-1],[1,-1],[1,0],[2,0]],
		[[2,-1],[1,0],[2,0],[1,1]],
		[[0,0],[1,0],[1,1],[2,1]],
		[[1,-1],[0,0],[1,0],[0,1]]
	];

	this.addBlocks(blockTexture);
}

ZTetromino.prototype = Object.create(Tetromino.prototype);
ZTetromino.prototype.constructor = ZTetromino