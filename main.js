const backImageOfCard = "https://www.deckofcardsapi.com/static/img/back.png";
const NEW_DECK_API_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?count=1';
const cardQuerySelector = document.querySelector(".cardPlayer");
const cardDealerQuerySelector = document.querySelector(".cardDealer");
const cardsLeftInDeckQuerySelector = document.querySelector(".cardsLeftInDeck");

let deckID;
let cardsRemainingInDeck;
let dealerScore;
let playerScore;
let currentPlayerHand = [];
let currentDealerHand = [];
let historyOfHands = {};



async function createCardDeckAndGetID () {
    const res = await fetch(NEW_DECK_API_URL);
    const data = await res.json();
    deckID = data.deck_id;
    console.log(deckID, data.remaining);
    console.log("deck id: ", deckID);
}

async function drawCards() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=2');
    const data = await res.json();
    let newCard = "";
    for(let card of data.cards) {
    console.log("drawn card test ", card.image, card.value, card.suit);
    currentPlayerHand.push(card.value, card.suit);
    newCard += `<img class="cardPlayer" src="${card.image}" alt="${card.value + " of " + card.suit}"'/>`;
    }
    cardQuerySelector.innerHTML = newCard;
}
async function drawCardsDealer(){
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=2');
    const data = await res.json();
    let newCardDealer = "";
    cardsRemainingInDeck = data.remaining;
    for(let card of data.cards) {
    currentDealerHand.push(card.value, card.suit);

    console.log("drawn card test dealer: ", card.image, card.value, card.suit);
    newCardDealer += `<img class="cardDealer" src="${card.image}" alt="${card.value + " of " + card.suit}"'/>`;
    }
    cardDealerQuerySelector.innerHTML = newCardDealer;
};
async function drawOneCardDealer() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
    const data = await res.json();
    cardsRemainingInDeck = data.remaining;
    newCardDealer = "";
    for(let card of data.cards) {
        console.log("drawn card test dealer: ", card.image, card.value, card.suit);
        newCardDealer += `<img class="cardDealer" src="${card.image}" alt="${card.value + " of " + card.suit}"'/>`;
        }
        cardQuerySelector.innerHTML = newCardDealer;
        saveCurrentGamesToHistory();
}

async function drawOneCardPlayer() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
    const data = await res.json();
    cardsRemainingInDeck = data.remaining;
    newCardPlayer = "";
    for(let card of data.cards) {
        console.log("drawn card test dealer: ", card.image, card.value, card.suit);
        newCardPlayer += `<img class="cardDealer" src="${card.image}" alt="${card.value + " of " + card.suit}"'/>`;
        }
        cardQuerySelector.innerHTML = newCardPlayer;
        saveCurrentGamesToHistory();
}

function gameStart(){
    createCardDeckAndGetID();
    setTimeout(() => {
        drawCards();
      }, "1000");
      setTimeout(() => {
        drawCardsDealer();
      }, "1000");
      setTimeout(() => {
        saveCurrentGamesToHistory();
      }, "1000");
      console.log("current player hand: ", currentPlayerHand.toString()); 
      console.log("current dealer hand: ", currentDealerHand.toString());

}

function saveCurrentGamesToHistory(currentPlayerHand, currentDealerHand) {
    currentPlayerHand.forEach((k, i) => 
              { historyOfHands[k] = currentDealerHand[i] })
    return historyOfHands;
}


function openSettingtoStart(){
    document.querySelector(".navbar-setting").classList.toggle("start");
    document.querySelector(".setting").classList.toggle("menu");
}
function backToFirstPage(){
    document.querySelector(".navbar-setting").classList.toggle("start");
    document.querySelector(".setting").classList.toggle("menu");

}

    



  
  
  function checkCardsLeftInDeck(){
    console.log("There are the cards left in the deck: ", cardsRemainingInDeck);
  }


function playerStayOption(){
    //calculate the total score of the player vs the dealer and update the DOM with scores accordingly
}
function insuranceOption(){
    //TBD
}




// future funtions are here: 

//this will be a way to save cards to history object - but I'll move this to the bottom of page for now
    //   setTimeout(() => {
    //     if (currentPlayerHand.length>=1 && currentDealerHand.length>=1) {
    //         saveCurrentGamesToHistory();
    //         console.log("History of games", saveCurrentGamesToHistory().forEach(k => console.log(k)));
    //       }
    //   }, "1000");      

    // dealerPlays(){

// //David would you like to work on this one? 
// //   const dealerHand = document.getElementById('dealerHand');
// }
