function createBoard(row, col, bombs) {

    if (bombs > row * col) {
        bombs = Math.floor(row * col / 3);
    }

    const numOfNonBombs = row * col - bombs
    let board = createEmptyBoard(row, col)
    let minesLocations = [];
    plantBombsOnBoard(board, bombs, minesLocations)
    countNeighbors(board)
    return { board, numOfNonBombs, minesLocations };
}

function createEmptyBoard(row, col) {
    let board = [];
    for (let x = 0; x < row; x++) {
        let subCol = [];
        for (let y = 0; y < col; y++) {
            subCol.push({
                value: 0,
                revealed: false,
                x: x,
                y: y,
                flagged: false
            });
        }
        board.push(subCol);
    }
    return board;
}

function plantBombsOnBoard(board, bombs, mineLocation) {
    let rows = board.length;
    let cols = board[0].length;
    let bombPlantedCount = 0;

    while (bombPlantedCount < bombs) {
        let randRow = randomNum(0, rows - 1);
        let randCol = randomNum(0, cols - 1);

        // If the chosen spot doesn't already contain a bomb, plant one there
        if (board[randRow][randCol] !== 'B') {
            board[randRow][randCol].value = 'B';
            mineLocation.push([randRow, randCol])
            bombPlantedCount++;
        }
    }
}

function countNeighbors(board) {
    let rows = board.length;
    let cols = board[0].length;
    // Add Numbers
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c].value === "B") {
                continue;
            }

            // Top
            if (r > 0 && board[r - 1][c].value === "B") {
                board[r][c].value++;
            }

            // Top Right
            if (
                r > 0 &&
                c < cols - 1 &&
                board[r - 1][c + 1].value === "B"
            ) {
                board[r][c].value++;
            }

            // Right
            if (c < cols - 1 && board[r][c + 1].value === "B") {
                board[r][c].value++;
            }

            // Botoom Right
            if (
                r < rows - 1 &&
                c < cols - 1 &&
                board[r + 1][c + 1].value === "B"
            ) {
                board[r][c].value++;
            }

            // Bottom
            if (r < rows - 1 && board[r + 1][c].value === "B") {
                board[r][c].value++;
            }

            // Bottom Left
            if (
                r < rows - 1 &&
                c > 0 &&
                board[r + 1][c - 1].value === "B"
            ) {
                board[r][c].value++;
            }

            // LEft
            if (c > 0 && board[r][c - 1].value === "B") {
                board[r][c].value++;
            }

            // Top Left
            if (r > 0 && c > 0 && board[r - 1][c - 1].value === "B") {
                board[r][c].value++;
            }
        }
    }
}

function randomNum(min = 0, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export default createBoard



