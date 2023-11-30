const UNKNOWN_CARD = new Card("back",0,"NONE");
const showWinner = document.getElementById("showWinner");

// const sleep = (time) => {
//     return new Promise(resolve => setTimeout(resolve, time))
// };   

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

    switch (true){
        case (thisDealer.score > 21):
            //Dealer goes over:
            showWinner.innerHTML = "Player wins!";

            console.log ("Dealer went over... you win.");
            break;
        case (thisDealer.score > currentPlayer[1].score):
            //Dealer beats player:
            showWinner.innerHTML = "Dealer wins!";

            console.log("Dealer wins.");
            break;
        case (thisDealer.score === currentPlayer[1].score):
            //It's a tie!!
            showWinner.innerHTML = "TIE!";

            console.log("Push");
            break;
        case (thisDealer.score < currentPlayer[1].score):
            //Player scores higher:
            showWinner.innerHTML = "Player wins!";

            console.log ("Player wins!");
    }
    console.log(`The dealer's score: ${thisDealer.score}`);
    console.log(`Your score: ${currentPlayer[1].score}`);
}

//Dealer takes a hit... (Not the 420 type)
async function dealerHit(){
    await givePlayerCards(0,1,currentTable.deckId,22)
}