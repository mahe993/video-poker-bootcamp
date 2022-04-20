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
  const finalHand = [...document.querySelectorAll('.card')];
  finalHand.forEach((x) => {
    finalHandRanks.push(Number(x.dataset.rank));
    finalHandSuits.push(x.dataset.suit);
  });
  console.log(finalHandRanks);
  console.log(finalHandSuits);
  /** for suitCounter */
  for (let i = 0; i < finalHandSuits.length; i += 1) {
    if (finalHandSuits[i] === finalHandSuits[i + 1]) {
      if (i + 1 === finalHandSuits.length - 1) {
        suitCounter = 1;
      } else { continue; }
    } else { break; }
  }
  /** for rankDifference */
  highestHandRank = Math.max(...finalHandRanks);
  lowestHandRank = Math.min(...finalHandRanks);
  rankDifference = highestHandRank - lowestHandRank;
  /** to capture the event of 10 - Ace straight */
  if (rankDifference === 12) {
    let sortedHandRanks = [...finalHandRanks].sort((a, b) => a - b);
    console.log(sortedHandRanks);
    rankDifference = 14 - sortedHandRanks[1];
  }
  /** for rankFrequency */
  for (let i = 0; i < finalHandRanks.length; i += 1) {
    for (let j = 0; j < finalHandRanks.length; j += 1) {
      if (finalHandRanks[i] === finalHandRanks[j]) {
        rankFrequency[i] += 1;
      }
    }
  }
};

/** @function royalFlush royal flush win. returns true if conditions met */
const royalFlush = () => {
  if (suitCounter === 1 && rankDifference === 4 && lowestHandRank === 1 && highestHandRank === 13) {
    return true;
  } return false;
};

/** @function straightFlush straight flush win. returns true if conditions met */
const straightFlush = () => {
  if (suitCounter === 1 && rankDifference === 4) {
    return true;
  } return false;
};

/** @function fourKind four of a kind win. returns true if conditions met */
const fourKind = () => {
  if (rankFrequency.includes(4)) {
    return true;
  } return false;
};

/** @function fullHouse full house win. returns true if conditions met */
const fullHouse = () => {
  if (rankFrequency.includes(3) && rankFrequency.includes(2)) {
    return true;
  } return false;
};

/** @function flush flush win. returns true if conditions met */
const flush = () => {
  if (suitCounter === 1) {
    return true;
  } return false;
};

/** @function straight straight win. returns true if conditions met */
const straight = () => {
  if (rankDifference === 4 && Math.max(...rankFrequency) === 1) {
    return true;
  } return false;
};

/** @function threeKind three of a kind win. returns true if conditions met */
const threeKind = () => {
  if (rankFrequency.includes(3)) {
    return true;
  } return false;
};

/** @function twoPairs two pairs win. returns true if conditions met */
const twoPairs = () => {
  let counter = 0;
  rankFrequency.forEach((x) => { if (x === 2) { counter += 1; } });
  if (counter === 4) {
    return true;
  } return false;
};

/** @function jacksOrBetter jacks pair or better win. returns true if conditions met */
const jacksOrBetter = () => {
  if (rankFrequency.includes(2)) {
    for (let i = 0; i < rankFrequency.length; i += 1) {
      if (rankFrequency[i] === 2) {
        if (finalHandRanks[i] === 1 || finalHandRanks[i] > 10) {
          return true;
        }
      }
    }
  } return false;
};

/** @function winningEvents compile all win scenarios */
const winningEvents = () => {
  switch (true) {
    case royalFlush():
      userInfo[0].bankBalance += betAmount * 250;
      gameMessage.innerText = '?%QWR!@#$@! ROYAL FLUSH!!!! CONGRATS!!';
      handScore = 9;
      break;

    case straightFlush():
      userInfo[0].bankBalance += betAmount * 50;
      gameMessage.innerText = 'WOWOWOW STRAIGHT FLUSH!! PARTAYY!!';
      handScore = 8;
      break;

    case fourKind():
      userInfo[0].bankBalance += betAmount * 25;
      gameMessage.innerText = 'Four of a kind!! $_$_$_$!!';
      handScore = 7;
      break;

    case fullHouse():
      userInfo[0].bankBalance += betAmount * 9;
      gameMessage.innerText = 'FOOOLL HOOOOUSE!! Take it and run!!';
      handScore = 6;
      break;

    case flush():
      userInfo[0].bankBalance += betAmount * 6;
      gameMessage.innerText = 'Flush!! remember to wash your hands too!!';
      handScore = 5;
      break;

    case straight():
      userInfo[0].bankBalance += betAmount * 4;
      gameMessage.innerText = 'Straight!! gettin lucky!!';
      handScore = 4;
      break;

    case threeKind():
      userInfo[0].bankBalance += betAmount * 3;
      gameMessage.innerText = 'Trips!! Say no to drugs kids';
      handScore = 3;
      break;

    case twoPairs():
      userInfo[0].bankBalance += betAmount * 2;
      gameMessage.innerText = 'Two Dubs!! woopwooop!!';
      handScore = 2;
      break;

    case jacksOrBetter():
      userInfo[0].bankBalance += betAmount * 1;
      gameMessage.innerText = 'Jacks Pair or better! hope breaking even is your thing!';
      handScore = 1;
      break;

    default:
      /** change game message for losing */
      gameMessage.innerText = 'Sorry you lost! adjust bet size and deal again!';
  }
};

