// All valid moves, shared by the player and the computer when selecting choices.
const CHOICES = ["rock", "paper", "scissors"];

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");
const outcomeEl = document.getElementById("outcome");
const buttons = document.querySelectorAll(".choice");

let playerScore = 0;
let computerScore = 0;

// Register the main game loop on each button so a round is played when it is clicked.
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // The player's selection comes straight from the clicked button's data attribute.
    const playerChoice = button.dataset.choice;
    // Generate a pseudo-random response for the computer each round.
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    updateChoices(playerChoice, computerChoice);
    updateScores(result);
    updateOutcome(result);
    setActiveChoice(playerChoice);
  });
});

// Pick a random index from the choices array to simulate the computer's move.
function getComputerChoice() {
  const index = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[index];
}

function determineWinner(player, computer) {
  // A draw occurs whenever both selections match exactly.
  if (player === computer) {
    return "draw";
  }

  // Lookup table describing which choice defeats which opponent move.
  const winsAgainst = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  return winsAgainst[player] === computer ? "player" : "computer";
}

function updateChoices(player, computer) {
  // Update the UI to reflect the most recent round selections.
  playerChoiceEl.textContent = `You chose: ${formatChoice(player)}`;
  computerChoiceEl.textContent = `Computer chose: ${formatChoice(computer)}`;
}

function updateScores(result) {
  // Only increment the scoreboard when there is a winner.
  if (result === "player") {
    playerScore += 1;
  } else if (result === "computer") {
    computerScore += 1;
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function updateOutcome(result) {
  // Surface an easy-to-read message for the current round outcome.
  if (result === "draw") {
    outcomeEl.textContent = "It's a draw.";
  } else if (result === "player") {
    outcomeEl.textContent = "You win!";
  } else {
    outcomeEl.textContent = "Computer wins.";
  }
}

function formatChoice(choice) {
  return choice.charAt(0).toUpperCase() + choice.slice(1);
}

function setActiveChoice(selectedChoice) {
  // Highlight the button corresponding to the player's most recent selection.
  buttons.forEach((button) => {
    button.classList.toggle("choice--active", button.dataset.choice === selectedChoice);
  });
}
