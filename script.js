const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; 

function makeMove(index) {
    if (board[index] === '' && !checkWin()) {
        board[index] = currentPlayer;
        updateBoard();
        if (!checkWin() && !checkDraw()) {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            if (currentPlayer === 'O') { 
                aiMove();
            }
        }
    }
}

function aiMove() {
    const bestMove = minimax(board, 'O', -Infinity, Infinity).index;
    board[bestMove] = 'O';
    updateBoard();
    currentPlayer = 'X';
}

function minimax(board, player, alpha, beta) {
    let bestScore = player === 'O' ? -Infinity : Infinity;
    let bestMove = -1;

    const winner = checkWin();
    if (winner) {
        return { score: winner === 'O' ? 1 : (winner === 'X' ? -1 : 0), index: -1 };
    }
    if (checkDraw()){
        return {score: 0, index: -1};
    }

    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = player;
            let score;
            if (player === 'O') {
                score = minimax(board, 'X', alpha, beta).score;
            } else {
                score = minimax(board, 'O', alpha, beta).score;
            }
            board[i] = ''; 

            if (player === 'O') {
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
                alpha = Math.max(alpha, score);
            } else {
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
                beta = Math.min(beta, score);
            }
            if (beta <= alpha) break;  
        }
    }
    return { score: bestScore, index: bestMove };
}

function updateBoard() {
   
    for(let i = 0; i < 9; i++){
        document.getElementById(`cell-${i}`).textContent = board[i];
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function checkDraw(){
    return board.every(cell => cell !== '');
    }


for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).addEventListener('click', () => makeMove(i));
    }

function displayCongratulationPopup() {
    alert("Congratulation! Lets Play!");
    }

displayCongratulationPopup();


const congratulationBtn = document.getElementById('congratulationBtn');
const congratulationPopup = document.getElementById('congratulationPopup');
const closeBtn = document.querySelector('.close');
congratulationBtn.addEventListener('click', 

function() {
   congratulationPopup.style.display = 'block';
   });

closeBtn.addEventListener('click', function() {
  congratulationPopup.style.display = 'none';
  });



