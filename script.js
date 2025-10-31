const CHOICES = ["rock", "paper", "scissors"];

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");
const outcomeEl = document.getElementById("outcome");
const buttons = document.querySelectorAll(".choice");

let playerScore = 0;
let computerScore = 0;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    updateChoices(playerChoice, computerChoice);
    updateScores(result);
    updateOutcome(result);
    setActiveChoice(playerChoice);
  });
});

function getComputerChoice() {
  const index = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[index];
}

function determineWinner(player, computer) {
  if (player === computer) {
    return "draw";
  }

  const winsAgainst = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  return winsAgainst[player] === computer ? "player" : "computer";
}

function updateChoices(player, computer) {
  playerChoiceEl.textContent = `You chose: ${formatChoice(player)}`;
  computerChoiceEl.textContent = `Computer chose: ${formatChoice(computer)}`;
}

function updateScores(result) {
  if (result === "player") {
    playerScore += 1;
  } else if (result === "computer") {
    computerScore += 1;
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function updateOutcome(result) {
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
  buttons.forEach((button) => {
    button.classList.toggle("choice--active", button.dataset.choice === selectedChoice);
  });
}
