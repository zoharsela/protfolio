'use strict';
const STORAGE_KEY = 'questDB';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function init(){
    createQuestsTree();
}

function createQuestsTree() {
    var qeustsTree = loadFromStorage(STORAGE_KEY);
    if (!qeustsTree) {
        qeustsTree = createQuest('Male?');
        qeustsTree.yes = createQuest('Gandhi?');
        qeustsTree.no = createQuest('Rita?');
    }
    gCurrQuest = qeustsTree;
    gPrevQuest = null;
    gQuestsTree = qeustsTree;
    saveQuestToStorage();
}


function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
    saveQuestToStorage();
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    var newQuests = createQuest(newQuestTxt);
    newQuests.yes = createQuest(newGuessTxt);
    newQuests.no = gCurrQuest;
    gPrevQuest[lastRes] = newQuests;
    gCurrQuest = gQuestsTree;
    saveQuestToStorage();
    console.log(gQuestsTree);
}

function getCurrQuest() {
    return gCurrQuest;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function saveQuestToStorage() {
    saveToStorage(STORAGE_KEY, gQuestsTree);
}
