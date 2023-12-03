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
// - Dealer does a smart algorithm
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


//Execution starts HERE:
async function gameStart() {
  const numPlayers = 1; //not including dealer
  const numDecks = 1;
  
  clearTable(0);
  clearTable(1);
  // await sleep(500);
  setTable(numPlayers, numDecks);
  
}

//Sets up the table for blackjack
async function setTable(numPlayers, numDecks) {
  
  currentTable.deckId = await shuffleNewDeck(numDecks); //Get new deck
  currentTable.numPlayers = numPlayers; // Set the number of players

  //Since dealer plays, Player 0 will always be set as dealer
  currentPlayer[0].name = "Dealer";

  //Set all players to active and deal cards
  for (let i = 0; i <= currentTable.numPlayers; i++) {
    currentPlayer[i].isActive = true;   
    currentPlayer[i].playerNumber = i;  //We save the player index locally to the object
    let numToShow = 1;    // This variable sets how many cards go face up for each player
    if (i === 1) numToShow = 5;   //If the player is Player #1 all cards will be face up.
    if (i > 1) numToShow = 0;
    if (i===0){
      await givePlayerCards(i, 2, currentTable.deckId, numToShow);  //deals 2 cards for each player
    }else{
      await givePlayerCards(i, 2, currentTable.deckId, numToShow);  //deals 2 cards for each player
    }
  }
  
  currentPlayer[1].name = "THIS IS YOU!!"; //temporary Player should set their name
  
  //Start drawing procedures (Table can be procedurally generated or static...)
  // generatePlayerRows(currentTable.numPlayers); 
  // generateDealerRow();

  //Draw cards
  updateDisplay();
  //drawAllPlayerCards(currentTable.numPlayers);
  //drawDealerCards();
  
}


//This Will extract a designated number of cards from the deck and add it to player's hand
async function givePlayerCards(playerIndex, numCards, deckId, numToShow = 1) {
  const extractedCards = await extractCards(numCards, deckId);
  const playerPile = [];
  const previousCardCount = currentPlayer[playerIndex].hand.length

  if (!extractedCards) { return 0; }
  
  //Pushes cards to player object and extracts card codes for API call
  for (let card of extractedCards) {
    //currentPlayer[playerIndex].hand.push(card);
    playerPile.push(card.code);
  }
  //Adds the drawn cards to a "Pile" Server side (API call)
  await addCardsToPile(playerPile, `Player${playerIndex}`, deckId);
  
  //Only Show relevant cards:
  //The function returns a value of how many cards to animate flipping over
  await showPlayerCards(currentPlayer[playerIndex],numToShow);
  const numCardsToFlip = currentPlayer[playerIndex].hand.length - previousCardCount
  if (numCardsToFlip>0){
    for (i = 0; i < numCardsToFlip; i++){
      drawNewCard(currentPlayer[playerIndex].hand[previousCardCount+i].image,`player${playerIndex}`)
    }

  }
  return numCards; 
 
}

//Drawing Functions begins here:
//---------------------------------

//Procedurally generate playing field
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
//This code is not optimal. Image path can be fetched directly from object instead.
//Return to fix later
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

//Draws cards for number of specified players
//This makes several calls to the drawCardImage function. Actual drawing occurs there.
function drawAllPlayerCards(numPlayers){
  //Better code for Big O' Notation
  for (let i = 1; i <= numPlayers; i++) {
    const playerHand = currentPlayer[i].hand.map(card => card.code);
    drawCardImage(playerHand, `player${i}`);
  }
}
//Draws the dealer cards
//Same as above but for dealer.
function drawDealerCards(){
  const dealerHand = currentPlayer[0].hand.map(card => card.code);
  drawCardImage(dealerHand, `dealercard`);
}


//Player Hit...
async function hitMe(){
  const numCardsToFlip = await givePlayerCards(1, 1, currentTable.deckId,22);
  //drawAllPlayerCards(currentTable.numPlayers);

  let yourScore = calculateScore(currentPlayer[1]);
  currentPlayer[1].score = yourScore;
  console.log(`Your score: ${yourScore}`);

  if (yourScore > MAX_SCORE) {
    //disableButtons()  //Add code to disable buttons here...
    await BlackjackDealerAI(true);
  }
}
