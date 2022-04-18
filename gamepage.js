/* eslint-disable default-case */
/** @function createStakesGrid func to create the stakes table */
const createStakesGrid = () => {
  for (let i = 0; i < STAKES_ROWS; i += 1) {
    for (let j = 0; j < STAKES_COLUMNS; j += 1) {
      const div = document.createElement('div');
      div.classList.add(`box${i}${j}`);
      let multiplier;
      let boxText;
      switch (i) {
        case 0:
          boxText = 'Bets ($)';
          multiplier = 1;
          div.classList.add(`column${j}`);
          if (j === 1) {
            div.classList.add('selectcolumn');
          }
          break;

        case 1:
          boxText = 'Jacks or Better';
          multiplier = 1;
          break;

        case 2:
          boxText = 'Two Pairs';
          multiplier = 2;
          break;

        case 3:
          boxText = 'Three Of A Kind';
          multiplier = 3;
          break;

        case 4:
          boxText = 'Straight';
          multiplier = 4;
          break;

        case 5:
          boxText = 'Flush';
          multiplier = 6;
          break;

        case 6:
          boxText = 'Full House';
          multiplier = 9;
          break;

        case 7:
          boxText = 'Four Of A Kind';
          multiplier = 25;
          break;

        case 8:
          boxText = 'Straight Flush';
          multiplier = 50;
          break;

        case 9:
          boxText = 'Royal Flush';
          multiplier = 250;
          break;
      }
      let boxNumber = j * multiplier;
      if (j === 0) {
        div.innerText = boxText;
        div.classList.add(`row${i}`);
      } else {
        div.innerText = boxNumber;
      }
      div.classList.add('infobox');
      gameInfoBox.append(div);
    }
  }
};
createStakesGrid();

/** @function calcHandScore func to calculate hand scores */
const calcHandScore = () => {

};

/** @function cardProto ancenstor prototype obj for makeCardObj. cards will have proto func to create a div element of themselves */
const cardProto = {
  createDiv() {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', `${this.cardColor}`);
    const cardBackDiv = document.createElement('img');
    cardBackDiv.src = './images/cardback.png';
    cardBackDiv.classList.add('cardback');
    const cardFrontDiv = document.createElement('div');
    cardFrontDiv.classList.add('cardfront');
    cardFrontDiv.innerHTML = `${this.cardName}<br>${this.cardSuit}`;
    cardDiv.append(cardBackDiv, cardFrontDiv);
    return cardDiv;
  },
};
console.log(cardProto);

/** @function makeCardObj factory function to make a card object */
const makeCardObj = (cardSuit, cardName, cardRank, cardColor) => Object.create(cardProto, {
  cardSuit: { value: cardSuit },
  cardName: { value: cardName },
  cardRank: { value: cardRank },
  cardColor: { value: cardColor },
});

/** @function makeDeck function to make a deck of cards */
const makeDeck = () => {
  const deck = [];
  const SUITS = ['♥', '♦', '♣', '♠'];
  const COLORS = ['red', 'red', 'black', 'black'];
  for (let i = 0; i < SUITS.length; i += 1) {
    for (let j = 1; j < 14; j += 1) {
      let cardName = j;
      switch (j) {
        case 1:
          cardName = 'A';
          break;

        case 11:
          cardName = 'J';
          break;

        case 12:
          cardName = 'Q';
          break;

        case 13:
          cardName = 'K';
          break;
      }
      deck.push(makeCardObj(SUITS[i], cardName, j, COLORS[i]));
    }
  }
  return deck;
};

/** @function shuffleDeck function to shuffle a deck of cards */
function shuffleDeck(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** @global init a new shuffled deck of cards */
let newShuffledDeck = shuffleDeck(makeDeck());

/** @function clickCard func for clicking on cards event listener */
const clickCard = (event) => {
  let cardClassesArray = [...event.currentTarget.classList];
  if (cardClassesArray.includes('selected')) {
    event.currentTarget.classList.remove('selected');
  } else {
    event.currentTarget.classList.add('selected'); }
};

/** @function clickBet func for clicking on pokerchip event listener */
const clickBet = () => {
  betAmount += 1;
  if (betAmount > 5) {
    betAmount = 1;
  }
  if (betAmount === 1) {
    document.querySelector('.column5').classList.remove('selectcolumn');
  }
  document.querySelector(`.column${betAmount - 1}`).classList.remove('selectcolumn');
  document.querySelector(`.column${betAmount}`).classList.add('selectcolumn');

  betDisplay.innerText = betAmount;
};

/** @function clickDeal func for clicking on deal button event listener */
const clickDeal = () => {
  if (gameState === 0) {
    /** remove existing cards */
    const allCardsArray = [...document.querySelectorAll('.card')];
    allCardsArray.forEach((x) => {
      x.classList.add('removing');
      setTimeout(() => x.remove(), 1000); });
    /** take the bet money */
    accountBalance -= betAmount;
    if (accountBalance < 0) {
      accountBalance += betAmount;
      alert('You do not have enough funds to make this bet! Please change bet amount to continue playing!');
      return;
    }
    playerAccountDisplay.innerText = accountBalance;
    /** disable changing of bet amount */
    betBtn.style.pointerEvents = 'none';
    /** create new 5 cards */
    for (let i = 0; i < 5; i += 1) {
      const card = newShuffledDeck.pop();
      const cardDisplay = card.createDiv();
      cardDisplay.classList.add(`card${i}`);
      cardContainer.append(cardDisplay);
    }
    const allCardDomsArray = [...document.querySelectorAll('.card')];
    allCardDomsArray.forEach(
      (x) => {
        x.classList.add('dealing');
        x.addEventListener('click', clickCard);
      },
    );
    /** enable clicking on cards */
    cardContainer.style.pointerEvents = 'all';
    /** change game message */
    gameMessage.innerText = 'Select cards you wish to change and click DEAL';
    /** change game state */
    gameState = 1;
  } else {
    /** disable clicking on cards */
    cardContainer.style.pointerEvents = 'none';
    /** to record card# that has been removed so to facilitate replacing later on */
    const removedCardArray = [];
    /** @method forEach array method to identify which cards are selected to remove */
    const allCardDomsArray = [...document.querySelectorAll('.card')];
    allCardDomsArray.forEach(
      (x) => {
        if ([...x.classList].includes('selected')) {
          removedCardArray.push([...x.classList][2]);
          x.classList.add('removing');
          setTimeout(() => {
            x.remove();
          }, 1000);
        }
      },
    );
    setTimeout(() => {
      console.log(removedCardArray);
      /** create a new card for every removed card using loop or forEach */
      for (let i = 0; i < removedCardArray.length; i += 1) {
        const card = newShuffledDeck.pop();
        const cardDisplay = card.createDiv();
        cardDisplay.classList.add(removedCardArray[i]);
        cardContainer.append(cardDisplay);
        cardDisplay.classList.add('dealing');
        cardDisplay.addEventListener('click', clickCard);
      }
      /** Check win status and award bets */

      /** change game message */
      gameMessage.innerText = 'Sorry you lost! adjust bet size and deal again!';
      /** reset game state */
      gameState = 0;
      newShuffledDeck = shuffleDeck(makeDeck());
      betBtn.style.pointerEvents = 'all';
    }, 1000);
  }
};
/** @event listener events */
dealBtn.addEventListener('click', clickDeal);
betBtn.addEventListener('click', clickBet);
