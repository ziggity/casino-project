
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
  
  //clear the table to remove whitespace nodes
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
  
  //Before calling remaining fuctions, the table should be procedurally
  //adjusted if more than one player is intended.
  generatePlayerRows(numPlayers);

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
  
  currentPlayer[1].name = "This is you"; //temporary Player should set their name
  
  updateDisplay(); //This is asyncrounous and will keep running for the entire game.
  
}


//This Will extract a designated number of cards from the deck and add it to player's hand
async function givePlayerCards(playerIndex, numCards, deckId, numToShow = 1) {
  const extractedCards = await extractCards(numCards, deckId); //Calls the cards from the API
  const playerPile = [];
  const previousCardCount = currentPlayer[playerIndex].hand.length //Store how many cards the player had before

  if (!extractedCards) { return 0; } //Exit function if no cards drawn.
  
  //Pushes cards to player object and extracts card codes for API call
  for (let card of extractedCards) {
    //currentPlayer[playerIndex].hand.push(card);
    playerPile.push(card.code);
  }
  //Adds the drawn cards to a "Pile" Server side (API call)
  await addCardsToPile(playerPile, `Player${playerIndex}`, deckId);
  
  //Only Show relevant cards:
  //Will update the players hand arrays with blank cards for hidden values
  await showPlayerCards(currentPlayer[playerIndex],numToShow);

  //Do some simple math to figure out ow many cards to add to the board
  const numCardsToFlip = currentPlayer[playerIndex].hand.length - previousCardCount
  if (numCardsToFlip>0){
    for (let i = 0; i < numCardsToFlip; i++){
      //Draw cards by appending them to the parent node for that player
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
  let insertText =""
  for (let i = 1; i <= numPlayers; i++){
    insertText += `
    <!--Player ${i} -->
    <div class="col">

      <div class="row">
        <div class="col">
          <h3 class="player-table-label">Player ${i}</h3>
        </div>
      </div>

      <div class="row">
        <div class="col player-cards" id="player${i}">
          Player cards appear here
        </div>
      </div>

    </div>
    <!-- End of player block -->
`
  }
  playerRow.innerHTML = insertText;
  for (let i = 1; i <= numPlayers; i++){
    clearTable(i);
  }

  const playerTextEl = document.getElementById("playerblock");


  document.getElementById("playerscol").classList.remove("col");
  const colWidth = Math.floor((12 / (numPlayers+3)*numPlayers));
  document.getElementById("playerscol").classList.add(`col-${colWidth}`);
  insertText= ""
  for (let i = 1; i <= numPlayers; i++){
    insertText +=`
    <div class="col table-info-section">
      <div class="row">
        <div class="col text-center player-label" id="playerName${i}">Player ${i}:</div>
      </div>
      <div class="row text-nowrap">
        <div class="col-sm-6" id="playerScore${i}">Score: 0</div>
        <div class="col-sm-6 text-end" id="playerMoney${i}">$0 </div>
      </div>
    </div>
    `
  }
  playerTextEl.innerHTML=insertText;

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
  disableButtons();
  const numCardsToFlip = await givePlayerCards(1, 1, currentTable.deckId,22);
  //drawAllPlayerCards(currentTable.numPlayers);

  let yourScore = calculateScore(currentPlayer[1]);
  currentPlayer[1].score = yourScore;
  console.log(`Your score: ${yourScore}`);

  if (yourScore > MAX_SCORE) {
    //disableButtons()  //Add code to disable buttons here...
    await blackjackDealerAI(numCardsToFlip, true);
  }
  enableButtons();
}
