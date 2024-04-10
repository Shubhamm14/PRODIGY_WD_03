const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const toggleModeButton = document.getElementById('toggleModeButton');
let playerTurn = 'X';
let gameOver = false;
let computerPlayer = false; // Flag to indicate if playing against the computer

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
toggleModeButton.addEventListener('click', toggleMode);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.dataset.cellIndex);

    if (cell.textContent !== '' || gameOver) {
        return;
    }

    cell.textContent = playerTurn;
    checkWinner();

    if (!gameOver) {
        playerTurn = playerTurn === 'X' ? 'O' : 'X';
        if (computerPlayer && playerTurn === 'O') {
            setTimeout(computerTurn, 500); // Delay for computer move
        }
    }
}

function computerTurn() {
    let emptyCells = [];
    cells.forEach((cell, index) => {
        if (cell.textContent === '') {
            emptyCells.push(index);
        }
    });

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cellIndex = emptyCells[randomIndex];
    cells[cellIndex].textContent = playerTurn;
    playerTurn = 'X'; // Assuming computer always plays 'O'

    checkWinner();
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const cellA = cells[condition[0]].textContent;
        const cellB = cells[condition[1]].textContent;
        const cellC = cells[condition[2]].textContent;

        if (cellA === cellB && cellB === cellC && cellA !== '') {
            gameOver = true;
            message.textContent = `Winner: ${cellA}`;
            return;
        }
    }

    let isTie = true;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            isTie = false;
            break;
        }
    }

    if (isTie) {
        gameOver = true;
        message.textContent = "It's a Tie!";
    }
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    message.textContent = '';
    playerTurn = 'X';
    gameOver = false;
}

function toggleMode() {
    computerPlayer = !computerPlayer;
    message.textContent = '';
    restartGame();
    if (computerPlayer) {
        message.textContent = 'Playing against the computer';
    } else {
        message.textContent = 'Playing against another player';
    }
}
