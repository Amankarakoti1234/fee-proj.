
const startBtn = document.getElementById('start-btn');
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');

let score = 0;
let timeLeft = 30;
let gameInterval;
let targetInterval;

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;

    gameInterval = setInterval(countDown, 1000);
    targetInterval = setInterval(spawnTarget, 1000);
    startBtn.disabled = true;
}

function countDown() {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
        clearInterval(gameInterval);
        clearInterval(targetInterval);
        alert(`Game Over! Your final score is ${score}`);
        startBtn.disabled = false;
    }
}

function spawnTarget() {
    const target = document.createElement('div');
    target.classList.add('target');

    // Random position within the game board
    const x = Math.random() * (gameBoard.offsetWidth - 50);
    const y = Math.random() * (gameBoard.offsetHeight - 50);

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
        target.remove();
    });

    gameBoard.appendChild(target);

    // Remove the target after 800ms if not clicked
    setTimeout(() => {
        target.remove();
    }, 800);
}

startBtn.addEventListener('click', startGame);
