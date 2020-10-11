'use strict';

var gLastRes = null;

$(document).ready(onInit);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.btn-answ').click(OnCloseAnsw);

function onInit() {
  init();
}

function onStartGuessing() {
  $('.game-start').hide();
  renderQuest();
  $('.quest').show();
}

function renderQuest() {
  var $question = $('.quest h2');
  var currQuest = getCurrQuest();
  $question.text(currQuest.txt);
  
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.answ-popup').css({display: 'inline'});
      $('.btn-answ').text('Yes, I knew it!');
      // alert('Yes, I knew it!');
      // TODO: improve UX
    } else {
      $('.answ-popup').css({display: 'inline'});
      $('.btn-answ').text('I dont know...teach me!');
      // alert('I dont know...teach me!');
      $('.quest').hide();
      $('.new-quest').show();
    }
  } else {
    gLastRes = res;
    moveToNextQuest(gLastRes);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  console.log('newGuess', newGuess, 'newQuest', newQuest);
  addGuess(newQuest, newGuess, gLastRes);
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
}

function OnCloseAnsw() {
  $('.answ-popup').css({display: 'none'});
}
