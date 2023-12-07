window.addEventListener("load", loadAssets);


//Execution starts HERE:
async function loadAssets() {
  
  adjustCardSize();
  loadSounds();


  showMessage(welcomeMessageHTML,beginInteraction,null,80);
  enableButtons() //Need a more precise way to control user clicks to stop breaking from click spamming
}
function beginInteraction(){
  //Start background music
  playSound("backgroundMusic",true,0,.3);
  playSound("backgroundNoise",true);
}


//This function is called when player stays or busts
async function blackjackDealerAI(data, autoLose = false) {
  disableButtons()

  const thisDealer = currentPlayer[0];
  await revealPlayerHand(0);
  thisDealer.score = calculateScore(thisDealer);
  currentPlayer[1].score = calculateScore(currentPlayer[1]);
  //drawDealerCards();

  //If player busts or other auto loss conditon, declare dealer winner
  let scoreText = `Your score: ${currentPlayer[1].score}<br>Dealer score: ${thisDealer.score}<br>Play again?<br>`

  if (autoLose) {
    await sleep(1000); //wait a sec
    showMessage(`${dealerWinsMessageHTML}${scoreText}`,
               playAgain ,reset,80,80,"YesNo");
    enableButtons();
    return;
  }

  //THIS IS WHERE ALL OF THE DEALER LOGIC WILL GO...
  //-----------------------------------------------------
  while (thisDealer.score < currentPlayer[1].score) {
    await sleep(500); //include a timer to slow down tasks
    await dealerHit();
    //drawDealerCards();
    thisDealer.score = calculateScore(thisDealer);
  }
  //------------------------------------------------------
  scoreText = `Your score: ${currentPlayer[1].score}<br>Dealer score: ${thisDealer.score}<br>Play again?<br>`
  await sleep(1000); //wait a sec
  switch (true) {
    case (thisDealer.score > DEFAULT_MAX_SCORE):
      //Dealer goes over:
      showMessage(`${dealerLossMessageHTML}${scoreText}`,
                playAgain ,reset,80,80,"YesNo");
      break;
    case (thisDealer.score > currentPlayer[1].score):
      //Dealer beats player:
      showMessage(`${dealerWinsMessageHTML}${scoreText}`,
                playAgain ,reset,80,80,"YesNo");
      break;
    case (thisDealer.score === currentPlayer[1].score):
      //It's a tie!!
      showMessage(`Push.${dealerPushMessageHTML}${scoreText}`,
                playAgain ,reset,80,80,"YesNo");
      break;
    case (thisDealer.score < currentPlayer[1].score):
      //Player scores higher:
      showMessage(`${dealerLossMessageHTML}${scoreText}`,
                playAgain ,reset,80,80,"YesNo");
  }
  enableButtons()
}
//Calculate the player score
function calculateScore(player = new Player) {
  const cards = player.hand;
  let score = 0;
  let numAces = 0;

  for (const card of cards) {
    const cardValue = card.value;

    if (cardValue === "KING" || cardValue === "QUEEN" || cardValue === "JACK") {
      score += 10;

    } else if (cardValue === "ACE") {
      numAces += 1;
      score += 11; // Assume 11 for now, can be adjusted later if needed
    } else {
      score += parseInt(cardValue);
    }
  }
  //If score is >21 for every Ace -10 (i.e. Ace = 1)
  while (numAces > 0 && score > 21) {
    score -= 10;
    numAces -= 1;
  }

  return score;
}

//Dealer takes a hit... (Not the 420 type)
async function dealerHit() {
  await givePlayerCards(0, 1, currentTable.deckId, 22)
}

//Disable buttons
function disableButtons() {
  startButton.removeEventListener("click", gameStart);
  // startButton.removeEventListener("click", showPlayerChoices); //Abbie.js

  hitButton.removeEventListener("click", hitMe);
  betButton.removeEventListener("click", playerPlacedBet);
  stayButton.removeEventListener("click", blackjackDealerAI);
  dealerHitButton.removeEventListener("click", testOutThis);
  resetButton.removeEventListener("click", reset);
  resetButton.removeEventListener("click", hidePlayerChoices); //Abie.js
  console.log("buttons disabled")
}

//Animate a new card that is gained 
async function drawNewCard(cardImage, targetId, animateIt = true) {
  //Ensure targetId is not empty
  try {
    const drawTarget = document.getElementById(targetId)
    const newCard = await loadImage(cardImage)
    
    if (animateIt) {
      newCard.setAttribute("class", `${DEFAULT_CARD_CLASS}  flip-over`);
    } else {
      newCard.setAttribute("class", DEFAULT_CARD_CLASS);
    }
    //console.log(newCard);
    drawTarget.appendChild(newCard);
    positionCard(targetId,drawTarget.childNodes.length-1);
    playSound("flipSound",false,.35);
  }
  catch (e) {
    console.log(`Error drawing card:\nTarget: ${targetId}\n\n ${e}`)
  }
}

