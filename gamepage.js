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
