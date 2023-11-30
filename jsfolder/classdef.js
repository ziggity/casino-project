//Class definitions
class Card {
    constructor (code="back", value = 0, suit = "SPADES"){
        this.code = code;
        this.image = `https://deckofcardsapi.com/static/img/${code}.png`
        this.images = {
            "svg": `https://deckofcardsapi.com/static/img/${code}.svg`, 
            "png": `https://deckofcardsapi.com/static/img/${code}.png`
        };
        this.value = value;
        this.suit = suit;
    }
}
class Player {
    constructor(name = "Player", isActive = false, money = 1000, playerNumber = 1) {
        this.name = name;
        this.money = money;
        this.wins = 0;
        this.isActive = isActive;
        this.playerNumber = playerNumber; //keep track of player index
        this.hand = [];
    }
    shuffle(){
        
    }
    
    placeBet(amount) {
        if (amount > 0 && amount <= this.money) {
          this.money -= amount;
          return amount;
        } else {
          console.log("Invalid bet amount or insufficient funds." + amount + ",", "current balance : " + this.money);
          return 0; 
        }
    }
}
class Dealer extends Player{
    constructor(name = "Dealer", diffLevel = "novice"){
        super(name, true, 0, 0);
        this.diffLevel = diffLevel;
        // this.money = money;
        // this.wins = wins;
        // this.hand = [];
    }
}
class GameTable{
    constructor(gameType, numPlayers = 1, deckId){
        this.gameType = gameType
        this.numPlayers = numPlayers;
        this.deckId = deckId;
    }

}
