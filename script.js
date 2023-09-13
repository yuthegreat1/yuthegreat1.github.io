document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    function isBoardFull(board) {
        return board.every(cell => cell !== '');
    }
    
    function checkWinner(board, player) {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] === player && board[b] === player && board[c] === player) {
                return player;
            }
        }
        if (isBoardFull(board)){
        return "draw"
        }

        return false;
    }
    function minimax(board, depth, isMaximizing) {
        if (checkWinner(board, 'X')) {
            return -1;
        } else if (checkWinner(board, 'O')) {
            return 1;
        } else if (isBoardFull(board)) {
            return 0;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    const score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    const score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function findBestMove(board) {
        let bestMove = -1;
        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                const score = minimax(board, 0, false);
                board[i] = '';

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    function handleCellClick(event) {
        const cellIndex = event.target.id.split('-')[1];

        if (!gameBoard[cellIndex] && !gameOver) {
            gameBoard[cellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s Turn`;

            const winner = checkWinner(gameBoard, currentPlayer);
            if (winner) {
                gameOver = true;
                if (winner === 'draw') {
                    message.textContent = 'It\'s a Draw!';
                } else {
                    message.textContent = `Player ${winner} wins!`;
                }
            } else if (currentPlayer === 'O' && !isBoardFull(gameBoard)) {
                setTimeout(() => {
                    const bestMove = findBestMove(gameBoard);
                    if (bestMove !== -1) {
                        gameBoard[bestMove] = currentPlayer;
                        cells[bestMove].textContent = currentPlayer;
                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                        message.textContent = `Player ${currentPlayer}'s Turn`;
                    }
                }, 500);
            }
        }
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        message.textContent = 'Player X\'s Turn';
        gameOver = false;
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    resetGame();
});