//Enable buttons
function enableButtons() {
  startButton.addEventListener("click", gameStart);
  startButton.addEventListener("click", showPlayerChoices); //Abbie.js

  hitButton.addEventListener("click", hitMe);
  betButton.addEventListener("click", playerPlacedBet);
  stayButton.addEventListener("click", blackjackDealerAI);
  dealerHitButton.addEventListener("click", testOutThis);
  resetButton.addEventListener("click", reset);
  resetButton.addEventListener("click", hidePlayerChoices); //Abbie.js
  console.log("buttons enabled")
}

//Start the game
async function gameStart() {
  const numPlayers = 1; //not including dealer
  const numDecks = 1;

  //clear the table to remove whitespace nodes
  disableButtons();
  clearTable(0);
  clearTable(1);
  // await sleep(500);
  setTable(numPlayers, numDecks);
  enableButtons();

}

//Procedurally generate playing field
function generatePlayerRows(numPlayers) {
  const playerRow = document.getElementById("player-row")
  let insertText = ""
  for (let i = 1; i <= numPlayers; i++) {
    insertText += `
    <!--Player ${i} -->
    <div class="col">

      <div class="row">
        <div class="col">
          <h3 class="player-table-label" id="player${i}name">Player ${i}</h3>
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
  for (let i = 1; i <= numPlayers; i++) {
    clearTable(i);
  }

  const playerTextEl = document.getElementById("playerblock");

  document.getElementById("playerscol").classList.remove("col");
  const colWidth = Math.floor((12 / (numPlayers + 3) * numPlayers));
  document.getElementById("playerscol").classList.add(`col-${colWidth}`);
  insertText = ""
  for (let i = 1; i <= numPlayers; i++) {
    insertText += `
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
  playerTextEl.innerHTML = insertText;

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
  await showPlayerCards(currentPlayer[playerIndex], numToShow);

  //Do some simple math to figure out ow many cards to add to the board
  const numCardsToFlip = currentPlayer[playerIndex].hand.length - previousCardCount
  if (numCardsToFlip > 0) {
    for (let i = 0; i < numCardsToFlip; i++) {
      //Draw cards by appending them to the parent node for that player
      drawNewCard(currentPlayer[playerIndex].hand[previousCardCount + i].image, `player${playerIndex}`)
    }

  }
  return numCards;

}

//Hides the "Hit/Stay/Reset buttons" (sister to showPlayerChoices())
function hidePlayerChoices() {
  document.querySelector(".startMainGame").classList.toggle("hide");
  document.querySelector(".playerChoices").classList.toggle("show");
}

//Player Hit...
async function hitMe() {
  disableButtons();
  const numCardsToFlip = await givePlayerCards(1, 1, currentTable.deckId, 22);
  //drawAllPlayerCards(currentTable.numPlayers);

  let yourScore = calculateScore(currentPlayer[1]);
  currentPlayer[1].score = yourScore;
  console.log(`Your score: ${yourScore}`);

  if (yourScore > DEFAULT_MAX_SCORE) {
    //disableButtons()  //Add code to disable buttons here...
    await blackjackDealerAI(numCardsToFlip, true);
  }
  enableButtons();
}

//New Game
function playAgain() {

  //window.location.reload();
  disableButtons()
  shuffleCurrentDeck(currentTable.deckId,true);
  for (i = 0; i <= currentTable.numPlayers; i++){
    clearTable(i);
    currentPlayer[i].clearLocalHand();
    // currentPlayer[i].score = calculateScore(currentPlayer[i]);
  }
  setTable(currentTable.numPlayers,1,false);
  enableButtons();
}
//Place Bet
function playerPlacedBet(amount = 50, playerIndex = 1) {
  const betAmountPlayer1 = currentPlayer[playerIndex].placeBet(amount);
  playSound("chipsSound1",false,.35)
  currentTable.moneyPot += 50;
  return betAmountPlayer1;
}

//Redraws the cards and place a flip animation on a specific number of cards
async function redrawPlayerHand(playerIndex, numToAnimate = 0) {
  drawTarget = document.getElementById(`player${playerIndex}`)
  const animateIndex = currentPlayer[playerIndex].hand.length - numToAnimate

  while (drawTarget.firstChild) {
    drawTarget.removeChild(drawTarget.firstChild)
  }
  for (let i = 0; i < currentPlayer[playerIndex].hand.length; i++) {
    let animateIt = false;
    if (i >= animateIndex) animateIt = true;
    await drawNewCard(currentPlayer[playerIndex].hand[i].image, `player${playerIndex}`, animateIt);
  }
}

function reset(){
  showMessage("Goodbye!");
  sleep(2000);
  window.location.reload();
}

//Fetch all player cards from pile and place in hand face up
async function revealPlayerHand(playerIndex = 0) {
  const numToAnimate = await showPlayerCards(currentPlayer[playerIndex], 22);
  console.log(numToAnimate);
  await redrawPlayerHand(playerIndex, numToAnimate);
}


//Sets up the table for blackjack
async function setTable(numPlayers, numDecks, newDeck = true) {

  if (newDeck) {
    currentTable.deckId = await shuffleNewDeck(numDecks); //Get new deck
  } else{
    await shuffleCurrentDeck(currentTable.deckId);
  }
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
    if (i === 0) {
      await givePlayerCards(i, 2, currentTable.deckId, numToShow);  //deals 2 cards for each player
    } else {
      await givePlayerCards(i, 2, currentTable.deckId, numToShow);  //deals 2 cards for each player
    }
  }

  currentPlayer[1].name = "This is you"; //temporary Player should set their name

  updateDisplay(); //This is asyncrounous and will keep running for the entire game.

}

