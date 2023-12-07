window.addEventListener("resize", adjustCardSize);

function addAudioToDOM(url = "../audio/jazzy-band-Monument_Music.mp3", idTag = "sound"){
    const theSound = new Audio(url); 
    theSound.id = idTag;
    document.querySelector("#audioParent").appendChild(theSound);

}
function playSound(itemId = "sound", loop = false, seekPoint = 0, vol = 1) {
    if (!audioOn) return;//Global variable for Sound On/Off

    try {
        document.querySelector(`#${itemId}`).currentTime = seekPoint;
        document.querySelector(`#${itemId}`).volume = vol;
        document.querySelector(`#${itemId}`).play();
        document.querySelector(`#${itemId}`).loop = loop;
    } catch (e) {
        console.log("Failed to play sound from " + itemId);
    }

}
function stopSound(itemId = "sound") {
    try {
        document.querySelector(`#${itemId}`).pause();

    } catch (e) {
        console.log("Failed to play sound from " + itemId);
    }

}
//Using absolute positions, slightly offsets positions of cards
function positionCard(targetId, cardNumber){
    const playerBox = document.getElementById(targetId)
    playerBox.childNodes[cardNumber].style.left = ((5* cardNumber)+(20/currentTable.numPlayers)) + "vw"

}

function adjustCardSize(data, multiplier = 1){
    let cardWidth = 12 * multiplier;
    let cardHeight = 17 * multiplier;
    let scaleUnit = "vw"
    cardHeight = 25 * multiplier
    cardWidth = cardHeight/1.4
    scaleUnit = "vh"

    if(document.querySelector("body").clientHeight <= document.querySelector("body").clientWidth){
    }
    document.documentElement.style.setProperty("--card-width",`${cardWidth}${scaleUnit}`);
    document.documentElement.style.setProperty("--card-height",`${cardHeight}${scaleUnit}`);
    
}

function loadSounds(){
    addAudioToDOM("./audio/jazzy-band-Monument_Music.mp3","backgroundMusic");
    addAudioToDOM("./audio/casino-ambiance.mp3","backgroundNoise");
    addAudioToDOM("./audio/flipcard.mp3","flipSound");
    addAudioToDOM("./audio/allinpushchips1.mp3","chipsSound1");
}

function defaultValues(){
    
}

//OLD CODE BELOW:

// const startButton = document.getElementById("dealCards")
// const hitButton = document.getElementById("dealCards1")
// const betButton = document.getElementById("dealCards2")
// const stayButton = document.getElementById("dealCards3")
// const dealerHitButton = document.getElementById("dealCards4")
// const resetButton = document.getElementById("dealCards6")

// window.addEventListener("load",enableButtons);

// const UNKNOWN_CARD = new Card("back",0,"NONE");
// const DEFAULT_CARD_CLASS = "playing-card-img cardDealer img-fluid"
// const MAX_SCORE = 21;

// //Change the player label id's here
// const PLAYER_SCORE_LABEL = [];
// const PLAYER_MONEY_LABEL = [];
// const PLAYER_NAME_LABEL = [];
// const TABLE_LABEL = ['tableMoney'];
// const GAME_STATUS_LABEL = ['gameStatus1']

// for (let i = 0; i < 6; i++){
//     PLAYER_SCORE_LABEL[i] = `playerScore${i}`;
//     PLAYER_MONEY_LABEL[i] = `playerMoney${i}`;
//     PLAYER_NAME_LABEL[i] = `playerName${i}`;
// }

// //timer function
// async function sleep(time){
//     return new Promise(resolve => setTimeout(resolve, time))
// };   

// function testOutThis(){
//     // console.log (currentTable.deckId);
//     // console.log("Dealer score: " + calculateScore(currentPlayer[0]));
//     // console.log("Player 1 score: " + calculateScore(currentPlayer[1]));
//     // console.log("Dealer Index:" + currentPlayer[0].playerNumber);
//     // console.log("Player 1 Index:" + currentPlayer[1].playerNumber)
//     // alert("ok")
//     // animateAddCard(`${CARD_IMAGE_PATH}AS.png`, "player1");
//     // refreshPlayerHand(0,5);
//     // revealPlayerHand(1);
// }


