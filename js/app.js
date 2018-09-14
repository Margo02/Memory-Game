/*types of cards to be matched, 8 in all.*/
let cardsSymbols = [
		"fa fa-diamond",
		"fa fa-paper-plane-o",
		"fa fa-anchor",
		"fa fa-bolt",
		"fa fa-cube",
		"fa fa-leaf",
		"fa fa-bicycle",
		"fa fa-bomb"
];
/*18 cards in  the deck*/
let allCards = [... cardsSymbols, ... cardsSymbols];
const countCards = allCards.length;
let matched = 0;
const allMatched = 8;
let deck = document.getElementById('deck-cards');

/*create the DocumentFragment append elements to it,
adding that to the DOM.*/
var fragment = document.createDocumentFragment();
let card = document.getElementsByClassName('card');

let matchedCard = document.getElementsByClassName('match');
const openCards = [];

/*moves*/
let moves = 0;
let counterMoves = document.querySelector('.moves');

/*counts clics*/
let counter = 0;

/* Stars */
let stars = document.getElementsByClassName('stars').item(0);
let starsCounter = 3;

/*timer*/
let seconds = 0;
let minutes = 0;
let clockOff = true;
let gameTimer;
const timer = document.querySelector('.timer');

/* congratulations popup */
let el = document.getElementById('overlay');

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

/*@description Loads memory game , suffle cards */
init();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

/* @description Starts the game */
function init() {
  deck.innerHTML="";
  allCards =  shuffle(allCards);
   for (var i =0; i < countCards; i++){
     var li = document.createElement('li');
     li.className="card";
     li.innerHTML='<i class="' + allCards[i] + '"</i>';
     fragment.appendChild(li);
  }

  deck.appendChild(fragment);
  moves = 0;
  counterMoves.innerHTML = moves;
  /* resets timer to 0 & display timer */
  second = 0;
  minute = 0;
  timer.innerHTML = "0 mins 0 secs";
}

const newDeck = deck;
let clickTarget = 0;
newDeck.addEventListener("click", function( event ) {
  clickTarget = event.target;
   if (clickTarget.classList.contains('card') && openCards.length < 2){
     counter ++;
      if(clockOff){
       startTimer();
       clockOff = false;
      }
      /* open a card, show a symbol */
      showCard(clickTarget);

      /* stored two cards in an array */
      addCards(clickTarget);

     /*check if in deck more than one card */
     if(openCards.length === 2){
       checkIfMatch();
     }
  }
  /*check if even number - increment move counter*/
  if (clickTarget.classList.contains('card') && is_even(counter) == true){
    console.log("even numner");
    moves++;
    counterMoves.innerHTML = moves;
  }

  /* check star's ratings */
  if (clickTarget.classList.contains('card')){
   starsRating(counter);
   console.log(clickTarget);
  }
}, false);

/* @description Show card's symbols */

function showCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}

/* @description Create deck with cards face up */

function addCards(card){
 openCards.push(card);
}

/* check if counter is even */

var is_even = function(counter) {
  return !(counter % 2);
}

/* @description Star ratings , check number of moves,
3 stars = 9 moves or less
2 stars = 10 moves to 19 moves
1 star = 20 moves to 29 moves
0 stars = 30 and more */

function starsRating(numberClics) {

 switch (numberClics) {
  case 20:
    //moves 10
    for (let i = 0; i < 3; i++){
    stars.removeChild(stars.childNodes[0]);
    starsCounter = 2;
    console.log(starsCounter);
    }
   break;
  case 40:
      // moves 20
      stars.removeChild(stars.childNodes[0]);
      starsCounter = 1;
      console.log(starsCounter);
   break;
  case 60:
    // moves 30
    for (let i = 0; i < 3; i++){
      stars.removeChild(stars.childNodes[0]);
      starsCounter = 0;
      console.log(starsCounter);
    }
    break;
  default:
    console.log("Do not know stars ratings");
   break;
 }

}

/*@description Check if two cards have been matched */

function checkIfMatch() {

 if (openCards[0].firstChild.getAttribute('class') == openCards[1].firstChild.getAttribute('class')){
   console.log("matched");
   openCards[0].setAttribute("class" , "card match disabled");
   openCards[1].setAttribute("class" , "card match disabled");
   matched++;
   console.log("matched " + matched);
   /*clear the existing array of openCards by setting its length to 0*/
   openCards.length = 0;
    if (matched === allMatched){
     gameOver();
     console.log("Game Over");
    }
  return true;
 }else {
   console.log('no matched');
   disable();
   setTimeout(function(){
     openCards[0].setAttribute("class" , "card");
     openCards[1].setAttribute("class" , "card");
     openCards.length = 0;
     enable();
   }, 1000);
  return false;
 }
console.log(openCards);
}

