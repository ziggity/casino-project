const backImageOfCard = "https://www.deckofcardsapi.com/static/img/back.png";
const NEW_DECK_API_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?count=1';
let deckID;
let cardsRemainingInDeck;
let dealerScore;
let playerScore;

async function createCardDeckAndGetID () {
    const res = await fetch(NEW_DECK_API_URL);
    const data = await res.json();
    deckID = data.deck_id;
    console.log(deckID, data.remaining, data);
    drawCards();
}

async function drawCards() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=2');
    const data = await res.json();
    cardsRemainingInDeck = data.remaining;
    for(let i = 0 ; i <= 52; i++) {
    console.log("drawn card test ", data.cards[i]);
    }
}

async function drawOneCard() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
    const data = await res.json();
    cardsRemainingInDeck = data.remaining;
    for(let i = 0 ; i <= 52; i++) {
    console.log("drawn card test ", data.cards[i]);
    }
}



// dealerPlays(){

// //David would you like to work on this one? 
// //   const dealerHand = document.getElementById('dealerHand');
// }

async function checkCardsLeftInDeck () {
    console.log("There are the cards left in the deck: ", cardsRemainingInDeck);
}




