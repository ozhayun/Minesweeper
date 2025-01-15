import React, { useEffect, useState } from 'react'
import Board from "./Board";
import createBoard from "../util/createBoard";
import Timer from "./Timer";

export default function Game() {
    const numOfRows = 10
    const numOfCols = 10
    const numOfBombs = 30

    const [gameOver, setGameOver] = useState(false)
    const [boardData, setBoardData] = useState({
        board: [],
        minesLocations: [],
        numOfNonBombs: 0
    });
    const [time, setTime] = useState(0);

    useEffect(() => {
        let timer;
        if (!gameOver) {
            timer = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }
        return () => {
            clearInterval(timer);
            if (gameOver) {
                setTime(0);
            }
        };
    }, [gameOver]);

    useEffect(() => {
        refreshBoard()
    }, []);

    const refreshBoard = () => {
        const newBoard = createBoard(numOfRows, numOfCols, numOfBombs);
        setBoardData(newBoard);
    };

    const restartGame = () => {
        refreshBoard();
        setGameOver(false);
        setTime(0);
    };

    return (
        <div className='game'>
            <Timer time={time} />
            <Board gameOver={gameOver}
                setGameOver={setGameOver}
                boardData={boardData}
                setBoardData={setBoardData}
                restartGame={restartGame}>
            </Board>
        </div>
    )
}