//Class definitions
class Player {
    constructor(name = "Player", isActive = false, money = 1000) {
        this.name = name;
        this.money = money;
        this.wins = 0
        this.isActive = isActive;
        this.hand = []
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
    constructor(name = "Dealer", diffLevel = "novice", money = 0, wins = 0){
        super(name);
        this.diffLevel = diffLevel;
        this.money = money;
        this.wins = wins;
        this.hand = [];
    }
}
class GameTable{
    constructor(gameType, numPlayers = 1, deckId){
        this.gameType = gameType
        this.numPlayers = numPlayers;
        this.deckId = deckId;
    }

}
