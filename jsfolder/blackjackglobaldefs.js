//DOM elements
const startButton = document.getElementById("dealCards")
const hitButton = document.getElementById("dealCards1")
const betButton = document.getElementById("dealCards2")
const stayButton = document.getElementById("dealCards3")
const dealerHitButton = document.getElementById("dealCards4")
const resetButton = document.getElementById("dealCards6")


const UNKNOWN_CARD = new Card("back",0,"NONE");
const DEFAULT_CARD_CLASS = "playing-card-img cardDealer img-fluid"
const DEFAULT_MAX_SCORE = 21;

//These 'Labels' refer to the DOM elements where drawing occurs.
//Set default values here:
const TABLE_LABEL = ['tableMoney'];
const GAME_STATUS_LABEL = ['gameStatus1']
const PLAYER_SCORE_LABEL = [];
const PLAYER_MONEY_LABEL = [];
const PLAYER_NAME_LABEL = [];
for (let i = 0; i < 6; i++){
  PLAYER_SCORE_LABEL[i] = `playerScore${i}`;
  PLAYER_MONEY_LABEL[i] = `playerMoney${i}`;
  PLAYER_NAME_LABEL[i] = `playerName${i}`;
}

//Create classes for players, dealer and Table
const currentTable = new GameTable("Blackjack", 1, "");
const currentPlayer = []

//Max players = 5 + Dealer (Player 0)
currentPlayer[0] = new Dealer("Dealer 1", "novice");
for (let i = 1; i < 6; i++) {
  currentPlayer[i] = new Player(`Player ${i}`, false);
  Object.seal(currentPlayer[i]);//prevents mutation of object properties but allows value changes
}

let audioOn = false;

const welcomeMessageHTML = 
  `<div class="row">
    <div class = "col">
      Welcome to Nucamp Casino BlackJack!!
      <br>
      <img src="./imgs/Male-Dealer/Conceited2.png" class = "img-fluid"/>
      <br>
      I'm the dealer here... Just try and beat me!
    </div>
  </div>
  `