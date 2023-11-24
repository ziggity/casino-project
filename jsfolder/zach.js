
const playerBank = document.getElementById("playerBank");
const totalMoneyInPot = document.getElementById("totalPot");

function playerPlacedBet(){
    const betAmountPlayer1 = currentPlayer[1].placeBet(50); 
    console.log(betAmountPlayer1);
    console.log("current player 1 balance: " + currentPlayer[1].money);
    currentPlayer[0].money += 50;
    playerBank.innerHTML = "Player's cash on hand: " + currentPlayer[1].money ;

    console.log("dealer has this much in the pot: " + currentPlayer[0].money);
    totalMoneyInPot.innerHTML = "Total cash in the Pot: " + currentPlayer[0].money;

    return betAmountPlayer1;
};

function declareWinner(){
};

