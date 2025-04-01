let currentPlayer = 'X';
let NUMBER_OF_ROWS = 3;
let board;
let turns = NUMBER_OF_ROWS ** 2;
let turnsCounter = 0;
let scoreX = 0;
let scoreO = 0;
const maxDepth = 1;
let currentLanguage = 'en';

const translations = {
  en: {
    title: 'X-O Game',
    startGame: 'Start New Game',
    reset: 'Reset',
    playAgain: 'Play Again',
    playerX: 'Player X',
    playerO: 'Player O',
    winMessage: player => `Player ${player} won!`,
    drawMessage: "It's a draw",
  },
  ar: {
    title: 'لعبة X-O',
    startGame: 'ابدأ لعبة جديدة',
    reset: 'إعادة تعيين',
    playAgain: 'العب مرة أخرى',
    playerX: 'اللاعب X',
    playerO: 'اللاعب O',
    winMessage: player => `فاز اللاعب ${player}!`,
    drawMessage: 'تعادل',
  },
};

const changeLanguage = lang => {
  currentLanguage = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  updateTexts();
};

const updateTexts = () => {
  const t = translations[currentLanguage];
  document.title = t.title;
  document.querySelector('#start-game').textContent = t.startGame;
  document.querySelector('#reset').textContent = t.reset;
  document.querySelector('#restart-button').textContent = t.playAgain;
  document.querySelector(
    '.score p:nth-child(1)',
  ).firstChild.textContent = `${t.playerX}: `;
  document.querySelector(
    '.score p:nth-child(2)',
  ).firstChild.textContent = `${t.playerO}: `;
};
const startButton = document.querySelector('#start-game');

const startGame = () => {
  board = Array.from({ length: NUMBER_OF_ROWS }, () =>
    Array(NUMBER_OF_ROWS).fill('_'),
  );
  scoreX = 0;
  scoreO = 0;
  document.querySelector('.score-x').textContent = scoreX;
  document.querySelector('.score-o').textContent = scoreO;
  resetBoard();
  updateTexts();
};

startButton.addEventListener('click', startGame);

const resetButton = document.querySelector('#reset');
const restartButton = document.querySelector('#restart-button');

const getCellPlacement = (index, numberOfRows) => {
  const row = Math.floor(index / NUMBER_OF_ROWS);
  const col = index % NUMBER_OF_ROWS;

  return [row, col];
};

const minimax = (board, depth, isMaximizing, maxDepth) => {
  if (checkWin('O')) return 10 - depth;
  if (checkWin('X')) return depth - 10;
  if (isBoardFull()) return 0;
  if (depth >= maxDepth) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < NUMBER_OF_ROWS; i++) {
      for (let j = 0; j < NUMBER_OF_ROWS; j++) {
        if (board[i][j] === '_') {
          board[i][j] = 'O';
          let score = minimax(board, depth + 1, false, maxDepth);
          board[i][j] = '_';
          bestScore = Math.max(bestScore, score);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < NUMBER_OF_ROWS; i++) {
      for (let j = 0; j < NUMBER_OF_ROWS; j++) {
        if (board[i][j] === '_') {
          board[i][j] = 'X';
          let score = minimax(board, depth + 1, true, maxDepth);
          board[i][j] = '_';
          bestScore = Math.min(bestScore, score);
        }
      }
    }
    return bestScore;
  }
};

