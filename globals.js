/** @global array to save username and bank balance */
const userInfo = [];

/** @global selectors */
const playBtn = document.querySelector('.playbtn');
const loginBox = document.querySelector('.loginbox');
const styleBox = document.querySelector('.stylepoints');
const inputUsername = document.querySelector('#username');
const inputBalance = document.querySelector('#bankrollamount');
const registrationPage = document.querySelector('.registrationpage');
const playerNameDisplay = document.querySelector('.playername');
const playerAccountDisplay = document.querySelector('.playeraccount');
const gamePage = document.querySelector('.gamepage');
const gameMessage = document.querySelector('.gamemessage');
const gameInfoBox = document.querySelector('.gameinfobox');
const dealBtn = document.querySelector('.dealbutton');
const betBtn = document.querySelector('.pokerchip');
const betDisplay = document.querySelector('.betnumber');
const cardContainer = document.querySelector('.cardcontainer');
const root = document.documentElement;

/** @global audio */
const audioEntryNoise = document.querySelector('.entrynoise');
const audioWhiteNoise = document.querySelector('.whitenoise');
const oneChipSfx = document.querySelector('.onechipsfx');
const threeChipSfx = document.querySelector('.threechipsfx');
const fiveChipSfx = document.querySelector('.fivechipsfx');
const dealCardSfx = document.querySelector('.dealcardsfx');
const winSfxOne = document.querySelector('.winsfx');
const winSfxTwo = document.querySelector('.winsfx2');
const winSfxThree = document.querySelector('.winsfx3');
const winAudioArray = [winSfxOne, winSfxTwo, winSfxThree];
const failSfxOne = document.querySelector('.failsfx');
const failSfxTwo = document.querySelector('.failsfx2');
const failSfxThree = document.querySelector('.failsfx3');
const failAudioArray = [failSfxOne, failSfxTwo, failSfxThree];

/** @global gameplay related */
const STAKES_ROWS = 10;
const STAKES_COLUMNS = 6;
let gameState = 0;
let betAmount = 1;
let handScore = 0;
let suitCounter = 0;
let rankDifference = 0;
let rankFrequency = [0, 0, 0, 0, 0];
let highestHandRank = 0;
let lowestHandRank = 0;
let finalHandRanks = [];
let finalHandSuits = [];
