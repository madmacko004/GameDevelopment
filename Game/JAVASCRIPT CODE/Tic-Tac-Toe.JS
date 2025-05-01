let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function makeMove(index) {
  if (gameOver || board[index]) return;
  board[index] = currentPlayer;
  document.querySelectorAll('.cell')[index].innerText = currentPlayer;
  if (checkWinner()) {
    setTimeout(() => {
      alert(currentPlayer + ' wins!');
      resetGame();
    }, 100);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
  currentPlayer = 'X';
}
