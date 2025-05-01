const canvas = document.getElementById('snakeGameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{x: 10, y: 10}];
let food = {x: 5, y: 5};
let direction = 'right';
let score = 0;

function gameLoop() {
  moveSnake();
  checkCollisions();
  drawGame();
}

function moveSnake() {
  let head = {...snake[0]};
  if (direction === 'right') head.x++;
  if (direction === 'left') head.x--;
  if (direction === 'up') head.y--;
  if (direction === 'down') head.y++;

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }
}

function checkCollisions() {
  const head = snake[0];
  if (head.x < 0 || head.y < 0 || head.x >= 20 || head.y >= 20 || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
    alert('Game Over!');
    resetGame();
  }
}

function placeFood() {
  food.x = Math.floor(Math.random() * 20);
  food.y = Math.floor(Math.random() * 20);
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  snake.forEach(segment => ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20));
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
  if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

function startGame() {
  snake = [{x: 10, y: 10}];
  direction = 'right';
  score = 0;
  gameLoopInterval = setInterval(gameLoop, 100);
}

function resetGame() {
  clearInterval(gameLoopInterval);
  startGame();
}

startGame();