/* @description disable cards*/
function disable() {
 for (i=0; i < card.length; i++){
  card[i].classList.add("disabled");
 }
}

/*@description enable cards*/
function enable() {
 for (i=0; i < card.length; i++){
   card[i].classList.remove("disabled");
 }

 for(var i = 0; i < matchedCard.length; i++){
   matchedCard[i].classList.add("disabled");
 }
}

/*Timer function refrances from
https://www.codeseek.co/chrisvneal/basic-timer-erXJGZ */

/* @description Insert time in timer output */
function insertTime() {
seconds++;

 if (seconds < 10) {
  seconds = `0${seconds}`;
 }

 if (seconds >= 60) {
  minutes++;
  seconds = "00";
 }
 /* output */
 timer.innerHTML = minutes + " mins " + ":" + seconds + " secs";
}

function startTimer() {
 gameTimer = setInterval(() => {insertTime()}, 1000);
}

/* @description Stop timer */

function stopTimer() {
  window.clearInterval(gameTimer);
}

/* @description Stop timer and reset it to 0 */

function resetTimer() {
 stopTimer();
 clockOff = true;
 minutes = 0;
 seconds = 0;
 timer.innerHTML = "0 mins 0 secs";
}

/* @description Reset the Game : sets timer to 0, sets stars to 3, clear cache
load a new deck of cards.
*/

function restartGame() {
 resetTimer();
 resetStars();
 clearDeck();
 init();
}

document.querySelector('.restart').addEventListener('click', restartGame);

/* @description Set moves to 0 */

function resetMoves() {
 moves = 0;
 counterMoves.innerHTML = moves;
}

/* @description  Star ratings - resets to 3 stars */

function resetStars(){
 const starsClassName = "fa fa-star";
 let listItems = document.querySelector('.stars');
 let countStars = document.getElementsByClassName(starsClassName);

  if ( starsCounter === 2 && countStars.length === 2 ) {
   let li = document.createElement('li');
   li.appendChild.innerHTML = '<i class="' + starsClassName + '"</i>';
   li.innerHTML = '<i class="fa fa-star"></i>';
   listItems.appendChild(li)
   console.log("restart stars" + moves + listItems.length);
  }

 if ( starsCounter === 1 && countStars.length === 1 ) {
   for (i =0; 2 > i; i++){
    let li = document.createElement('li');
    li.appendChild.innerHTML = '<i class="' + starsClassName + '"</i>';
    li.innerHTML = '<i class="fa fa-star"></i>';
    listItems.appendChild(li)
    console.log("restart stars" + moves);
   }
  }

 if ( starsCounter === 0 && countStars.length === 0) {
  for (i =0; 3 > i; i++){
    let li = document.createElement('li');
    li.appendChild.innerHTML = '<i class="' + starsClassName + '"</i>';
    li.innerHTML = '<i class="fa fa-star"></i>';
    listItems.appendChild(li)
    console.log("restart stars" + moves);
  }
 }
}//end resetStars

/* @description All cards matched, end of the game */

function gameOver() {
 stopClock();
 modal_stars();
 modal_moves();
 overlay();
}

/*@description Stop timer, output the final time in the congratulations
message */

function stopClock() {
 let timeStat = document.querySelector('.modal_time');
 let finalTime = 0;
 stopTimer();
 finalTime = 'Time = ' + minutes + ':' + seconds;
 timeStat.innerHTML = finalTime;
}

/* @description Output number of moves  */

function modal_moves() {
 let moveStat = document.querySelector('.modal_moves');
 let modalMoves = counter/2;
 moveStat.innerHTML = 'Moves = ' +  modalMoves;
 console.log("modalMoves"+ moves);
}

/* @description Output stars. The star's reating deppends on the number of
moves. */

function modal_stars() {
 let starsStat = document.querySelector('.modal_stars');
 let countStars = document.getElementsByClassName('fa fa-star');
 let finalStars = countStars.length;
 let icon = '<i class="fa fa-star"></i>';
 console.log("final stars" + finalStars);
  if (finalStars === 3) {
   starsStat.innerHTML = icon.repeat(3);
  } else if ( finalStars === 2){
   starsStat.innerHTML = icon.repeat(2);
 } else if ( finalStars === 1){
   starsStat.innerHTML = icon.repeat(1);
 } else {
   starsStat.innerHTML = 'Stars = 0';
  }
}

/* @description Show the congratulations message*/

function overlay() {
 el.style.visibility = "visible";
}

/* @description Close the congratulations message, resets timer, moves & stars.
Re-shuffles deck */

function cancel_modal() {
 el.style.visibility = "hidden";
 resetTimer();
 resetStars();
 clearDeck();
 init();
}

/* @description Clear cache */

function clearDeck() {
 window.location.reload();
}
