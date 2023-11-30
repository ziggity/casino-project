const playerBank = document.getElementById("playerBank");
const totalMoneyInPot = document.getElementById("totalPot");
const dealerScoreNow = document.getElementById("dealerScoreNow");
const playerScoreNow = document.getElementById("playerScoreNow");

function playerPlacedBet() {
  const betAmountPlayer1 = currentPlayer[1].placeBet(50);
  console.log(betAmountPlayer1);
  console.log("current player 1 balance: " + currentPlayer[1].money);
  currentPlayer[0].money += 50;
  playerBank.innerHTML = "Player's cash on hand: $" + currentPlayer[1].money;

  console.log("dealer has this much in the pot: $" + currentPlayer[0].money);
  totalMoneyInPot.innerHTML =
    "Total cash in the Pot: $" + currentPlayer[0].money;

  return betAmountPlayer1;
}

// not sure where to go on this one. maybe need dealer to have his own money and pot to have its own thing, and clear out pot each round.
function allocateWinnings(playerMoney, totalMoneyInPot) {
  if (playerMoney == player0) {
    totalMoneyInPot.innerHTML = "Total money in the pot has " + 0;
  }
}
//I need to work on this one a lot - tired now - brain not working.
function declareWinner(player) {
  totalMoneyInPot.innerHTML =
    "Total cash in the Pot: $" + currentPlayer[0].money;
  // if(player == player0){
  //     currentPlayer[0] =
  // }
  alert(
    player + " Is the Winner & has won this much:$" + currentPlayer[0].money
  );
}

function calculateScore(player = new Player) {
  const cards = player.hand;
  let score = 0;
  let numAces = 0;

  for (const card of cards) {
    const cardValue = card.value;
    // console.log("cardValue: " + cardValue);
    if (cardValue === "KING" || cardValue === "QUEEN" || cardValue === "JACK") {
      score += 10;
      // console.log("cardValue: " + cardValue);
    } else if (cardValue === "ACE") {
      numAces += 1;
      score += 11; // Assume 11 for now, can be adjusted later if needed
    } else {
      score += parseInt(cardValue);
    }
  }
  while (numAces > 0 && score > 21) {
    score -= 10;
    numAces -= 1;
  }
  // console.log("score: " + score);
  return score;
}

async function getPlayersHandsJson() {
  const dealerJson = await fetch(
    `${DECK_URL}${deck__id}/pile/${"Player0"}/list/`
  );
  const dealerJsonified = await dealerJson.json();

  const dealerScore = dealerJsonified.piles.Player0;
  console.log("dealer: ", dealerScore);

  const player1Json = await fetch(
    `${DECK_URL}${deck__id}/pile/${"Player1"}/list/`
  );
  const player1Jsonified = await player1Json.json();

  const player1Score = player1Jsonified.piles.Player1;
  console.log("player1: ", player1Score);

  const player1Scores = calculateScore(player1Score);
  const player0Scores = calculateScore(dealerScore);
  playerScoreNow.innerHTML = "Player score is: " + player1Scores;
  dealerScoreNow.innerHTML = "Dealer score is: " + player0Scores;

  if (player1Scores > 21 && player0Scores <= 21) {
    declareWinner("dealer");
    return console.log("Player: loses" + player1Score);
  }

  if (player0Scores > 21 && player1Scores <= 21) {
    declareWinner("dealer");
    return console.log("Dealer: loses" + dealerScore);
  }
  if (
    player0Scores === player1Scores &&
    player1Scores <= 21 &&
    player0Scores >= 17
  ) {
    declareWinner("TIE - both win");
    return console.log("Dealer and Player both tie");
  }
  if (
    player0Scores >= 17 &&
    player0Scores <= 21 &&
    player1Scores < player0Scores
  )
    return console.log("Dealer wins");
  if (
    player1Scores >= 17 &&
    player1Scores <= 21 &&
    player0Scores < player1Scores
  )
    return console.log("Player wins");
  else {
    return console.log("Something broke");
  }
}


// function nukeTable()
  


function reset(){
  // this code works but won't work after you deal again, it'll duplicate cards for everyone I'm not sure how to fix. 
  // const tableElements = document.querySelectorAll(".cardDealer");
  
  //   tableElements.forEach(tableElements => {
  //     tableElements.remove();
  // });

  // using this for now until we find a better way to empty table / players hands / maintain state of pot / cash etc.
  window.location.reload(); 

}

// not sure how to do this. 
function animateCard(card) {
  const cardDealer = document.querySelector('.cardDealer');
  const cardElement = document.createElement('div');
}