// //Fetch player cards from pile and place it in player object hand
// //Then cycle through and hide cards that do not need to be revealed
// //Call this fuction before a draw function
// async function showPlayerCards(player = new Player, numToShow = 1){

//     const playerHand = await getPileList(`Player${player.playerNumber}`,currentTable.deckId);
    
//     if (playerHand.length === 0) {
//         player.hand = playerHand;
//         return false;
//     } 
//     let cardDisplay = -1
//     try{ //When intializing player.hand will be null... this will catch it...I'm just lazy

//         for (let i = 0; i < playerHand.length; i++){
//             if (cardDisplay===-1 && player.hand[i].value === 0) cardDisplay = i; //Tells us how many cards were shown before
//             if (i >= numToShow){
//                 player.hand[i] = UNKNOWN_CARD;
//             } else {
//                 player.hand[i] = playerHand[i]
//             }
//         }
//     } catch(e){
//         player.hand = playerHand
//         for (let i = 0; i < playerHand.length; i++){
//             if (cardDisplay===-1 && player.hand[i].value === 0) cardDisplay = i; //Tells us how many cards were shown before
//             if (i >= numToShow){
//                 player.hand[i] = UNKNOWN_CARD;
//             } else {
//                 player.hand[i] = playerHand[i]
//             }
//         }

//     } finally {
//         return cardDisplay;
//     }
  
// }
// async function revealPlayerHand(playerIndex = 0){
//     const numToAnimate = await showPlayerCards(currentPlayer[playerIndex],22);
//     console.log(numToAnimate);
//     await refreshPlayerHand(playerIndex,numToAnimate);
// }

// async function refreshPlayerHand(playerIndex, numToAnimate = 0){
//     drawTarget = document.getElementById(`player${playerIndex}`)
//     const animateIndex = currentPlayer[playerIndex].hand.length - numToAnimate
    
//     while (drawTarget.firstChild){
//         drawTarget.removeChild(drawTarget.firstChild)
//     }
//     for (let i = 0; i < currentPlayer[playerIndex].hand.length; i++){
//         let animateIt = false;
//         if (i >= animateIndex) animateIt = true;
//         await drawNewCard(currentPlayer[playerIndex].hand[i].image,`player${playerIndex}`, animateIt);
//     }
// }

// async function drawNewCard(cardImage, targetId, animateIt = true) {
//     //Ensure targetId is not empty
//     try{
//         const drawTarget = document.getElementById(targetId)
//         const newCard = await loadImage(cardImage)
      
//         if (animateIt){
//             newCard.setAttribute("class", `${DEFAULT_CARD_CLASS}  flip-over`);
//         } else {
//             newCard.setAttribute("class", DEFAULT_CARD_CLASS);
//         }
//         //console.log(newCard);
//         drawTarget.appendChild(newCard);
     
//     }
//     catch(e){
//         console.log(`Error drawing card:\nTarget: ${targetId}\n\n ${e}`)
//     }
//   }



// //This function is called when player stays or busts
// async function blackjackDealerAI(data, autoLose = false) {
//     disableButtons()

//     const thisDealer = currentPlayer[0];
//     await revealPlayerHand(0);
//     thisDealer.score = calculateScore(thisDealer);
//     currentPlayer[1].score = calculateScore(currentPlayer[1]);
//     //drawDealerCards();

//     //If player busts or other auto loss conditon, declare dealer winner
//     if (autoLose) {
//         await sleep(1000); //wait a sec
//         console.log("You went over... YOU LOSE");
//         showMessage(`Player Bust...<br>You Lose<br><br>Your score: ${currentPlayer[1].score}<br>Dealer score: ${thisDealer.score}`)
//         enableButtons();
//         return;
//     } 

