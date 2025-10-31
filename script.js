const CHOICES = /** @type {const} */ (['rock', 'paper', 'scissors']);

const playerScoreEl = document.querySelector('#player-score');
const computerScoreEl = document.querySelector('#computer-score');
const playerChoiceEl = document.querySelector('#player-choice');
const computerChoiceEl = document.querySelector('#computer-choice');
const outcomeEl = document.querySelector('#outcome');
const choiceButtons = document.querySelectorAll('[data-choice]');

const score = {
  player: 0,
  computer: 0,
};

function getComputerChoice() {
  const index = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[index];
}

/**
 * Determine winner given player and computer choices.
 * @param {string} player
 * @param {string} computer
 * @returns {'win' | 'lose' | 'draw'}
 */
function getOutcome(player, computer) {
  if (player === computer) return 'draw';

  const winningPairs = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };

  return winningPairs[player] === computer ? 'win' : 'lose';
}

function updateScoreboard() {
  playerScoreEl.textContent = score.player;
  computerScoreEl.textContent = score.computer;
}

function formatChoice(choice) {
  return choice.charAt(0).toUpperCase() + choice.slice(1);
}

function handlePlayerChoice(event) {
  const playerSelection = event.currentTarget.getAttribute('data-choice');
  if (!playerSelection) return;

  const computerSelection = getComputerChoice();
  const result = getOutcome(playerSelection, computerSelection);

  playerChoiceEl.textContent = `You chose: ${formatChoice(playerSelection)}`;
  computerChoiceEl.textContent = `Computer chose: ${formatChoice(computerSelection)}`;

  switch (result) {
    case 'win':
      outcomeEl.textContent = 'You win!';
      score.player += 1;
      break;
    case 'lose':
      outcomeEl.textContent = 'Computer wins!';
      score.computer += 1;
      break;
    default:
      outcomeEl.textContent = "It's a draw.";
      break;
  }

  updateScoreboard();
}

choiceButtons.forEach((button) => {
  button.addEventListener('click', handlePlayerChoice);
});

updateScoreboard();
