//Things to do:
// - Move card API functions to separate js file for more versatility
// - Create classes for player, dealer, and maybe table

//Algorithm:
//Game Launches:
//Create Player, get name from intro page
//Get player $$ and assign
//Create player objects for all players on table
//Create dealer object
//Create table object
//Get new deck and shuffle.
//Deal cards to active players (Some cards should not be visible)
// - Local player objects will contain a "hand" array that stores cards
// - On client side, non-visible cards will be stored as UNK.
// - Create a pile using API for each active player + Dealer
//Draw cards on table using a draw function

//Logic:
//Player clicks "Hit me" => 
// - Give player a new card
// - Tally player score
//Player clicks "Stay" =>
// - Dealer does a smart algoritm
// - Draw/Stay
// - Tally dealer Score
// - Compare scores
// - Determine Winner
// - Distribute reward


//Will change these later...
const cardQuerySelector = document.querySelector(".playerCard");
const newCardQuerySelectorPlayer = document.querySelector(".newCardPlayer");
const cardDealerQuerySelector = document.querySelector(".cardDealer");
const newCardDealerQuerySelectorDealer = document.querySelector(".newCardDealer");


//Created classes for players, dealer and Table
const currentDealer = new Dealer("Dealer 1", "novice");
const currentTable = new GameTable("Blackjack", 1, "");
const currentPlayer = []
//Max players = 5 + Dealer (Player 0)
for (let i = 0; i < 6; i++) {
  currentPlayer[i] = new Player(`Player ${i}`, false);
}

let newCardPlayer = "";
let newCardDealer = "";

async function setTable(numPlayers, numDecks) {
  currentTable.deckId = await shuffleNewDeck(numDecks);
  currentTable.numPlayers = numPlayers;

  //Since dealer plays, Player 0 will be set as dealer
  currentPlayer[0].name = "Dealer";

  //Set all players to active and deal cards
  for (let i = 0; i <= currentTable.numPlayers; i++) {
    currentPlayer[i].isActive = true;
    await givePlayerCards(i, 2, currentTable.deckId);
  }
  
  //Start drawing procedures
  generatePlayerRows(currentTable.numPlayers);
  generateDealerRow();
  drawAllPlayerCards(3);
  drawDealerCards();
  
  //remove this later once all references to deckID are gone: 
  deckID = currentTable.deckId
  
}


//This Will extract a designated number of cards from the deck and add it to player's hand
async function givePlayerCards(playerIndex, numCards, deckId) {
  const extractedCards = await extractCards(numCards, deckId);
  const playerPile = [];
  
  if (!extractedCards) { return; }
  
  for (let card of extractedCards) {
    currentPlayer[playerIndex].hand.push(card);
    playerPile.push(card.code);
  }
  //Adds the drawn cards to a "Pile" Server side
  await addCardsToPile(playerPile, `Player${playerIndex}`, deckId);
}

function gameStart() {
  setTable(3, 1);
}


//Drawing begins here
function generatePlayerRows(numPlayers){
  const playerRow = document.getElementById("player-row")
  let insertText =""
  for (let i = 1; i < numPlayers + 1; i++){
    insertText += 
    `<div class="col mx-auto" id="playercard${i}">
     <h2>Player ${i}:</h2>
     </div>`
  }
  playerRow.innerHTML = insertText;
}
function generateDealerRow(){
  const playerRow = document.getElementById("dealer-row")
  let insertText =
    `<div class="col" id="dealercard">
    <h2>Dealer:</h2>
    </div>`

  playerRow.innerHTML = insertText;
}

//This function will fetch the card image from an object and draw it to the designated element with a given ID.
function drawCardImage(cardCode, targetId) {
  //Ensure targetId is not empty
  
  const drawTarget = document.getElementById(targetId)
  drawTarget.innerHTML="";
  for (let code of cardCode){
    drawTarget.innerHTML += `<img class="cardDealer img-fluid" src="${CARD_IMAGE_PATH}${code}.png" alt=""/>`;
  }

}
function drawAllPlayerCards(numPlayers){
  //Nested loop... bad practice... fix later (Tired ZZzzz...)
  const codeArray = [];
  for (let i = 1; i <= numPlayers; i++){
    codeArray[i]=[]  
    for (let card of currentPlayer[i].hand){
      codeArray[i].push(card.code);
    }
    drawCardImage(codeArray[i], `playercard${i}`);
  }
}

function drawDealerCards(){
  const codeArray = [];
  for (let card of currentPlayer[0].hand){
    codeArray.push(card.code);
  }
  drawCardImage(codeArray, `dealercard`);

}
//function gameStart() {
//console.log("You drew: " + myCards[0].code);
//   setTimeout(() => {
//     drawTwoCardsPlayer();
//   }, "1000");
//   setTimeout(() => {
//     drawCardDealerBackImage();
//   }, "1000");
//   setTimeout(() => {
//     drawOneCardFaceUpDealer();
//   }, "1000");
//   setTimeout(() => {
//     consoleLogHands();
//   }, "1000");
//}
//
//
//
//
//
//
//******************************************************************* */
//******************************************************************* */

//Player Hit... Edit later (Tired ZZzzz...)
async function hitMe(){
  await givePlayerCards(1, 1, currentTable.deckId)
  drawAllPlayerCards(3);

}

//********************************************************************************* */
//Everything below this line is not being used but will be integrated.
//********************************************************************************* */

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


async function drawOneCardPlayer() {
  const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
  const data = await res.json();
  for (let card of data.cards) {
    currentPlayerHand.push(card.value, card.suit);
    newCardPlayer += `<img class="cardDealer" src="${card.image}" alt="${card.value + " of " + card.suit}"'/>`;

  }

  newCardQuerySelectorPlayer.innerHTML = newCardPlayer;
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

function insuranceOption() {
  //TBD stretch goal? 
}
