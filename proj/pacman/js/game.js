'use strict'
const WALL = '☣️';
const FOOD = '🍺';
const EMPTY = ' ';
const POWERFOOD = '😷';
const CHERRY = '🍒';

var gCountTempEnters = 0;
var gAddCherry;
var gSIZE = 10;
var gTotalFood = 56;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gGhosts = [];
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    gGame.score = 0;
    var elScore = document.querySelector('.score');
    elScore.innerText = 0;
    var elPlayAgain = document.querySelector('.playAgain');
    elPlayAgain.style.visibility = 'hidden';
    var elWon = document.querySelector('.won');
    elWon.style.visibility = 'hidden';
    gAddCherry = setInterval(addCherry, 15000);
    gTotalFood = 56;
}

function playAgain() {
    clearInterval(gAddCherry);
    init();
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gSIZE; i++) {
        board.push([]);
        for (var j = 0; j < gSIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === gSIZE - 1 ||
                j === 0 || j === gSIZE - 1 ||
                (j === 3 && i > 4 && i < gSIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && j === 1 || i === 1 && j === gSIZE - 2 ||
                i === gSIZE - 2 && j === 1 || i === gSIZE - 2 && j === gSIZE - 2) {
                board[i][j] = POWERFOOD;
            }
        }
    }
    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gAddCherry);
    var elPlayAgain = document.querySelector('.playAgain');
    elPlayAgain.style.visibility = 'visible';
}

function checkVictory() {
    if (gTotalFood === 0) {
        var elPlayAgain = document.querySelector('.playAgain');
        elPlayAgain.style.visibility = 'visible';
        var elWon = document.querySelector('.won');
        elWon.style.visibility = 'visible';
        gGame.isOn = false;
        console.log('winner');
        clearInterval(gIntervalGhosts);
    clearInterval(gAddCherry);
    }
}
function removeGhost(pos) {
    // if(gCountTempEnters === 0){
    //     var tempArrGhosts = [];
    //     tempArrGhosts = gGhosts.slice();
    //     gCountTempEnters++;
    // }
           var tempArrGhosts = [];
        tempArrGhosts = gGhosts.slice();
    for (var i = 0; i < tempArrGhosts.length; i++) {
        
        if (pos.i === tempArrGhosts[i].location.i) {
            tempArrGhosts.splice(tempArrGhosts[i].location, 1);
            renderCell(pos, EMPTY);
        }
    }
}

function eatPowerFood() {
    GHOST = '🎉';
    if (!gIsSuper) {
        GHOST = '🚓';
        return;
    }
}

function addCherry() {
    var pos = randEmptyCell();
    gBoard[pos.i][pos.j] = CHERRY;
    renderCell(pos, CHERRY);
}

function randEmptyCell() {
    var emptyPoses = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j];
            var pos = { i: i, j: j };
            if (cell === EMPTY) {
                emptyPoses.push(pos);
            }
        }
    }
    var randPos = emptyPoses[getRndInteger(0, emptyPoses.length - 1)];
    return randPos;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}