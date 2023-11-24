/********************************************************************************* */
//Everything below this line is not being used but will be integrated.
//********************************************************************************* */

async function drawTwoCardsPlayer() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=2');
    const data = await res.json();
    let newCard = "";
    for (let card of data.cards) {
      currentPlayerHand.push(card.value, card.suit);
      console.log("drawn card test ", card.image, card.value, card.suit);
      currentPlayerHand.push(card.value, card.suit);
      newCard += `<img class="cardPlayer" src="https://deckofcardsapi.com/static/img/6H.png" alt="${card.value + " of " + card.suit}"'/>`;
    }
    cardQuerySelector.innerHTML = newCard;
  }
  
  async function drawOneCardFaceUpDealer() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
    const data = await res.json();
    for (let card of data.cards) {
      currentDealerHand.push(card.value, card.suit);
      newCardDealer += `<img class="cardDealer" src="${card.image}" alt="${card.value + " of " + card.suit}"'/>`;
    }
    newCardDealerQuerySelectorDealer.innerHTML = newCardDealer;
  };
  async function drawCardDealerBackImage() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
    const data = await res.json();
    for (let card of data.cards) {
      currentDealerHand.push(card.value, card.suit);
      newCardDealer += `<img class="cardDealer" src="https://www.deckofcardsapi.com/static/img/back.png " alt="${card.value + " of " + card.suit}"'/>`;
    }
    newCardDealerQuerySelectorDealer.innerHTML = newCardDealer;
  }
  
  
  async function drawOneCardPlayer() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
    const data = await res.json();
    for (let card of data.cards) {
      currentPlayerHand.push(card.value, card.suit);
      newCardPlayer += `<img class="cardDealer" src="${card.image}" alt="${card.value + " of " + card.suit}"'/>`;
  
    }
  
    newCardQuerySelectorPlayer.innerHTML = newCardPlayer;
  }
  
  
  
  function consoleLogHands() {
  
    for (i = 0; i < currentPlayerHand.length; i++) {
      console.log(currentPlayerHand[i] + "Player hand");
    }
  
    for (i = 0; i < currentDealerHand.length; i++) {
      console.log(currentDealerHand[i] + "Dealer hand");
    }
  
  };
  
  function openSettingtoStart() {
    document.querySelector(".navbar-setting").classList.toggle("start");
    document.querySelector(".setting").classList.toggle("menu");
  }
  function backToFirstPage() {
    document.querySelector(".navbar-setting").classList.toggle("start");
    document.querySelector(".setting").classList.toggle("menu");
  }
  
  function playerStayOption() {
    //calculate the total score of the player vs the dealer and update the DOM with scores accordingly
  }
  
  function playerBetOption(amount) {
    if (playerBank <= amount) {
      alert("you need more money to bet");
    } else {
      playerBank -= amount;
    }
  
  }
  
  function insuranceOption() {
    //TBD stretch goal? 
  }
  