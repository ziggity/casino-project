const UNKNOWN_CARD = new Card("back",0,"NONE");

//Change the player label id's here
const PLAYER_SCORE_LABEL = [];
const PLAYER_MONEY_LABEL = [];
const PLAYER_NAME_LABEL = [];
const TABLE_LABEL = ['tableMoney'];
const GAME_STATUS_LABEL = ['gameStatus1']

for (i = 0; i < 6; i++){
    PLAYER_SCORE_LABEL[i] = `playerScore${i}`;
    PLAYER_MONEY_LABEL[i] = `playerMoney${i}`;
    PLAYER_NAME_LABEL[i] = `playerName${i}`;
}

//timer function
async function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time))
};   

function testOutThis(){
    console.log (currentTable.deckId);
    console.log("Dealer score: " + calculateScore(currentPlayer[0]));
    console.log("Player 1 score: " + calculateScore(currentPlayer[1]));
    console.log("Dealer Index:" + currentPlayer[0].playerNumber);
    console.log("Player 1 Index:" + currentPlayer[1].playerNumber)
}


//Fetch player cards from pile and place it in player object hand
//Then cycle through and hide cards that do not need to be revealed
//Call this fuction before a draw function
async function showOrHidePlayerCards(player = new Player, numToShow = 1){

    const playerHand = await getPileList(`Player${player.playerNumber}`,currentTable.deckId);
    player.hand = playerHand;
    if (player.hand.length === 0) return false;
    for (i = 0; i < player.hand.length; i++){
        if (i >= numToShow){
            player.hand[i] = UNKNOWN_CARD;
        }
    }
    return true;
  
}

//This function is called when player stays or busts
async function BlackjackDealerAI(autoLose = false) {
    const thisDealer = currentPlayer[0];
    await showOrHidePlayerCards (thisDealer, 22);
    thisDealer.score = calculateScore(thisDealer);
    currentPlayer[1].score = calculateScore(currentPlayer[1]);
    drawDealerCards();

    //If player busts or other auto loss conditon, declare dealer winner
    if (autoLose) {
        console.log("You went over... YOU LOSE");
        showMessage(`Player Bust...<br>You Lose<br><br>Your score: ${currentPlayer[1].score}<br>Dealer score: ${thisDealer.score}`)
        return;
    } 

    //THIS IS WHERE ALL OF THE DEALER LOGIC WILL GO...
    //-----------------------------------------------------
    while (thisDealer.score < currentPlayer[1].score){
        await sleep(500); //include a timer to slow down tasks
        await dealerHit();
        drawDealerCards();
        thisDealer.score = calculateScore(thisDealer);
    }
    //------------------------------------------------------
    let scoreText = `<br><br>Your score: ${currentPlayer[1].score}<br>Dealer score: ${thisDealer.score}`
    switch (true){
        case (thisDealer.score > 21):
            //Dealer goes over:
            showMessage(`You Win!!${scoreText}`);
            console.log ("Dealer went over... you win.");
            break;
        case (thisDealer.score > currentPlayer[1].score):
            //Dealer beats player:
            showMessage(`Dealer wins.${scoreText}`);
            console.log("Dealer wins.");
            break;
        case (thisDealer.score === currentPlayer[1].score):
            //It's a tie!!
            showMessage(`Push.${scoreText}`);
            console.log("Push");
            break;
        case (thisDealer.score < currentPlayer[1].score):
            //Player scores higher:
            showMessage(`You WIN!!${scoreText}`);
            console.log ("Player wins!");
    }
    console.log(`The dealer's score: ${thisDealer.score}`);
    console.log(`Your score: ${currentPlayer[1].score}`);
}

//Dealer takes a hit... (Not the 420 type)
async function dealerHit(){
    await givePlayerCards(0,1,currentTable.deckId,22)
}


function newDrawCard(cardImage, targetId) {
    //Ensure targetId is not empty
    try{
      const drawTarget = document.getElementById(targetId)
      const newCard = document.createElement("img");
      newCard.src=cardImage;

      drawTarget.appendChild(newCard);
      
    //   for (let code of cardCode){
    //     drawTarget.innerHTML += `
    //       <img class="playing-card-img cardDealer img-fluid" src="${CARD_IMAGE_PATH}${code}.png" alt="${code}"/>`;
    //   }
  
    }
    catch(e){
      console.log(`Error drawing card:\nTarget: ${targetId}\n\n ${e}`)
    }
  }

function updateLabels() {
    const scoreLabel = [];
    const moneyLabel = [];
    const nameLabel = [];

    for (i = 0; i < (currentTable.numPlayers + 1); i++) {
        scoreLabel[i] = document.getElementById(PLAYER_SCORE_LABEL[i]);
        moneyLabel[i] = document.getElementById(PLAYER_MONEY_LABEL[i]);
        nameLabel[i] = document.getElementById(PLAYER_NAME_LABEL[i]);

        scoreLabel[i].textContent = `Score: ${calculateScore(currentPlayer[i])}`
        moneyLabel[i].textContent = `$${currentPlayer[i].money}`
        nameLabel[i].textContent = `${currentPlayer[i].name}:`
    }
    document.getElementById(TABLE_LABEL[0]).textContent = `Pot: $${currentTable.moneyPot}`;
}

async function updateDisplay(doUpdate = true) {
    while (doUpdate) {
        updateLabels();
        await sleep(100);
    }
}