/** @function animateStakesBoard highlighting winning row and box */
const animateStakesBoard = () => {
  playerAccountDisplay.innerText = `$${userInfo[0].bankBalance}`;
  if (handScore !== 0) {
    document.querySelector(`.row${handScore}`).classList.add('selectrow');
    document.querySelector(`.box${handScore}${betAmount}`).classList.add('winner'); }
  const randomWinAudio = winAudioArray[Math.floor(Math.random() * 3)];
  randomWinAudio.play();
};

/** @function cardProto prototype obj for makeCardObj. proto method to create a div element */
const cardProto = {
  createDiv() {
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('data-rank', `${this.cardRank}`);
    cardDiv.setAttribute('data-suit', `${this.cardSuit}`);
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
  dealCardSfx.currentTime = 0;
  dealCardSfx.play();
  let cardClassesArray = [...event.currentTarget.classList];
  if (cardClassesArray.includes('selected')) {
    event.currentTarget.classList.remove('selected');
    event.currentTarget.classList.add('unflip');
    event.currentTarget.classList.remove('flip');
  } else {
    event.currentTarget.classList.add('selected');
    event.currentTarget.classList.add('flip');
    event.currentTarget.classList.remove('unflip');
  }
};

/** @function clickBet func for clicking on pokerchip event listener */
const clickBet = () => {
  /** remove stakes board winning animations */
  document.querySelector(`.row${handScore}`).classList.remove('selectrow');
  document.querySelector(`.box${handScore}${betAmount}`).classList.remove('winner');
  handScore = 0;

  /** betting mechanics */
  betAmount += 1;
  if (betAmount > 5) {
    betAmount = 1;
  }
  betDisplay.innerText = betAmount;

  /** click bet sfx */
  switch (betAmount) {
    case 1:
      oneChipSfx.currentTime = 0.1;
      oneChipSfx.play();
      document.querySelector('.column5').classList.remove('selectcolumn');
      break;

    case 2:
      oneChipSfx.currentTime = 0.1;
      oneChipSfx.play();
      break;

    case 3:
      threeChipSfx.currentTime = 0;
      threeChipSfx.play();
      break;

    case 4:
      threeChipSfx.currentTime = 0;
      threeChipSfx.play();
      break;

    case 5:
      fiveChipSfx.currentTime = 0;
      fiveChipSfx.play();
      break;
  }

  /** click bet vfx */
  document.querySelector(`.column${betAmount - 1}`).classList.remove('selectcolumn');
  document.querySelector(`.column${betAmount}`).classList.add('selectcolumn');
};

/** @function clickDeal func for clicking on deal button event listener */
const clickDeal = () => {
  if (gameState === 0) {
    /** remove stakes board winning animations and game message */
    document.querySelector(`.row${handScore}`).classList.remove('selectrow');
    document.querySelector(`.box${handScore}${betAmount}`).classList.remove('winner');
    gameMessage.innerText = 'Dealing...';
    /** reset game states */
    newShuffledDeck = shuffleDeck(makeDeck());
    suitCounter = 0;
    rankDifference = 0;
    rankFrequency = [0, 0, 0, 0, 0];
    highestHandRank = 0;
    lowestHandRank = 0;
    finalHandRanks = [];
    finalHandSuits = [];
    handScore = 0;
    /** remove existing cards */
    const allCardsArray = [...document.querySelectorAll('.card')];
    allCardsArray.forEach((x) => {
      x.classList.add('removing');
      setTimeout(() => x.remove(), 1000); });
    /** take the bet money. to check for username if planning to allow for username switching */
    userInfo[0].bankBalance -= betAmount;
    if (userInfo[0].bankBalance < 0) {
      userInfo[0].bankBalance += betAmount;
      alert('You do not have enough funds to make this bet! Please change bet amount to continue playing!');
      return;
    }
    playerAccountDisplay.innerText = `$${userInfo[0].bankBalance}`;
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
        dealCardSfx.currentTime = 0;
        dealCardSfx.play();
      },
    );
    /** enable clicking on cards */
    cardContainer.style.pointerEvents = 'all';
    /** disable clicking on deal btn for abit */
    dealBtn.style.pointerEvents = 'none';
    /** change game state */
    gameState = 1;
    setTimeout(() => {
      /** change game message */
      gameMessage.innerText = 'Select cards you wish to change and click DEAL';
      /** enable deal btn */
      dealBtn.style.pointerEvents = 'all';
    }, 1500);
  } else {
    /** disable clicking on cards */
    cardContainer.style.pointerEvents = 'none';
    /** disable clicking on deal btn */
    dealBtn.style.pointerEvents = 'none';
    /** to record card# that has been removed so to facilitate replacing later on */
    const removedCardArray = [];
    /** @method forEach array method to identify which cards are selected to remove */
    const allCardDomsArray = [...document.querySelectorAll('.card')];
    allCardDomsArray.forEach(
      (x) => {
        if ([...x.classList].includes('selected')) {
          removedCardArray.push([...x.classList][2]);
          x.classList.add('removing');
          dealCardSfx.currentTime = 0;
          dealCardSfx.play();
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
        dealCardSfx.currentTime = 0;
        dealCardSfx.play();
      }
      setTimeout(() => {
        /** Check win status and award bets */
        calcHandScore();
        winningEvents();
        animateStakesBoard();

        /** enable buttons */
        dealBtn.style.pointerEvents = 'all';
        betBtn.style.pointerEvents = 'all';

        /** change game state */
        gameState = 0;
      }, 2000);
    }, 1000);
  }
};

/** @event listener events */
dealBtn.addEventListener('click', clickDeal);
betBtn.addEventListener('click', clickBet);
