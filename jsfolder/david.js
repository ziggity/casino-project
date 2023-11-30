const UNKNOWN_CARD = new Card("back",0,"NONE");

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
async function BlackjackDealerAI() {
    const thisDealer = currentPlayer[0];
    await showOrHidePlayerCards (thisDealer, 22);
    let dealerScore = calculateScore(thisDealer);

    while (dealerScore < 17){
        await dealerHit();
        drawDealerCards();
        dealerScore = calculateScore(thisDealer);
    }

    drawDealerCards()
    dealerScore = calculateScore(thisDealer);
    console.log(dealerScore);
    
    
    
}
//Dealer takes a hit... (Not the 420 type)
async function dealerHit(){
    await givePlayerCards(0,1,currentTable.deckId,22)
}