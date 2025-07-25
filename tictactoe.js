// tictactoe.js
var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
];

// Changed to a function that can be called to initialize the game
function initializeTicTacToeGame() {
    // Select cells specific to the TicTacToe project's DOM
    const cells = document.querySelectorAll('#tictactoe-project .game-board .cell');
    const replayButton = document.querySelector('#tictactoe-project .endgame button'); // Select button inside endgame
    const endGameDiv = document.querySelector('#tictactoe-project .endgame');
    const endGameText = document.querySelector('#tictactoe-project .endgame .text');

    // Add null checks for robustness if elements might not be immediately present
    if (!cells || cells.length === 0 || !replayButton || !endGameDiv || !endGameText) {
        console.warn("TicTacToe elements not found. Skipping initialization.");
        return;
    }

    function startGame() {
        endGameDiv.style.display = "none"; // Hide the endgame div at the start
        origBoard = Array.from(Array(9).keys());
        for (var i = 0; i < cells.length; i++) {
            cells[i].innerText = '';
            cells[i].style.removeProperty('background-color');
            // Ensure old event listeners are removed before adding new ones
            cells[i].removeEventListener('click', turnClick, false);
            cells[i].addEventListener('click', turnClick, false);
        }
    }

    function turnClick(square) {
        if (typeof origBoard[square.target.id] == 'number') {
            turn(square.target.id, huPlayer);
            if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
        }
    }

    function turn(squareId, player) {
        origBoard[squareId] = player;
        document.getElementById(squareId).innerText = player;
        let gameWon = checkWin(origBoard, player);
        if (gameWon) gameOver(gameWon);
    }

    function checkWin(board, player) {
        let plays = board.reduce((a, e, i) =>
            (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        for (let [index, win] of winCombos.entries()) {
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = {index: index, player: player};
                break;
            }
        }
        return gameWon;
    }

    function gameOver(gameWon) {
        for (let index of winCombos[gameWon.index]) {
            document.getElementById(index).style.backgroundColor =
                gameWon.player == huPlayer ? "blue" : "red";
        }
        for (var i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
    }

    function declareWinner(who) {
        endGameText.innerText = who;
        endGameDiv.style.display = "flex"; // Show the endgame div
    }

    function emptySquares() {
        return origBoard.filter(s => typeof s == 'number');
    }

    function bestSpot() {
        return minimax(origBoard, aiPlayer).index;
    }

    function checkTie() {
        if (emptySquares().length == 0) {
            for (var i = 0; i < cells.length; i++) {
                cells[i].style.backgroundColor = "gray";
                cells[i].removeEventListener('click', turnClick, false);
            }
            declareWinner("Tie Game!");
            return true;
        }
        return false;
    }

    function minimax(newBoard, player) {
        var availSpots = emptySquares();

        if (checkWin(newBoard, huPlayer)) {
            return {score: -10};
        } else if (checkWin(newBoard, aiPlayer)) {
            return {score: 10};
        } else if (availSpots.length === 0) {
            return {score: 0};
        }
        var moves = [];
        for (var i = 0; i < availSpots.length; i++) {
            var move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;

            if (player == aiPlayer) {
                var result = minimax(newBoard, huPlayer);
                move.score = result.score;
            } else {
                var result = minimax(newBoard, aiPlayer);
                move.score = result.score;
            }

            newBoard[availSpots[i]] = move.index;

            moves.push(move);
        }

        var bestMove;
        if(player === aiPlayer) {
            var bestScore = -10000;
            for(var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 10000;
            for(var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    }

    // Attach event listener to the replay button
    replayButton.removeEventListener('click', startGame, false); // Prevent double-listening
    replayButton.addEventListener('click', startGame, false);

    // Initial call to startGame when initializeTicTacToeGame is called
    startGame();
}