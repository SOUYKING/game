// JavaScript for Souy's Game

let currentStage = 1;
let hintCount = 0;
const maxHints = 2;
let timeLeft = 300; // 5 minutes timer
let timerInterval;

// Game Initialization
function initGame() {
  updateTimer();
  updateHintUsage();
  showStage(1);
  startTimer();
}

// Timer Functionality
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      endGame("Time's up! You've lost the game. Try again later.");
    }
  }, 1000);
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer-value").innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Hint Usage
function showHint(stage) {
  if (hintCount < maxHints) {
    document.getElementById(`hint${stage}`).style.display = "block";
    hintCount++;
    updateHintUsage();
  } else {
    alert("You've used all your hints!");
  }
}

function updateHintUsage() {
  document.getElementById("hints-used").innerText = `${hintCount} / ${maxHints}`;
}

// Stage 1: Caesar Cipher Decryption
function checkStage1() {
  const userInput = document.getElementById("stage1-input").value.toLowerCase();
  if (userInput === "this is a secret message") {
    showStage(2);
  } else {
    document.getElementById("message1").innerText = "Incorrect key. Try again.";
  }
}

// Memory Game Variables
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;

// Memory Game Initialization
function startMemoryGame() {
  // Reset variables
  memoryCards = [
    "A", "A", "B", "B", "C", "C", "D", "D",
    "E", "E", "F", "F", "G", "G", "H", "H"
  ];
  memoryCards = shuffle(memoryCards);
  flippedCards = [];
  matchedPairs = 0;

  // Create memory game grid
  const memoryGrid = document.getElementById("memory-game");
  memoryGrid.innerHTML = ""; // Clear previous grid
  for (let i = 0; i < memoryCards.length; i++) {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.dataset.value = memoryCards[i];
    card.addEventListener("click", () => flipCard(card));
    memoryGrid.appendChild(card);
  }
}

// Shuffle the memory cards array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Flip a memory card
function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    card.innerText = card.dataset.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check for a match
function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    flippedCards = [];
    matchedPairs++;

    if (matchedPairs === memoryCards.length / 2) {
      showStage(3); // Move to the next stage after all pairs are matched
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "";
      card2.innerText = "";
      flippedCards = [];
    }, 1000); // Flip back after 1 second
  }
}

// Show specific stage
function showStage(stageNumber) {
  document.querySelectorAll(".stage").forEach(stage => stage.style.display = "none");
  const stage = document.getElementById(`stage${stageNumber}`);
  if (stage) {
    stage.style.display = "block";
  } else {
    console.error(`Stage ${stageNumber} does not exist in the HTML.`);
  }

  if (stageNumber === 2) {
    startMemoryGame(); // Initialize memory game for stage 2
  }
}

// Final Stage: Hidden Key Grid Puzzle
function checkFinalStage() {
  const userInput = document.getElementById("final-input").value.toUpperCase();
  if (userInput === "SUBMIT") {
    endGame("Congratulations! You've completed the game.");
  } else {
    document.getElementById("final-message").innerText = "Incorrect key. Try again.";
  }
}

// End Game Functionality
function endGame(message) {
  clearInterval(timerInterval);
  alert(message);
  window.location.href = "index.html"; // Redirect to index after game ends
}

// Start the game when the page loads
window.onload = initGame;
