const numRows = 20;
const numCols = 20;
const cellSize = 20;
const initialSnakeLength = 5;
const speed = 100; // milliseconds

let snake = [];
let direction = 'right';
let foodPosition = { row: 0, col: 0 };
let gameInterval;

function initializeGameBoard() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-col', j);
      cell.style.width = cellSize + 'px';
      cell.style.height = cellSize + 'px';
      cell.style.top = i * cellSize + 'px';
      cell.style.left = j * cellSize + 'px';
      gameBoard.appendChild(cell);
    }
  }

  for (let i = 0; i < initialSnakeLength; i++) {
    snake.push({ row: 0, col: i });
  }

  generateFood();
}

function generateFood() {
  const randomRow = Math.floor(Math.random() * numRows);
  const randomCol = Math.floor(Math.random() * numCols);
  foodPosition = { row: randomRow, col: randomCol };
  const foodCell = document.querySelector(`.cell[data-row="${randomRow}"][data-col="${randomCol}"]`);
  foodCell.classList.add('food');
}

function updateSnake() {
  const head = snake[snake.length - 1];
  let newRow = head.row;
  let newCol = head.col;

  switch (direction) {
    case 'up':
      newRow--;
      break;
    case 'down':
      newRow++;
      break;
    case 'left':
      newCol--;
      break;
    case 'right':
      newCol++;
      break;
  }

  const newHead = { row: newRow, col: newCol };
  snake.push(newHead);

  const isFoodEaten = newRow === foodPosition.row && newCol === foodPosition.col;

  if (isFoodEaten) {
    generateFood();
  } else {
    const removedTail = snake.shift();
    const tailCell = document.querySelector(`.cell[data-row="${removedTail.row}"][data-col="${removedTail.col}"]`);
    tailCell.classList.remove('snake');
  }

  const newHeadCell = document.querySelector(`.cell[data-row="${newRow}"][data-col="${newCol}"]`);
  newHeadCell.classList.add('snake');
}

function checkCollision() {
  const head = snake[snake.length - 1];

  // Check collision with walls
  if (head.row < 0 || head.row >= numRows || head.col < 0 || head.col >= numCols) {
    clearInterval(gameInterval);
    alert('Game over! You hit a wall.');
  }

  // Check collision with itself
  for (let i = 0; i < snake.length - 1; i++) {
    if (head.row === snake[i].row && head.col === snake[i].col) {
      clearInterval(gameInterval);
      alert('Game over! You collided with yourself.');
    }
  }
}

function updateGame() {
  updateSnake();
  checkCollision();
}

function startGame() {
  initializeGameBoard();
  gameInterval = setInterval(updateGame, speed);
}

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  } else if (key === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  } else if (key === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  } else if (key === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  }
});

startGame();