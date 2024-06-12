const cells = document.querySelectorAll('.cell');
const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    checkResult();
};

const checkResult = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.innerHTML = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        message.innerHTML = 'Draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const handleResetGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    message.innerHTML = '';
    cells.forEach(cell => cell.innerHTML = '');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);
