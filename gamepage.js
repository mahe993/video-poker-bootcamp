/* eslint-disable default-case */
/** @function createStakesGrid func to create the stakes table */
const createStakesGrid = () => {
  for (let i = 0; i < STAKES_ROWS; i += 1) {
    for (let j = 0; j < STAKES_COLUMNS; j += 1) {
      const div = document.createElement('div');
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

/** @function makeDeck factory function to make a deck of cards */

/** @function createCard func to create card and append */

/** @function clickCard func for card event listener */
const clickCard = (event) => {
  event.currentTarget.classList.add('selected');
};

/** @function clickBet func for pokerchip event listener */
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

/** @function clickDeal func for deal button event listener */
const clickDeal = () => {
  const removedCardArray = [];
  /** @method forEach array method to identify which cards selected to remove */
  allCardDomsArray.forEach(
    (x) => {
      if ([...x.classList].includes('selected')) {
        removedCardArray.push([...x.classList][1]);
        x.classList.add('removing');
        setTimeout(() => {
          x.remove();
        }, 1000);
      }
    },
  );
  setTimeout(() => {
    console.log(removedCardArray);
    // for (let i = 0; i < removedCardArray.length; i += 1) {
    //   const card = createCard();
    //   card.classList.add(removedCardArray[i]);
    // }
    allCardDomsArray.forEach(
      (x) => {
        x.classList.add('dealing');
        x.addEventListener('click', clickCard);
      },
    );
  }, 1000);
};

/** @event listener events */
dealBtn.addEventListener('click', clickDeal);
betBtn.addEventListener('click', clickBet);
