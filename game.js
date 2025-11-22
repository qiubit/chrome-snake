// Game constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Game state
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop = null;
let gameSpeed = 100;
let isGameOver = false;

// UI elements
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const finalScoreElement = document.getElementById('finalScore');
const gameOverScreen = document.getElementById('gameOver');
const restartBtn = document.getElementById('restartBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

// Initialize high score display
highScoreElement.textContent = highScore;

// Keyboard controls
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  const W_KEY = 87;
  const A_KEY = 65;
  const S_KEY = 83;
  const D_KEY = 68;

  const keyPressed = event.keyCode;
  const goingUp = dy === -1;
  const goingDown = dy === 1;
  const goingRight = dx === 1;
  const goingLeft = dx === -1;

  if ((keyPressed === LEFT_KEY || keyPressed === A_KEY) && !goingRight) {
    dx = -1;
    dy = 0;
  }

  if ((keyPressed === UP_KEY || keyPressed === W_KEY) && !goingDown) {
    dx = 0;
    dy = -1;
  }

  if ((keyPressed === RIGHT_KEY || keyPressed === D_KEY) && !goingLeft) {
    dx = 1;
    dy = 0;
  }

  if ((keyPressed === DOWN_KEY || keyPressed === S_KEY) && !goingUp) {
    dx = 0;
    dy = 1;
  }
}

function drawGame() {
  if (isGameOver) return;

  clearCanvas();
  moveSnake();
  drawSnake();
  drawFood();
  checkCollision();
}

function clearCanvas() {
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
  if (dx === 0 && dy === 0) return; // Don't move if no direction set

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check if snake ate food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreElement.textContent = score;
    generateFood();

    // Increase speed slightly
    if (gameSpeed > 50) {
      gameSpeed -= 2;
      clearInterval(gameLoop);
      gameLoop = setInterval(drawGame, gameSpeed);
    }
  } else {
    snake.pop();
  }
}

function drawSnake() {
  snake.forEach((segment, index) => {
    if (index === 0) {
      // Draw head with a different color
      ctx.fillStyle = '#4CAF50';
    } else {
      // Draw body
      ctx.fillStyle = '#8BC34A';
    }

    ctx.fillRect(
      segment.x * gridSize,
      segment.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );

    // Add eyes to the head
    if (index === 0) {
      ctx.fillStyle = '#000';
      const eyeSize = 3;
      const eyeOffset = 5;

      // Determine eye position based on direction
      if (dx === 1) { // Moving right
        ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset, segment.y * gridSize + 4, eyeSize, eyeSize);
        ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset, segment.y * gridSize + gridSize - 7, eyeSize, eyeSize);
      } else if (dx === -1) { // Moving left
        ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 4, eyeSize, eyeSize);
        ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + gridSize - 7, eyeSize, eyeSize);
      } else if (dy === -1) { // Moving up
        ctx.fillRect(segment.x * gridSize + 4, segment.y * gridSize + 2, eyeSize, eyeSize);
        ctx.fillRect(segment.x * gridSize + gridSize - 7, segment.y * gridSize + 2, eyeSize, eyeSize);
      } else if (dy === 1) { // Moving down
        ctx.fillRect(segment.x * gridSize + 4, segment.y * gridSize + gridSize - eyeOffset, eyeSize, eyeSize);
        ctx.fillRect(segment.x * gridSize + gridSize - 7, segment.y * gridSize + gridSize - eyeOffset, eyeSize, eyeSize);
      }
    }
  });
}

function drawFood() {
  ctx.fillStyle = '#FF5722';
  ctx.beginPath();
  ctx.arc(
    food.x * gridSize + gridSize / 2,
    food.y * gridSize + gridSize / 2,
    gridSize / 2 - 2,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

function generateFood() {
  let newFood;
  let foodOnSnake;

  do {
    foodOnSnake = false;
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };

    // Check if food spawned on snake
    for (let segment of snake) {
      if (segment.x === newFood.x && segment.y === newFood.y) {
        foodOnSnake = true;
        break;
      }
    }
  } while (foodOnSnake);

  food = newFood;
}

function checkCollision() {
  const head = snake[0];

  // Wall collision
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    endGame();
    return;
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      endGame();
      return;
    }
  }
}

function endGame() {
  isGameOver = true;
  clearInterval(gameLoop);

  // Update high score
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('snakeHighScore', highScore);
    highScoreElement.textContent = highScore;
  }

  finalScoreElement.textContent = score;
  gameOverScreen.classList.remove('hidden');
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  food = { x: 15, y: 15 };
  dx = 0;
  dy = 0;
  score = 0;
  gameSpeed = 100;
  isGameOver = false;

  scoreElement.textContent = score;
  gameOverScreen.classList.add('hidden');

  clearInterval(gameLoop);
  gameLoop = setInterval(drawGame, gameSpeed);
  drawGame();
}

// Event listeners
restartBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

// Start the game
gameLoop = setInterval(drawGame, gameSpeed);
drawGame();
