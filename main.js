const backImageOfCard = "https://www.deckofcardsapi.com/static/img/back.png";
const NEW_DECK_API_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?count=1';
const cardQuerySelector = document.querySelector(".card");
const cardDealerQuerySelector = document.querySelector(".cardDealer");
const cardsLeftInDeckQuerySelector = document.querySelector(".cardsLeftInDeck");

let deckID;
let cardsRemainingInDeck;
let dealerScore;
let playerScore;


async function createCardDeckAndGetID () {
    const res = await fetch(NEW_DECK_API_URL);
    const data = await res.json();
    deckID = data.deck_id;
    console.log(deckID, data.remaining, data);
    console.log("deck id: ",deckID);
    drawCards();
}

async function drawCards() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=2');
    const data = await res.json();
    let newCard = "";
    for(let card of data.cards) {
    console.log("drawn card test ", card.image, card.value, card.suit);
    newCard += `<img class="card" src="${card.image}" alt="${card.value + " of " + card.suit}"'/>`;
    }
    cardQuerySelector.innerHTML = newCard;
}
async function drawCardsDealer(){
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=2');
    const data = await res.json();
    let newCardDealer = "";
    cardsRemainingInDeck = data.remaining;
    for(let card of data.cards) {
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
}
// this function isn't legal - so we can skip it

// async function checkCardsLeftInDeck() {
//     const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=2');
//     const data = await res.json();
//     cardsLeftInDeckQuerySelector =  `"There are "+ ${data.remaining} + " cards left in deck."`;
// }

function openSettingtoStart(){
    document.querySelector(".navbar-setting").classList.toggle("start");
    document.querySelector(".setting").classList.toggle("menu");
}
function backToFirstPage(){
    document.querySelector(".navbar-setting").classList.toggle("start");
    document.querySelector(".setting").classList.toggle("menu");

}


// dealerPlays(){

// //David would you like to work on this one? 
// //   const dealerHand = document.getElementById('dealerHand');
// }

async function checkCardsLeftInDeck () {
    console.log("There are the cards left in the deck: ", cardsRemainingInDeck);
}