const findBestMove = () => {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    for (let j = 0; j < NUMBER_OF_ROWS; j++) {
      if (board[i][j] === '_') {
        board[i][j] = 'O';
        let score = minimax(board, 0, false, maxDepth);
        board[i][j] = '_';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  return move;
};

const computerMove = () => {
  const { i, j } = findBestMove();
  board[i][j] = 'O';
  turnsCounter++;
  const cellIndex = i * NUMBER_OF_ROWS + j;
  const cell = document.querySelectorAll('.cell')[cellIndex];
  drawMarkInCell(cell, 'O');

  if (checkWin('O')) {
    runWinEvent('O');
  } else if (turnsCounter === turns) {
    runDrawEvent();
  } else {
    currentPlayer = 'X';
  }
};

const checkRows = currentPlayer => {
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    let column = 0;
    while (column < NUMBER_OF_ROWS) {
      if (board[row][column] === currentPlayer) {
        column++;
      } else {
        break;
      }
    }
    if (column === NUMBER_OF_ROWS) {
      return true;
    }
  }
  return false;
};
const checkColumns = currentPlayer => {
  for (let column = 0; column < NUMBER_OF_ROWS; column++) {
    let row = 0;
    while (row < NUMBER_OF_ROWS) {
      if (board[row][column] === currentPlayer) {
        row++;
      } else {
        break;
      }
    }
    if (row === NUMBER_OF_ROWS) {
      return true;
    }
  }
  return false;
};

const checkDiagonals = player => {
  let count = 0;
  while (count < NUMBER_OF_ROWS) {
    if (board[count][count] === player) {
      count++;
    } else {
      break;
    }
  }

  if (count === NUMBER_OF_ROWS) {
    return true;
  }
  return false;
};
const checkReverseDiagonals = player => {
  let count = 0;
  while (count < NUMBER_OF_ROWS) {
    if (board[count][NUMBER_OF_ROWS - 1 - count] === player) {
      count++;
    } else {
      break;
    }
  }

  if (count === NUMBER_OF_ROWS) {
    return true;
  }
  return false;
};

const isBoardFull = () => {
  return board.every(row => row.every(cell => cell !== '_'));
};

const checkWin = player => {
  return (
    checkRows(player) ||
    checkColumns(player) ||
    checkDiagonals(player) ||
    checkReverseDiagonals(player)
  );
};

const resetBoard = () => {
  board = Array.from({ length: NUMBER_OF_ROWS }, () =>
    Array(NUMBER_OF_ROWS).fill('_'),
  );

  turnsCounter = 0;
  currentPlayer = 'X';
  const boardElement = document.querySelector('.board');
  if (boardElement) {
    boardElement.remove();
  }

  const messageElement = document.getElementById('game-message');
  messageElement.style.display = 'none';
  makeBoard();
  updateTexts();
};

const runWinEvent = player => {
  const messageElement = document.getElementById('game-message');
  const messageText = document.getElementById('message-text');
  messageText.textContent = translations[currentLanguage].winMessage(player);
  messageElement.style.display = 'block';

  if (player === 'X') {
    scoreX++;
    document.querySelector('.score-x').textContent = scoreX;
  } else {
    scoreO++;
    document.querySelector('.score-o').textContent = scoreO;
  }
};
const runDrawEvent = () => {
  const messageElement = document.getElementById('game-message');
  const messageText = document.getElementById('message-text');
  messageText.textContent = translations[currentLanguage].drawMessage;
  messageElement.style.display = 'block';
};

const drawMarkInCell = (cell, currentPlayer) => {
  cell.querySelector('.value').textContent = currentPlayer;
  cell.classList.add(`cell--${currentPlayer}`);
};

const cellClickHandler = (event, index) => {
  const cell = event.target;
  const [row, col] = getCellPlacement(index, NUMBER_OF_ROWS);

  if (board[row][col] === '_' && currentPlayer === 'X') {
    turnsCounter++;
    board[row][col] = 'X';

    drawMarkInCell(cell, 'X');

    if (checkWin('X')) {
      runWinEvent('X');
    } else if (turnsCounter === turns) {
      runDrawEvent();
    } else {
      currentPlayer = 'O';
      setTimeout(computerMove, 150);
    }
  }
};

const makeBoard = () => {
  const container = document.querySelector('.container');
  const boardElement = document.createElement('div');
  boardElement.classList.add('board');

  for (let i = 0; i < turns; i++) {
    const cellElementString = `<div class="cell" role="button" tabindex="0"><span class="value"></span></div>`;
    const cellElement = document
      .createRange()
      .createContextualFragment(cellElementString);

    cellElement.querySelector('.cell').onclick = event =>
      cellClickHandler(event, i);
    cellElement.querySelector('.cell').onkeydown = event =>
      event.key === 'Enter' ? cellClickHandler(event, i) : true;

    boardElement.appendChild(cellElement);
  }
  document.documentElement.style.setProperty('--grid-rows', NUMBER_OF_ROWS);
  container.insertAdjacentElement('afterbegin', boardElement);
};
resetButton.addEventListener('click', resetBoard);

restartButton.addEventListener('click', resetBoard);
