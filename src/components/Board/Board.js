import Cell from "./Cell";
import "./Board.css"
import { revealed } from "../../util/reveal";
import { useEffect, useState } from "react";

const Board = ({ gameOver, setGameOver, boardData, setBoardData, isPaused, onStatsUpdate }) => {
    const [isGameEnded, setIsGameEnded] = useState(false);
    const [stats, setStats] = useState({
        revealed: 0,
        flagged: 0
    });

    useEffect(() => {
        if (gameOver) {
            setIsGameEnded(true);
        } else {
            setIsGameEnded(false);
        }
    }, [gameOver]);

    useEffect(() => {
        // Calculate and update stats whenever board changes
        const newStats = calculateBoardStats();
        setStats(newStats);
        onStatsUpdate?.(newStats.revealed, newStats.flagged);
    }, [boardData.board, calculateBoardStats, onStatsUpdate]);

    const calculateBoardStats = () => {
        if (!boardData.board) return { revealed: 0, flagged: 0 };
        
        let revealed = 0;
        let flagged = 0;
        
        boardData.board.forEach(row => {
            row.forEach(cell => {
                // Only count revealed cells that are not bombs
                if (cell.revealed && cell.value !== 'B') revealed++;
                if (cell.flagged) flagged++;
            });
        });
        
        return { revealed, flagged };
    };

    if (!boardData || !boardData.board) {
        console.error('boardData or boardData.board is undefined:', boardData);
        return <div>Loading...</div>;
    }

    const updateFlag = (e, x, y) => {
        if (isPaused) return;
        e.preventDefault()
        let newBoardData = JSON.parse(JSON.stringify(boardData))
        newBoardData.board[x][y].flagged = true;
        setBoardData(newBoardData)
    };

    const revealCell = (x, y) => {
        if (boardData.board[x][y].revealed || isGameEnded || isPaused) {
            return;
        }

        let newBoardData = JSON.parse(JSON.stringify(boardData))
        if (newBoardData.board[x][y].value === 'B') {
            // Reveal all bombs when one is clicked
            for (let i = 0; i < boardData.minesLocations.length; i++) {
                const [mineX, mineY] = boardData.minesLocations[i];
                newBoardData.board[mineX][mineY].revealed = true;
            }
            setBoardData(newBoardData);
            setIsGameEnded(true);
            setGameOver(true);
        } else {
            let newRevealedBoard = revealed(newBoardData.board, x, y, newBoardData.numOfNonBombs)
            if (newRevealedBoard) {
                newBoardData.board = newRevealedBoard.arr;
                newBoardData.numOfNonBombs = newRevealedBoard.newNonMinesCount;
                setBoardData(newBoardData);

                if (newRevealedBoard.newNonMinesCount === 0) {
                    setIsGameEnded(true);
                    setGameOver(true);
                }
            }
        }
    }

    return (
        <div className="Board">
            {boardData.board.map((singleRow, i) => {
                return (
                    <div key={i} className="rowBoard">
                        {singleRow.map((singleCell, j) => {
                            return (
                                <Cell key={j}
                                    cell={singleCell}
                                    updateFlag={(e) => updateFlag(e, i, j)}
                                    revealCell={() => revealCell(i, j)}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Board;

