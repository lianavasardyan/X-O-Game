function buildBoard(size) {
    const statusDiv = document.getElementById("status");
    statusDiv.innerText = "";
  
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = ""; 
    gameDiv.style.gridTemplateColumns = `repeat(${size}, 64px)`; 
  
    const gameMatrix = Array.from({ length: size }, () => Array(size).fill(""));
    let hod = 0;
    let gameOver = false;
  
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const block = document.createElement("div");
        block.className = "block";
        block.dataset.row = i;
        block.dataset.col = j;
        gameDiv.appendChild(block);
      }
    }
  
    function showMessage(msg) {
      statusDiv.innerText = msg;
    }
  
    function checkWinner() {
      for (let i = 0; i < size; i++) {
        if (gameMatrix[i].every((c) => c === "X")) return "X wins!";
        if (gameMatrix[i].every((c) => c === "O")) return "O wins!";
      }
      for (let j = 0; j < size; j++) {
        if (gameMatrix.every((r) => r[j] === "X")) return "X wins!";
        if (gameMatrix.every((r) => r[j] === "O")) return "O wins!";
      }
      if (gameMatrix.every((r, idx) => r[idx] === "X")) return "X wins!";
      if (gameMatrix.every((r, idx) => r[idx] === "O")) return "O wins!";
      if (gameMatrix.every((r, idx) => r[size - 1 - idx] === "X")) return "X wins!";
      if (gameMatrix.every((r, idx) => r[size - 1 - idx] === "O")) return "O wins!";
  
      const filled = gameMatrix.flat().every((c) => c !== "");
      if (filled) return "It's a draw.";
  
      return null;
    }
  
    gameDiv.onclick = function (event) {
      if (gameOver) return;
      const el = event.target;
      if (el.className.includes("block") && el.innerHTML === "") {
        const row = parseInt(el.dataset.row, 10);
        const col = parseInt(el.dataset.col, 10);
        const symbol = hod % 2 === 0 ? "X" : "O";
  
        el.innerHTML = symbol;
        el.classList.add(symbol.toLowerCase()); 
        gameMatrix[row][col] = symbol;
        hod++;
  
        const result = checkWinner();
        if (result) {
          showMessage(result);
          gameOver = true;
        }
      }
    };
  }
  
  document.getElementById("startBtn").onclick = function () {
    const size = Math.max(3, parseInt(document.getElementById("boardSize").value, 10) || 3);
    buildBoard(size);
  };
  
  window.onload = function () {
    buildBoard(3);
  };
  