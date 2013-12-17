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