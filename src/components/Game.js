import React, { useEffect, useState } from 'react'
import Board from "./Board";
import createBoard from "../util/createBoard";
import Timer from "./Timer";
import Modal from "./Modal";
import "./Game.css";

export default function Game() {
    const numOfRows = 10
    const numOfCols = 10
    const numOfBombs = 30

    const [gameOver, setGameOver] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [boardData, setBoardData] = useState({
        board: [],
        minesLocations: [],
        numOfNonBombs: 0
    });
    const [time, setTime] = useState(0);

    useEffect(() => {
        let timer;
        if (!gameOver && gameStarted) {
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
    }, [gameOver, gameStarted]);

    useEffect(() => {
        if (gameOver) {
            // Delay showing the modal by 1500ms
            const timer = setTimeout(() => {
                setShowModal(true);
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            setShowModal(false);
        }
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
        setShowModal(false);
        setGameStarted(true);
        setTime(0);
    };

    return (
        <div className='game-wrapper'>
            <div className={`game-container ${(!gameStarted || showModal) ? 'blur' : ''}`}>
                <Timer time={time} />
                <Board gameOver={gameOver}
                    setGameOver={setGameOver}
                    boardData={boardData}
                    setBoardData={setBoardData}
                    restartGame={restartGame}>
                </Board>
            </div>
            {(!gameStarted || showModal) && 
                <Modal 
                    restartGame={restartGame} 
                    isStart={!gameStarted && !showModal}
                />
            }
        </div>
    )
}