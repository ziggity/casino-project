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
const currentTable = new GameTable("Blackjack", 1, "");
const currentPlayer = []
let deck__id;
//Max players = 5 + Dealer (Player 0)
currentPlayer[0] = new Dealer("Dealer 1", "novice");
for (let i = 1; i < 6; i++) {
  currentPlayer[i] = new Player(`Player ${i}`, false);
  Object.seal(currentPlayer[i]);//prevents mutation of object properties but allows value changes
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
    let numToShow = 1;
    currentPlayer[i].isActive = true;
    currentPlayer[i].playerNumber = i;
    if (i === 1) numToShow = 2;
    await givePlayerCards(i, 2, currentTable.deckId, numToShow);
  }
  
  currentPlayer[1].name = "THIS IS YOU!!"; //temporary
  //Start drawing procedures
  // generatePlayerRows(currentTable.numPlayers);
  // generateDealerRow();
  drawAllPlayerCards(currentTable.numPlayers);
  drawDealerCards();
  deckID = currentTable.deckId

  //remove this later once all references to deckID are gone: 
  
}


//This Will extract a designated number of cards from the deck and add it to player's hand
async function givePlayerCards(playerIndex, numCards, deckId, numToShow = 1) {
  const extractedCards = await extractCards(numCards, deckId);
  const playerPile = [];
  
  if (!extractedCards) { return; }
  
  //Pushes cards to player object and extracts card codes for API call
  for (let card of extractedCards) {
    //currentPlayer[playerIndex].hand.push(card);
    playerPile.push(card.code);
  }
  //Adds the drawn cards to a "Pile" Server side (API call)
  await addCardsToPile(playerPile, `Player${playerIndex}`, deckId);
  
  //Only Show relevant cards:
  await showOrHidePlayerCards(currentPlayer[playerIndex],numToShow);

 
  deck__id = currentTable.deckId;  //Purpose of this line??

}

function gameStart() {
  const numPlayers = 1; //not including dealer
  const numDecks = 1;

  setTable(numPlayers, numDecks);
  //console.log(playerBetOption(playerBank), playerPile.length);
  
}

//Logic Begins here


//Drawing begins here
function generatePlayerRows(numPlayers){
  const playerRow = document.getElementById("player-row")
  let insertText ="<h2>Players:</h2>"
  for (let i = 1; i < numPlayers + 1; i++){
    insertText += `
    <div class="col mx-auto">
      <div class="row">
        <div class="col">
          <h2 id="playertitle${i}">${currentPlayer[i].name}:</h2>
        </div>
      </div>
      <div class="row">
        <div class="col" id="playercard${i}">
        </div>
      </div>
    </div>`
  }
  playerRow.innerHTML = insertText;
}
function generateDealerRow(){
  const playerRow = document.getElementById("dealer-row")
  let insertText =`
    <div class="col-1">
      <h2>Dealer:</h2> 
    </div>
    <div class="col" id="dealercard">
    </div>`

  playerRow.innerHTML = insertText;
}

//This function will fetch the card image from an object and draw it to the designated element with a given ID.
function drawCardImage(cardCode, targetId) {
  //Ensure targetId is not empty
  try{
    const drawTarget = document.getElementById(targetId)
    drawTarget.innerHTML="";
    
    for (let code of cardCode){
      drawTarget.innerHTML += `
        <img class="playing-card-img cardDealer img-fluid" src="${CARD_IMAGE_PATH}${code}.png" alt="${code}"/>`;
    }

  }
  catch(e){
    console.log(`Error drawing card:\nTarget: ${targetId}\n\n ${e}`)
  }
}
function drawAllPlayerCards(numPlayers){
  //Better code for Big O' Notation
  for (let i = 1; i <= numPlayers; i++) {
    const playerHand = currentPlayer[i].hand.map(card => card.code);
    drawCardImage(playerHand, `player${i}`);
  }
}
function drawDealerCards(){
  // const codeArray = [];
  // for (let card of currentPlayer[0].hand){
  //   codeArray.push(card.code);
  // }
  const dealerHand = currentPlayer[0].hand.map(card => card.code);
  drawCardImage(dealerHand, `dealercard`);
}

//Player Hit...
async function hitMe(){
  await givePlayerCards(1, 1, currentTable.deckId,22);
  drawAllPlayerCards(currentTable.numPlayers);
  let yourScore = calculateScore(currentPlayer[1]);

  console.log(`Your score: ${yourScore}`);
  if (yourScore > 21) {
    alert ("LOSE");
    BlackjackDealerAI()
  }
}
