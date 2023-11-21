//Class definitions
class Player {
    constructor(name, isActive) {
        this.name = name;
        this.money= 0;
        this.score= 0
        this.isActive = isActive;
        this.hand = []
    }
    shuffle(){
        
    }
}
class Dealer{
    constructor(name, diffLevel){
        this.name = name;
        this.diffLevel = diffLevel;
        this.hand = [];
    }
}
class GameTable{
    constructor(gameType, numPlayers, deckId){
        this.gameType = gameType
        this.numPlayers = numPlayers;
        this.deckId = deckId;
    }

}