'use strict';

//starting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

//All the required startuing varaibles are required here
let scores, currentscore, active, playing;

// starting initializing funtioninit() function
const init = function () {
  scores = [0, 0];
  currentscore = 0;
  playing = true;
  playing = true;
  active = 0;
  diceEl.classList.add('hidden');

  currentscore = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
};

init();

const switchplayer = function () {
  currentscore = 0;
  document.getElementById(`current--${active}`).textContent = 0;
  active = active === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rooling dice functionality
btnroll.addEventListener('click', function () {
  if (playing) {
    //Generating random Number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display Diced
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check rolled
    if (dice != 1) {
      //add dice to current score
      currentscore += dice;
      document.getElementById(`current--${active}`).textContent = currentscore;
    } else {
      switchplayer();
    }
  }
});

//hold functionality
btnhold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active players score
    scores[active] += currentscore;
    document.getElementById(`score--${active}`).textContent = scores[active];

    //2.check if player's score >= 100
    if (scores[active] >= 20) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchplayer();
    }
  }
});

btnnew.addEventListener('click', function () {
  init();
});