//     //THIS IS WHERE ALL OF THE DEALER LOGIC WILL GO...
//     //-----------------------------------------------------
//     while (thisDealer.score < currentPlayer[1].score){
//         await sleep(500); //include a timer to slow down tasks
//         await dealerHit();
//         //drawDealerCards();
//         thisDealer.score = calculateScore(thisDealer);
//     }
//     //------------------------------------------------------
//     let scoreText = `<br><br>Your score: ${currentPlayer[1].score}<br>Dealer score: ${thisDealer.score}`
//     await sleep(1000); //wait a sec
//     switch (true){
//         case (thisDealer.score > MAX_SCORE):
//             //Dealer goes over:
//             showMessage(`You Win!!${scoreText}`);
//             console.log ("Dealer went over... you win.");
//             break;
//         case (thisDealer.score > currentPlayer[1].score):
//             //Dealer beats player:
//             showMessage(`Dealer wins.${scoreText}`);
//             console.log("Dealer wins.");
//             break;
//         case (thisDealer.score === currentPlayer[1].score):
//             //It's a tie!!
//             showMessage(`Push.${scoreText}`);
//             console.log("Push");
//             break;
//         case (thisDealer.score < currentPlayer[1].score):
//             //Player scores higher:
//             showMessage(`You WIN!!${scoreText}`);
//             console.log ("Player wins!");
//     }
//     enableButtons()
// }

// //Dealer takes a hit... (Not the 420 type)
// async function dealerHit(){
//     await givePlayerCards(0,1,currentTable.deckId,22)
// }

// function updateLabels() {
//     const scoreLabel = [];
//     const moneyLabel = [];
//     const nameLabel = [];

//     for (let i = 0; i <= currentTable.numPlayers; i++) {
//         scoreLabel[i] = document.getElementById(PLAYER_SCORE_LABEL[i]);
//         moneyLabel[i] = document.getElementById(PLAYER_MONEY_LABEL[i]);
//         nameLabel[i] = document.getElementById(PLAYER_NAME_LABEL[i]);

//         scoreLabel[i].textContent = `Score: ${calculateScore(currentPlayer[i])}`
//         moneyLabel[i].textContent = `$${currentPlayer[i].money}`
//         nameLabel[i].textContent = `${currentPlayer[i].name}:`
//     }
//     document.getElementById(TABLE_LABEL[0]).textContent = `Pot: $${currentTable.moneyPot}`;
// }

// async function updateDisplay(doUpdate = true) {
//     while (doUpdate) {
//         updateLabels();
//         await sleep(100);
//     }
// }


// async function loadImage(src){
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = reject;
//     img.src = src;
//   })  
// }

// function clearTable(playerIndex){
  
//     const drawTarget = document.getElementById(`player${playerIndex}`)
//     while (drawTarget.firstChild){
//         drawTarget.removeChild(drawTarget.firstChild)
//     }

// }

// function enableButtons(){
//     startButton.addEventListener("click",gameStart);
//     startButton.addEventListener("click",startListenerFunction); //Abbie.js

//     hitButton.addEventListener("click",hitMe); 
//     betButton.addEventListener("click",playerPlacedBet);
//     stayButton.addEventListener("click",blackjackDealerAI); 
//     dealerHitButton.addEventListener("click",testOutThis);
//     resetButton.addEventListener("click",reset);
//     resetButton.addEventListener("click", resetListenerFunction); //Abbie.js
//     console.log("buttons enabled")
// }
// function disableButtons(){
//     startButton.removeEventListener("click",gameStart);
//     startButton.removeEventListener("click", startListenerFunction); //Abbie.js
      
//     hitButton.removeEventListener("click",hitMe); 
//     betButton.removeEventListener("click",playerPlacedBet);
//     stayButton.removeEventListener("click",blackjackDealerAI); 
//     dealerHitButton.removeEventListener("click",testOutThis);
//     resetButton.removeEventListener("click",reset);
//     resetButton.removeEventListener("click", resetListenerFunction); //Abie.js
//     console.log("buttons disabled")
// }

// function resetListenerFunction(){
//     document.querySelector(".startMainGame").classList.toggle("hide");
//     document.querySelector(".playerChoices").classList.toggle("show");
// }

// function startListenerFunction(){
//     document.querySelector(".startMainGame").classList.toggle("hide");
//     document.querySelector(".playerChoices").classList.toggle("show");
 
// }