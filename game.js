//  Game code
var rendererWeight = 800;
var rendererHeight = 630;

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x000000);
	
// create a renderer instance

// var renderer = PIXI.CanvasRenderer(rendererWeight, rendererHeight);
var renderer = PIXI.autoDetectRenderer(rendererWeight, rendererHeight);
	
// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

var board = new Board();

board.position.x = 30;
board.position.y = 30;

stage.addChild(board);

var leftIsDown = false;
var timeSinceLastLeft = 0;

var rightIsDown = false;
var timeSinceLastRight = 0;

var downIsDown = false;
var timeSinceLastDown = 0;

function pressUp(e)
{
	board.rotate();
}

function leftDown(e)
{
	board.moveLeft();

	leftIsDown = true;
	timeSinceLastLeft = -170;
}

function leftUp(e)
{
	leftIsDown = false;
}

function rightDown(e)
{
	board.moveRight();

	rightIsDown = true;
	timeSinceLastRight = -170;
}

function rightUp(e)
{
	rightIsDown = false;
}

function downDown(e)
{
	board.moveDown();

	downIsDown = true;
	timeSinceLastDown = 0;
}

function downUp(e)
{
	downIsDown = false;
}

function pressSpace(e)
{
	board.drop();
}

kd.UP.press(pressUp);


kd.LEFT.press(leftDown);
kd.LEFT.up(leftUp);

kd.RIGHT.press(rightDown);
kd.RIGHT.up(rightUp);

kd.DOWN.press(downDown);
kd.DOWN.up(downUp);

kd.SPACE.press(pressSpace);

requestAnimFrame( gameloop );

var lastUpdateTime = 0;

function gameloop()
{
    requestAnimFrame( gameloop );

    kd.tick();

    var currentTime = Date.now();

    var deltaTime = currentTime - lastUpdateTime;

    lastUpdateTime = currentTime;

    board.update(deltaTime);

    if (leftIsDown)
    {
    	timeSinceLastLeft += deltaTime;

    	if (timeSinceLastLeft > 40)
    	{
    		timeSinceLastLeft %= 40;

    		board.moveLeft();
    	}
    }

    if (rightIsDown)
    {
    	timeSinceLastRight += deltaTime;

    	if (timeSinceLastRight > 40)
    	{
    		timeSinceLastRight %= 40;

    		board.moveRight();
    	}
    }

    if (downIsDown)
    {
    	timeSinceLastDown += deltaTime;

    	if (timeSinceLastDown > 100)
    	{
    		timeSinceLastDown %= 100;

    		board.moveDown();
    	}
    }

    renderer.render(stage);    
}