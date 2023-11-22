//Class definitions
class Player {
    constructor(name = "Player", isActive = false) {
        this.name = name;
        this.money= 0;
        this.score= 0
        this.isActive = isActive;
        this.hand = []
    }
    shuffle(){
        
    }
}
class Dealer extends Player{
    constructor(name = "Dealer", diffLevel = "novice"){
        super(name);
        this.diffLevel = diffLevel;
    }
}
class GameTable{
    constructor(gameType, numPlayers = 1, deckId){
        this.gameType = gameType
        this.numPlayers = numPlayers;
        this.deckId = deckId;
    }

}
