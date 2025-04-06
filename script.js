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

const scores = [0, 0];
let currentscore = 0;
let active = 0;
let playing = true;

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

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
      //
      // currentscore = 0;
      // document.getElementById(`current--${active}`).textContent = 0;
      // active = active === 0 ? 1 : 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');

      switchplayer();
    }
  }
});

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
  //resetting all the scores current, score;
  currentscore = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  //setting the state variable to true for playing
  playing = true;

  //resetting the score array to zeros;
  scores[0] = 0;
  scores[1] = 0;

  //removing winner player black color and setting active player white color
  document
    .querySelector(`.player--${active}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');

  //changing active player to 0
  active = 0;
});
