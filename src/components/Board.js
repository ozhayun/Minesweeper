import Cell from "./Cell";
import "./Board.css"
import { revealed } from "../util/reveal";
import Modal from "./Modal";
import { useEffect, useState } from "react";

const Board = ({ gameOver, setGameOver, boardData, setBoardData, restartGame }) => {
    const [isGameEnded, setIsGameEnded] = useState(false);

    useEffect(() => {
        if (gameOver) {
            setIsGameEnded(true);
        } else {
            setIsGameEnded(false);
        }
    }, [gameOver]);

    if (!boardData || !boardData.board) {
        console.error('boardData or boardData.board is undefined:', boardData);
        return <div>Loading...</div>;
    }

    const updateFlag = (e, x, y) => {
        e.preventDefault()
        let newBoardData = JSON.parse(JSON.stringify(boardData))
        newBoardData.board[x][y].flagged = true;
        setBoardData(newBoardData)
    };

    const revealCell = (x, y) => {
        if (boardData.board[x][y].revealed || isGameEnded) {
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
            {/* {isGameEnded && <Modal restartGame={restartGame} />} */}
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

