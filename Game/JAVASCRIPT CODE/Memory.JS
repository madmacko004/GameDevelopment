const cardImages = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍍', '🍍', '🍓', '🍓', '🍑', '🍑'];
let flippedCards = [];
let matchedCards = [];
let gameBoard = document.querySelector('.game-board');

// Shuffle the cards
function shuffleCards() {
  let shuffledCards = [...cardImages];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }
  return shuffledCards;
}

// Create the game board with shuffled cards
function createGameBoard() {
  const shuffledImages = shuffleCards();
  gameBoard.innerHTML = '';

  shuffledImages.forEach((image, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    // Front will show question mark by default

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.innerText = image;  // Card value (emoji)

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip a card
function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped')) return;
  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

// Check if the flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;
  const card1Value = card1.querySelector('.card-back').innerText;
  const card2Value = card2.querySelector('.card-back').innerText;

  if (card1Value === card2Value) {
    matchedCards.push(card1, card2);
    flippedCards = [];
    card1.classList.add('matched');
    card2.classList.add('matched');
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
    if (matchedCards.length === cardImages.length) {
      setTimeout(() => {
        alert('You win! All cards matched!');
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Restart the game
function startGame() {
  flippedCards = [];
  matchedCards = [];
  createGameBoard();
}

// Initialize the game
window.onload = createGameBoard;
