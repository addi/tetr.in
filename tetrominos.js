//  Game classes

var Tetromino = function()
{
	this.rotationIndex = 0;

	this.blockSize = 30;

	this.positions = [];

	this.shouldShowNegativePositionBlocks = false;
}

Tetromino.prototype = new PIXI.DisplayObjectContainer();
Tetromino.prototype.constructor = Tetromino;

Tetromino.prototype.rotate = function()
{
	if (this.positions.length > 1)
	{
		this.rotationIndex = ++this.rotationIndex % this.positions.length;

		for (var b = 0; b < this.children.length;  b++)
		{
			var tmpBlock = this.children[b];

			tmpBlock.position.x = this.positions[this.rotationIndex][b][0]*this.blockSize;
			tmpBlock.position.y = this.positions[this.rotationIndex][b][1]*this.blockSize;

			if (this.shouldShowNegativePositionBlocks || this.positions[this.rotationIndex][b][1] >= 0)
			{
				tmpBlock.visible = true;
			}
			else if(this.positions[this.rotationIndex][b][1] < 0)
			{
				tmpBlock.visible = false;
			}
		}
	};
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

Tetromino.prototype.showAllBlocks = function(blockTexture)
{
	this.shouldShowNegativePositionBlocks = true;

	for (var b = 0; b < this.children.length;  b++)
	{
		this.children[b].visible = true;
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
	var blockTexture = PIXI.Texture.fromImage("images/blocks/purple.block.png");

	this.positions = 
	[ 
		[[0,0],[1,0],[2,0],[1,1]],
		[[1,-1],[0,0],[1,0],[1,1]],
		[[1,-1],[0,0],[1,0],[2,0]],
		[[1,-1],[1,0],[2,0],[1,1]]
	];

	this.addBlocks(blockTexture);
}

TTetromino.prototype = new Tetromino();
TTetromino.prototype.constructor = TTetromino;


// 	##
// 	##

var OTetromino = function()
{
	var blockTexture = PIXI.Texture.fromImage("images/blocks/yellow.block.png");

	this.positions = 
	[ 
		[[0,0],[1,0],[0,1],[1,1]],
	];

	this.addBlocks(blockTexture);
}

OTetromino.prototype = new Tetromino();
OTetromino.prototype.constructor = OTetromino;


// ####

var ITetromino = function()
{
	var blockTexture = PIXI.Texture.fromImage("images/blocks/light.blue.block.png");

	this.positions = 
	[ 
		[[-1,0],[0,0],[1,0],[2,0]],
		[[0,-2],[0,-1],[0,0],[0,1]]
	];

	this.addBlocks(blockTexture);
}

ITetromino.prototype = new Tetromino();
ITetromino.prototype.constructor = ITetromino;


//   #
//   #
//  ##

var JTetromino = function()
{
	var blockTexture = PIXI.Texture.fromImage("images/blocks/dark.blue.block.png");

	this.positions = 
	[
		[[0,0],[1,0],[2,0],[2,1]],
		[[1,-1],[1,0],[0,1],[1,1]],
		[[0,-1],[0,0],[1,0],[2,0]],
		[[1,-1],[2,-1],[1,0],[1,1]]
	];

	this.addBlocks(blockTexture);
}

JTetromino.prototype = new Tetromino();
JTetromino.prototype.constructor = JTetromino


//  #
//  #
//  ##

var LTetromino = function()
{
	var blockTexture = PIXI.Texture.fromImage("images/blocks/orange.block.png");

	this.positions = 
	[
		[[0,0],[1,0],[2,0],[0,1]],
		[[0,-1],[1,-1],[1,0],[1,1]],
		[[2,-1],[0,0],[1,0],[2,0]],
		[[1,-1],[1,0],[1,1],[2,1]]
	];

	this.addBlocks(blockTexture);
}

LTetromino.prototype = new Tetromino();
LTetromino.prototype.constructor = LTetromino


//   ##
//  ##

var STetromino = function()
{
	var blockTexture = PIXI.Texture.fromImage("images/blocks/green.block.png");

	this.positions = 
	[
		[[1,0],[2,0],[0,1],[1,1]],
		[[1,0],[1,1],[2,1],[2,2]],
		[[1,1],[2,1],[0,2],[1,2]],
		[[0,0],[0,1],[1,1],[1,2]]
	];

	this.addBlocks(blockTexture);
}

STetromino.prototype = new Tetromino();
STetromino.prototype.constructor = STetromino


//  ##
//   ##

var ZTetromino = function()
{
	var blockTexture = PIXI.Texture.fromImage("images/blocks/red.block.png");

	this.positions = 
	[
		[[0,0],[1,0],[1,1],[2,1]],
		[[2,0],[1,1],[2,1],[1,2]],
		[[0,1],[1,1],[1,2],[2,2]],
		[[1,0],[0,1],[1,1],[0,2]]
	];

	console.log(this.positions);

	this.addBlocks(blockTexture);
}

ZTetromino.prototype = new Tetromino();
ZTetromino.prototype.constructor = ZTetromino