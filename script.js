const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const reset = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to handle cell click
function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        cells[index].textContent = currentPlayer;
        gameBoard[index] = currentPlayer;
        
        if (checkWin()) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            status.textContent = "It's a Tie!";
            gameActive = false;
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Function to check for a win
function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

// Event listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleCellClick(index);
    });
});

reset.addEventListener('click', () => {
    resetGame();
});

resetGame();
