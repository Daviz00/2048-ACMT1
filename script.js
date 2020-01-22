var canvas = document.getElementById('canvas'); //initialise the canvas
var ctxt = canvas.getContext('2d');
var scoreLabel = document.getElementById('score'); //initialise the score lable
var score = 0; //default preset value of score
const size = 4; // size of matrice defined in line with the original game
const width = 94; // defined a fixed width for the matrice going by the formula === (canvas.width/size - 6) by adjusting for the width of borders
var cells = []; // defined the default conetent of a cell
var fontSize;
var loss = false; // initialsed a game end check
startGame(); // the game begines referencing the startGame() function

// expresses the values for x and y variable in the matrice
function cell(row, coll) {
	this.value = 0;
	this.x = coll * width + 5 * (coll + 1);
	this.y = row * width + 5 * (row + 1);
}

// create an empty or prefilled cell
function createCells() {
	var i, j;
	for (i = 0; i < size; i++) {
		cells[i] = [];
		for (j = 0; j < size; j++) {
			cells[i][j] = new cell(i, j);
		}
	}
}

// colour matches all the cases of number change inline with the original game colour codes
function drawCell(cell) {
	ctxt.beginPath();
	ctxt.rect(cell.x, cell.y, width, width);
	switch (cell.value) {
		case 0:
			ctxt.fillStyle = '#bbada0';
			break;
		case 2:
			ctxt.fillStyle = '#eee4da';
			break;
		case 4:
			ctxt.fillStyle = '#ede0c8';
			break;
		case 8:
			ctxt.fillStyle = '#f2b179';
			break;
		case 16:
			ctxt.fillStyle = '#f59563';
			break;
		case 32:
			ctxt.fillStyle = '#f67c5f';
			break;
		case 64:
			ctxt.fillStyle = '#f65e3b';
			break;
		case 128:
			ctxt.fillStyle = '#edcf72';
			break;
		case 256:
			ctxt.fillStyle = '#edcc61';
			break;
		case 512:
			ctxt.fillStyle = '#edc850';
			break;
		case 1024:
			ctxt.fillStyle = '#edc53f';
			break;
		case 2048:
			ctxt.fillStyle = '#edc22e';
			break;
		case 4096:
			ctxt.fillStyle = '#3c3a32';
			break;
		default:
			ctxt.fillStyle = '#f9f6f2';
	}
	// included to customize the style of text inside the cell
	ctxt.fill();
	if (cell.value) {
		fontSize = 47; // (canvas.width/2)
		ctxt.font = fontSize + 'px Arial';
		ctxt.fillStyle = 'rgb(36, 22, 8)';
		ctxt.textAlign = 'center';
		ctxt.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width / 7);
	}
}

//used for controlling the game using arrow keys
document.onkeydown = function(event) {
	if (!loss) {
		if (event.keyCode === 38) {
			moveUp();
		} else if (event.keyCode === 39) {
			moveRight();
		} else if (event.keyCode === 40) {
			moveDown();
		} else if (event.keyCode === 37) {
			moveLeft();
		}
		scoreLabel.innerHTML = 'Score : ' + score; // score handler
	}
};

// reference funtion defination
function startGame() {
	createCells();
	drawAllCells();
	pasteNewCell();
	pasteNewCell();
}

// used to indicate that the game is over
function finishGame() {
	canvas.style.opacity = '0.5';
	loss = true;
	alert(`Game Over!! Press F5 to start with a new game`); // a small alert instruction for the use after the game is over
}

// used for drawing the cells in the matrice by referencing another function
function drawAllCells() {
	var i, j;
	for (i = 0; i < size; i++) {
		for (j = 0; j < size; j++) {
			drawCell(cells[i][j]);
		}
	}
}

// checks with the stall-counter vaiable for availability of an empty cell and inputs its own data in the 2D Array
function pasteNewCell() {
	var countFree = 0;
	var i, j;
	for (i = 0; i < size; i++) {
		for (j = 0; j < size; j++) {
			if (!cells[i][j].value) {
				countFree++;
			}
		}
	}
	if (!countFree) {
		finishGame();
		return;
	}
	// inputs random numbers in the matrice row-wise and column-wise
	while (true) {
		var row = Math.floor(Math.random() * size);
		var coll = Math.floor(Math.random() * size);
		if (!cells[row][coll].value) {
			cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
			drawAllCells();
			return;
		}
	}
}

// algorithm to control the game if a right arrow key is pressed by referencing the original game
function moveRight() {
	var i, j;
	var coll;
	for (i = 0; i < size; i++) {
		for (j = size - 2; j >= 0; j--) {
			if (cells[i][j].value) {
				coll = j;
				while (coll + 1 < size) {
					if (!cells[i][coll + 1].value) {
						cells[i][coll + 1].value = cells[i][coll].value;
						cells[i][coll].value = 0;
						coll++;
					} else if (cells[i][coll].value == cells[i][coll + 1].value) {
						cells[i][coll + 1].value *= 2;
						score += cells[i][coll + 1].value;
						cells[i][coll].value = 0;
						break;
					} else {
						break;
					}
				}
			}
		}
	}
	pasteNewCell();
}

// algorithm to control the game if a left arrow key is pressed by referencing the original game
function moveLeft() {
	var i, j;
	var coll;
	for (i = 0; i < size; i++) {
		for (j = 1; j < size; j++) {
			if (cells[i][j].value) {
				coll = j;
				while (coll - 1 >= 0) {
					if (!cells[i][coll - 1].value) {
						cells[i][coll - 1].value = cells[i][coll].value;
						cells[i][coll].value = 0;
						coll--;
					} else if (cells[i][coll].value == cells[i][coll - 1].value) {
						cells[i][coll - 1].value *= 2;
						score += cells[i][coll - 1].value;
						cells[i][coll].value = 0;
						break;
					} else {
						break;
					}
				}
			}
		}
	}
	pasteNewCell();
}

// algorithm to control the game if an up arrow key is pressed by referencing the original game
function moveUp() {
	var i, j, row;
	for (j = 0; j < size; j++) {
		for (i = 1; i < size; i++) {
			if (cells[i][j].value) {
				row = i;
				while (row > 0) {
					if (!cells[row - 1][j].value) {
						cells[row - 1][j].value = cells[row][j].value;
						cells[row][j].value = 0;
						row--;
					} else if (cells[row][j].value == cells[row - 1][j].value) {
						cells[row - 1][j].value *= 2;
						score += cells[row - 1][j].value;
						cells[row][j].value = 0;
						break;
					} else {
						break;
					}
				}
			}
		}
	}
	pasteNewCell();
}

// algorithm to control the game if a down arrow key is pressed by referencing the original game
function moveDown() {
	var i, j, row;
	for (j = 0; j < size; j++) {
		for (i = size - 2; i >= 0; i--) {
			if (cells[i][j].value) {
				row = i;
				while (row + 1 < size) {
					if (!cells[row + 1][j].value) {
						cells[row + 1][j].value = cells[row][j].value;
						cells[row][j].value = 0;
						row++;
					} else if (cells[row][j].value == cells[row + 1][j].value) {
						cells[row + 1][j].value *= 2;
						score += cells[row + 1][j].value;
						cells[row][j].value = 0;
						break;
					} else {
						break;
					}
				}
			}
		}
	}
	pasteNewCell();
}
