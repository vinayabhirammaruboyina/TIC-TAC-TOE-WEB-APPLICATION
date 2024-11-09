let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');

// Winning conditions
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

// Handle cell clicks
const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.dataset.index;

    if (board[clickedCellIndex] || !gameActive) return;

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('taken');
    checkForWinner();
};

// Check for winner or draw
const checkForWinner = () => {
    for (const [a, b, c] of winningConditions) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusDisplay.textContent = `${currentPlayer} has won!`;
            return (gameActive = false);
        }
    }
    if (!board.includes('')) {
        statusDisplay.textContent = "It's a draw!";
        return (gameActive = false);
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn.`;
};

// Reset game
const resetGame = () => {
    board.fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `It's ${currentPlayer}'s turn.`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
};

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
statusDisplay.textContent = `It's ${currentPlayer}'s turn.`;

