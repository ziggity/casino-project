function testOutThis(){
    console.log (currentTable.deckId);
    console.log("Dealer score: " + calculateScore(currentPlayer[0]));
    console.log("Player 1 score: " + calculateScore(currentPlayer[1]));
}
function showPlayerCards(player = new Player, numToShow = 0){
    let tempCard = new Card;
}