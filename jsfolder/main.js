const CARD_IMAGE_PATH = "https://www.deckofcardsapi.com/static/img/";
const CARD_BACK_IMAGE = "back.png";
const NEW_DECK_API_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?count=';
const piles = 'https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S';



const cardQuerySelector = document.querySelector(".playerCard");
const newCardQuerySelectorPlayer = document.querySelector(".newCardPlayer");
const cardDealerQuerySelector = document.querySelector(".cardDealer");
const newCardDealerQuerySelectorDealer = document.querySelector(".newCardDealer");



let numDecks = 1;
let deckID;
let dealerScore;
let playerScore;
let currentPlayerHand = [];
let currentDealerHand = [];
let historyOfAllHands = {};
let playerBank = 10000;

let newCardPlayer = "";
let newCardDealer = "";

async function createCardDeckAndGetID() {
  const res = await fetch(NEW_DECK_API_URL + numDecks);
  const data = await res.json();
  deckID = data.deck_id;
}

async function drawTwoCardsPlayer() {
  const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=2');
  const data = await res.json();
  let newCard = "";
  for (let card of data.cards) {
    currentPlayerHand.push(card.value, card.suit);
    console.log("drawn card test ", card.image, card.value, card.suit);
    currentPlayerHand.push(card.value, card.suit);
    newCard += `<img class="cardPlayer" src="https://deckofcardsapi.com/static/img/6H.png" alt="${card.value + " of " + card.suit}"'/>`;
  }
  cardQuerySelector.innerHTML = newCard;
}

async function drawOneCardFaceUpDealer() {
  const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
  const data = await res.json();
  for (let card of data.cards) {
    currentDealerHand.push(card.value, card.suit);
    newCardDealer += `<img class="cardDealer" src="${card.image}" alt="${card.value + " of " + card.suit}"'/>`;
  }
  newCardDealerQuerySelectorDealer.innerHTML = newCardDealer;
};
async function drawCardDealerBackImage() {
  const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
  const data = await res.json();
  for (let card of data.cards) {
    currentDealerHand.push(card.value, card.suit);
    newCardDealer += `<img class="cardDealer" src="https://www.deckofcardsapi.com/static/img/back.png " alt="${card.value + " of " + card.suit}"'/>`;
  }
  newCardDealerQuerySelectorDealer.innerHTML = newCardDealer;
}

function drawCardImage(cardCode, targetId) {
  //This function will fetch the card image from an object and draw it to the designated element with a given ID.

  //Ensure targetId is not empty 
  if (targetId) { const drawTarget = document.getElementById(targetId) }


}
// async function drawOneCardDealer() {
//     const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
//     const data = await res.json();
//     newCardDealer = "";
//     for(let card of data.cards) {
//         newCardDealer += `<img class="cardDealer" src="https://www.deckofcardsapi.com/static/img/back.png " alt="${card.value + " of " + card.suit}"'/>`;
//         }
//         newCardQuerySelectorDealer.innerHTML = newCardDealer;
// }

async function drawOneCardPlayer() {
  const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
  const data = await res.json();
  for (let card of data.cards) {
    currentPlayerHand.push(card.value, card.suit);
    newCardPlayer += `<img class="cardDealer" src="${card.image}" alt="${card.value + " of " + card.suit}"'/>`;

  }

  newCardQuerySelectorPlayer.innerHTML = newCardPlayer;
}


function gameStart() {
  createCardDeckAndGetID();
  setTimeout(() => {
    drawTwoCardsPlayer();
  }, "1000");
  setTimeout(() => {
    drawCardDealerBackImage();
  }, "1000");
  setTimeout(() => {
    drawOneCardFaceUpDealer();
  }, "1000");
  setTimeout(() => {
    consoleLogHands();
  }, "1000");
}

function consoleLogHands() {

  for (i = 0; i < currentPlayerHand.length; i++) {
    console.log(currentPlayerHand[i] + "Player hand");
  }

  for (i = 0; i < currentDealerHand.length; i++) {
    console.log(currentDealerHand[i] + "Dealer hand");
  }

};

function openSettingtoStart() {
  document.querySelector(".navbar-setting").classList.toggle("start");
  document.querySelector(".setting").classList.toggle("menu");
}
function backToFirstPage() {
  document.querySelector(".navbar-setting").classList.toggle("start");
  document.querySelector(".setting").classList.toggle("menu");
}


//   newCardQuerySelectorPlayer.innerHTML = newCardPlayer;
// }


function gameStart() {
  createCardDeckAndGetID();
  setTimeout(() => {
    drawTwoCardsPlayer();
  }, "1000");
  setTimeout(() => {
    drawCardDealerBackImage();
  }, "1000");
  setTimeout(() => {
    drawOneCardFaceUpDealer();
  }, "1000");
  setTimeout(() => {
    consoleLogHands();
  }, "1000");
}

const mainGame = document.querySelector(".btn-circle.btn-xl.btn-circle");
  mainGame.addEventListener("click", function() {
  document.querySelector(".startMainGame").classList.toggle("hide");
  document.querySelector(".playerChoices").classList.toggle("show");
});

function playerStayOption(){}
    //calculate the total score of the player vs the dealer and update the DOM with scores accordingly
function consoleLogHands() {

  for (i = 0; i < currentPlayerHand.length; i++) {
    console.log(currentPlayerHand[i] + "Player hand");
  }

  for (i = 0; i < currentDealerHand.length; i++) {
    console.log(currentDealerHand[i] + "Dealer hand");
  }

};

function openSettingtoStart() {
  document.querySelector(".navbar-setting").classList.toggle("start");
  document.querySelector(".setting").classList.toggle("menu");
}
function backToFirstPage() {
  document.querySelector(".navbar-setting").classList.toggle("start");
  document.querySelector(".setting").classList.toggle("menu");
}

function playerStayOption() {
  //calculate the total score of the player vs the dealer and update the DOM with scores accordingly
}

function playerBetOption(amount) {
  if (playerBank <= amount) {
    alert("you need more money to bet");
  } else {
    playerBank -= amount;
  }


}




