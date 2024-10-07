// Global variables for the game
let selectedSequence = []; // To track selected boxes in Stage 2
const correctSequence = [2, 3, 1, 4]; // Correct order for Stage 2 boxes
let timer; // Variable for timer interval
let timeLeft = 300; // 5 minutes in seconds (5 * 60)
let hintsUsed = 0; // Track number of hints used

// Timer function to start counting down
function startTimer() {
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up! You lost the game. Please try again.");
      window.location.href = "index.html"; // Redirect to index.html on timeout
    } else {
      timeLeft--;
      updateTimerDisplay();
    }
  }, 1000); // Update timer every second
}

// Function to display the timer value on the page
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer-value").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Show hints for each stage and track hint usage
function showHint(stage) {
  if (hintsUsed < 2) {
    document.getElementById(`hint${stage}`).style.display = "block"; // Display the hint for the specified stage
    hintsUsed++;
    document.getElementById("hints-used").innerText = `${hintsUsed}`; // Update the hints used display
  } else {
    alert("You have used all your available hints!");
  }
}

// Check the player's input for Stage 1 (Decrypt the Message)
function checkStage1() {
  const decryptedKey = "this is a secret message"; // Correct decrypted message

  // Get player's input and trim/normalize it
  const playerInput = document.getElementById("stage1-input").value.trim().toLowerCase();

  const messageElement = document.getElementById("message1");

  if (playerInput === decryptedKey) {
    messageElement.innerText = "Correct! You've decrypted the message and unlocked the next stage.";
    messageElement.style.color = "green";
    document.getElementById("stage1").style.display = "none"; // Hide Stage 1
    document.getElementById("stage2").style.display = "block"; // Show Stage 2
  } else {
    messageElement.innerText = "Incorrect key. Try again.";
    messageElement.style.color = "red";
  }
}

// Function to handle box selection in Stage 2
function selectBox(boxNumber) {
  const boxElement = document.getElementById(`box${boxNumber}`);

  // Check if the box is already in the sequence
  if (selectedSequence.includes(boxNumber)) {
    return; // Do nothing if the box is already selected
  }

  // Add the box number to the selected sequence
  selectedSequence.push(boxNumber);

  // Visually indicate the box is selected (highlight it)
  boxElement.style.border = '3px solid yellow'; // Change the border color and width as a visual indicator
}

// Check if the selected sequence matches the correct sequence for Stage 2
function checkStage2() {
  const messageElement = document.getElementById("message2");

  // Compare the selected sequence with the correct sequence
  if (selectedSequence.join('') === correctSequence.join('')) {
    messageElement.innerText = "Correct! You've unlocked the final stage.";
    messageElement.style.color = "green";
    document.getElementById("stage2").style.display = "none"; // Hide Stage 2
    document.getElementById("final-stage").style.display = "block"; // Show the final stage
  } else {
    messageElement.innerText = "Incorrect sequence. Try again.";
    messageElement.style.color = "red";
    // Reset the sequence and highlight
    resetStage2();
  }
}

// Function to reset the selected sequence and remove highlights for Stage 2
function resetStage2() {
  selectedSequence = []; // Clear the selected sequence

  // Remove highlights from all the boxes
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => box.style.border = 'none');
}

// Check the player's input for the Final Stage
function checkFinalStage() {
  const input = document.getElementById("final-input").value.toLowerCase();
  const messageElement = document.getElementById("final-message");

  if (input === "success") {
    clearInterval(timer); // Stop the timer
    messageElement.innerText = "Congratulations! You've completed the game.";
    messageElement.style.color = "green";
    alert("You win! Don't forget to send 'rb7tk' to Souy on Discord.");
  } else {
    messageElement.innerText = "Incorrect key. Try again.";
    messageElement.style.color = "red";
  }
}

// Start the timer automatically when the page loads
window.onload = function() {
  startTimer(); // Start the countdown timer
};
