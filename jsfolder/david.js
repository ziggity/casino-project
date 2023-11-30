const UNKNOWN_CARD = new Card("back",0,"NONE");

function testOutThis(){
    console.log (currentTable.deckId);
    console.log("Dealer score: " + calculateScore(currentPlayer[0]));
    console.log("Player 1 score: " + calculateScore(currentPlayer[1]));
    console.log("Dealer Index:" + currentPlayer[0].playerNumber);
    console.log("Player 1 Index:" + currentPlayer[1].playerNumber)
}

//Cycle through player object hand and replace hidden cards with the card back
// function hidePlayerCards(player = new Player, numToShow = 0){
//     if (player.hand.length === 0) return false;
//     for (i = 0; i < player.hand.length; i++){
//         if (i >= numToShow){
//            player.hand[i] = UNKNOWN_CARD;
//         }
//     }
//     return true;

// }
//Fetch player cards from pile and place it in player object hand
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