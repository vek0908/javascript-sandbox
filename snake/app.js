// HTML elements
const gameBoard = document.getElementById('game-board');
const currentScore = document.getElementById('current');
const highestScore = document.getElementById('highest');
const instructionText = document.getElementById('instructions');

// Variables
const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Game functionality

// Draw new game
function drawGame() {
  gameBoard.innerHTML = '';
  drawSnake();
  drawFood();
  updateScore();
}

// Draw a snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
    gameBoard.appendChild(snakeElement);
  });
}

// Draw food for snake
function drawFood() {
  if (gameStarted) {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    gameBoard.appendChild(foodElement);
  }
}

// Create game elements (snake, food etc)
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Set the position of game elements
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

function generateFood() {
  const x = Math.floor(Math.random() * boardSize) + 1;
  const y = Math.floor(Math.random() * boardSize) + 1;
  return { x, y };
}

// Movement of the snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'right':
      head.x++;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      drawGame();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

// Start game function
function startGame() {
  gameStarted = true;
  instructionText.style.display = 'none';
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    drawGame();
  }, gameSpeedDelay);
}

// Event listener
function handleKeyPress(event) {
  if ((!gameStarted && event.code === 'Space') || (!gameStarted && event.key === ' ')) {
    startGame();
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
    }
  }
}

document.addEventListener('keydown', handleKeyPress);

function checkCollision() {
  const head = snake[0];

  if (head.x < 1 || head.x > boardSize || head.y < 1 || head.y > boardSize) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame() {
  updateHighestScore();
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
//  direction = 'right';
  gameSpeedDelay = 200;
  updateScore();
}

function updateScore() {
  const score = snake.length - 1;
  currentScore.textContent = score.toString().padStart(3, '0');
}

function stopGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  instructionText.style.display = 'block';
}

function updateHighestScore() {
  const score = snake.length - 1;
  if (score > highScore) {
    highScore = score;
    highestScore.textContent = highScore.toString().padStart(3, '0');
  }
  highestScore.style.display = 'block';
}

// function increaseSpeed() {
//   if (gameSpeedDelay > 150) {
//     gameSpeedDelay -= 5;
//   } else if (gameSpeedDelay > 90) {
//     gameSpeedDelay -= 2;
//   } 
// }
