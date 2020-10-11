'use strict';

var gIsGameOn = true;
var gNums;
var gCurrNum = 1;
var END;
var gTableSize;
var gNumsSize;
var gCurrNumber = document.querySelector('.gCurrNumber');
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;



function toggleGame() {//start or restart the game
    var elBtn = document.querySelector('.play-btn');
    elBtn.innerText = 'Restart';
    setInterval(countTime, 100);
    gCurrNum = 1;
    gCurrNumber.innerText = gCurrNum;
    init();
    if (gIsGameOn === false) {
        gCurrNum = 1;
        gCurrNumber.innerText = gCurrNum;
        init();
    }
    gIsGameOn = !gIsGameOn;
}


function init() {//create the table
    gNums = createArray(gNumsSize);
    renderTable(gTableSize);
}

function choseSize(tableSize) {
    var elSize = tableSize.innerText;
    console.log(elSize);
    switch (elSize) {
        case 'Easy':
            END = 17;
            gNumsSize = 16;
            gTableSize = 4;
            break;
        case 'Hard':
            END = 26;
            gNumsSize = 25;
            gTableSize = 5;
            break;
        case 'Extreme!':
            END = 37;
            gNumsSize = 36;
            gTableSize = 6;
            break;
    }
}


function cellClicked(clickedNum) {//If right – the button changes its color
    var elCell = clickedNum.innerText;
    if (+elCell === gCurrNum) {
        clickedNum.style.backgroundColor = 'green';
        gCurrNum++;
        gCurrNumber.innerText = gCurrNum;
    }
    if (gCurrNum === END) {
        checkVictory();
    }
}

function checkVictory() {
    alert('You win!');
    gCurrNum = 1;
    gCurrNumber.innerText = gCurrNum;

    init();

}




function createArray(gTabledSize) {//create gNums
    var table = [];
    for (var i = 1; i <= gTabledSize; i++) {
        table.push(i);
    }
    return table;
}


function mixedNums() {//take random num from gNums
    var randIdx = getRandomInt(0, gNums.length - 1);
    var splicedNum = gNums.splice(randIdx, 1);
    return splicedNum;
}


function renderTable(size) {//show table in HTML + get each cell's location
    var htmlStr = '';
    var elTable = document.querySelector('.container');
    for (var i = 0; i < size; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < size; j++) {
            var randNum = mixedNums();
            htmlStr += '<td onclick="cellClicked(this)">' + randNum + '</td>';
        }
        htmlStr += '</tr>';
    }
    elTable.innerHTML = htmlStr;
}


function getRandomInt(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min);
}

function countTime() {//count time
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {//count time
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
}