//Fetch player cards from pile and place it in player object hand
//Then cycle through and hide cards that do not need to be revealed
//Call this fuction before a draw function
async function showPlayerCards(player = new Player, numToShow = 1) {

  const playerHand = await getPileList(`Player${player.playerNumber}`, currentTable.deckId);

  if (playerHand.length === 0) {
    player.hand = playerHand;
    return false;
  }
  let cardDisplay = -1
  try { //When intializing player.hand will be null... this will catch it...I'm just lazy

    for (let i = 0; i < playerHand.length; i++) {
      if (cardDisplay === -1 && player.hand[i].value === 0) cardDisplay = i; //Tells us how many cards were shown before
      if (i >= numToShow) {
        player.hand[i] = UNKNOWN_CARD;
      } else {
        player.hand[i] = playerHand[i]
      }
    }
  } catch (e) {
    player.hand = playerHand
    for (let i = 0; i < playerHand.length; i++) {
      if (cardDisplay === -1 && player.hand[i].value === 0) cardDisplay = i; //Tells us how many cards were shown before
      if (i >= numToShow) {
        player.hand[i] = UNKNOWN_CARD;
      } else {
        player.hand[i] = playerHand[i]
      }
    }

  } finally {
    return cardDisplay;
  }

}

//Shows the "Hit/Stay/Reset buttons" (sister to hidePlayerChoices())
function showPlayerChoices() {
  document.querySelector(".startMainGame").classList.toggle("hide");
  document.querySelector(".playerChoices").classList.toggle("show");

}

//timer sleep function
async function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
};

//Just a function for testing
function testOutThis() {

  // redrawPlayerHand(0,5);
  // revealPlayerHand(1);
}

//Continuously calls updateLabels()
async function updateDisplay(doUpdate = true) {
  while (doUpdate) {
    updateLabels();
    await sleep(100);
  }
}

//Collect all player information and update DOM items
function updateLabels() {
  const scoreLabel = [];
  const moneyLabel = [];
  const nameLabel = [];

  for (let i = 0; i <= currentTable.numPlayers; i++) {
    scoreLabel[i] = document.getElementById(PLAYER_SCORE_LABEL[i]);
    moneyLabel[i] = document.getElementById(PLAYER_MONEY_LABEL[i]);
    nameLabel[i] = document.getElementById(PLAYER_NAME_LABEL[i]);

    scoreLabel[i].textContent = `Score: ${calculateScore(currentPlayer[i])}`
    moneyLabel[i].textContent = `$${currentPlayer[i].money}`
    nameLabel[i].textContent = `${currentPlayer[i].name}:`
  }
  document.getElementById(TABLE_LABEL[0]).textContent = `Pot: $${currentTable.moneyPot}`;
}

//Load any given image into the DOM and wait for response
async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  })
}

//Remove all card images from table, but does not clear players hands
function clearTable(playerIndex) {

  const drawTarget = document.getElementById(`player${playerIndex}`)
  while (drawTarget.firstChild) {
    drawTarget.removeChild(drawTarget.firstChild)
  }

}

