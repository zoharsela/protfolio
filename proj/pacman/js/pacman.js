'use strict'
var PACMAN = '🏃';
var gIsSuper = false;

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        }
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    else if (nextCell === POWERFOOD && gIsSuper) {
        return;
    }
    else if (nextCell === POWERFOOD) {
        gIsSuper =  true;
        renderCell(gPacman.location, EMPTY);
        eatPowerFood();
        setTimeout(function(){gIsSuper = false; gCountTempEnters = 0;}, 5000);
       
        setTimeout(eatPowerFood, 5000);
    }
    else if (nextCell === GHOST && gIsSuper) {
        removeGhost(nextLocation);
        // gGhosts.pop();
    }
    else if (nextCell === FOOD) {
        updateScore(1);
        gTotalFood--;
        checkVictory();
    }
    else if (nextCell === CHERRY) {
        renderCell(gPacman.location, EMPTY)
        updateScore(10);
    }
    else if (nextCell === GHOST) {
        gameOver();
        renderCell(gPacman.location, EMPTY)
        return;
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);


}


function getNextLocation(eventKeyboard) {
    
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
        //    PACMAN.rotateY(180deg);
        // $(PACMAN).style.transform = 'rotate(180deg)';
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}
// function $(PACMAN) {return document.getElementById(PACMAN);} 
// function $(x) {return document.getElementById(x);} 
