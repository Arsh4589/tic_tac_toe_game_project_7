const board = document.getElementById("board"); 
const result = document.getElementById("result"); 
const restartButton = document.getElementById("restart-button"); 
let currentPlayer = "X"; let cells = ["", "", "", "", "", "", "", "", ""]

function checkWin() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }

    if (cells.includes("") === false) {
        return "T"; 
    }

    return null;
}

function handleClick(event) {
    const cellIndex = event.target.dataset.index;
    if (cells[cellIndex] === "" && !result.textContent) {
        cells[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        const winner = checkWin();
        if (winner) {
            if (winner === "T") {
                result.textContent = "It's a Tie!";
            } else {
                result.textContent = `${winner} wins!`;
            }
        }
    }
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}

createBoard();

restartButton.addEventListener("click", () => { 
   cells = ["", "", "", "", "", "", "", "", ""]; 
   currentPlayer = "X"; result.textContent = ""; 
   document.querySelectorAll(".cell").forEach(
     cell => { 
         cell.textContent = ""; 
     }); 
});