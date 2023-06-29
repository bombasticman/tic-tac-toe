const player = (name, sign) => {
  return { name, sign };
};

const gameboard = ((
  player1 = player("player1", "X"),
  player2 = player("player2", "O")
) => {
  const makeBoard = () => {
    const board = new Array(9).fill(null);
    return board;
  };
  currentPlayer = player1;
  const makeMove = (board, index, cell) => {
    if (board[index] === null) {
      board[index] = currentPlayer.sign;
      cell.innerText = currentPlayer.sign;
      const checkwin = (board, playerSign) => {
        const winningCombinations = [
          [0, 1, 2], // Top row
          [3, 4, 5], // Middle row
          [6, 7, 8], // Bottom row
          [0, 3, 6], // Left column
          [1, 4, 7], // Middle column
          [2, 5, 8], // Right column
          [0, 4, 8], // Diagonal from top-left to bottom-right
          [2, 4, 6], // Diagonal from top-right to bottom-left
        ];
        for (let combination of winningCombinations) {
          const [a, b, c] = combination;
          if (
            board[a] === playerSign &&
            board[b] === playerSign &&
            board[c] === playerSign
          ) {
            return true;
          }
        }
        if (board.every((cell) => cell !== null)) {
          return alert("It's a draw!");
        }
        return false;
      };
      if (checkwin(board, currentPlayer.sign)) {
        alert(`${currentPlayer.name} won!`);
        return;
      }
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  };
  return { makeBoard, makeMove };
})();

function populateUI(board) {
  document.getElementById("start").addEventListener("click", () => {
    drawBoard(gameboard.makeBoard());
  });
  function drawBoard(board) {
    for (let index = 0; index < board.length; index++) {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.addEventListener("click", () => {
        gameboard.makeMove(board, index, cell);
      });
      document.getElementById("gameBoard").appendChild(cell);
    }
  }
}

populateUI();
