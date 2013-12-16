//  Game classes

var Tetromino = function()
{
	self.rotation = 0;
}

Tetromino.prototype = new PIXI.DisplayObjectContainer();
Tetromino.prototype.constructor = Tetromino;

Tetromino.prototype.rotate = function()
{
	console.log("Not rotateing");
}

var TTetromino = function()
{
	var blockTexture = PIXI.Texture.fromImage("blocks/purple.block.png");

	this.blockSprite1 = new PIXI.Sprite(blockTexture);
	this.blockSprite1.position.x = 30;

	this.blockSprite2 = new PIXI.Sprite(blockTexture);
	this.blockSprite2.position.y = 30;

	this.blockSprite3 = new PIXI.Sprite(blockTexture);
	this.blockSprite3.position.x = 30;
	this.blockSprite3.position.y = 30;

	this.blockSprite4 = new PIXI.Sprite(blockTexture);
	this.blockSprite4.position.x = 60;
	this.blockSprite4.position.y = 30;

	this.addChild(this.blockSprite1);
	this.addChild(this.blockSprite2);
	this.addChild(this.blockSprite3);
	this.addChild(this.blockSprite4);
}

TTetromino.prototype = new Tetromino();
TTetromino.prototype.constructor = TTetromino;

TTetromino.prototype.rotate = function()
{
	console.log("rotate");
	console.log(self.rotation);

	if (self.rotation == 0)
	{
		this.blockSprite1.position.x = 30;
		this.blockSprite1.position.y = 0;

		this.blockSprite2.position.x = 30;
		this.blockSprite2.position.y = 60;

		this.blockSprite3.position.x = 30;
		this.blockSprite3.position.y = 30;

		this.blockSprite4.position.x = 60;
		this.blockSprite4.position.y = 30;

		self.rotation = 1;
	}
	else if(self.rotation == 1)
	{
		this.blockSprite1.position.x = 0;
		this.blockSprite1.position.y = 30;

		this.blockSprite2.position.x = 30;
		this.blockSprite2.position.y = 60;

		this.blockSprite3.position.x = 30;
		this.blockSprite3.position.y = 30;

		this.blockSprite4.position.x = 60;
		this.blockSprite4.position.y = 30;

		self.rotation = 2;
	}
	else if(self.rotation == 2)
	{
		this.blockSprite1.position.x = 0;
		this.blockSprite1.position.y = 30;

		this.blockSprite2.position.x = 30;
		this.blockSprite2.position.y = 60;

		this.blockSprite3.position.x = 30;
		this.blockSprite3.position.y = 30;

		this.blockSprite4.position.x = 30;
		this.blockSprite4.position.y = 00;


		self.rotation = 3;
	}
	else if(self.rotation == 3)
	{
		this.blockSprite1.position.x = 30;
		this.blockSprite1.position.y = 0;

		this.blockSprite2.position.x = 0;
		this.blockSprite2.position.y = 30;

		this.blockSprite3.position.x = 30;
		this.blockSprite3.position.y = 30;

		this.blockSprite4.position.x = 60;
		this.blockSprite4.position.y = 30;

		self.rotation = 0;
	}
}