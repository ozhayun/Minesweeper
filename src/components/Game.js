import React, { useEffect, useState } from 'react'
import Board from "./Board";
import createBoard from "../util/createBoard";
import Timer from "./Timer";
import Modal from "./Modal";
import Controller from './Audio-Controller/Controller';
import "./Game.css";

export default function Game() {
    const numOfRows = 10
    const numOfCols = 10
    const numOfBombs = 30

    const [gameOver, setGameOver] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [boardData, setBoardData] = useState({
        board: [],
        minesLocations: [],
        numOfNonBombs: 0
    });
    const [time, setTime] = useState(0);

    useEffect(() => {
        let timer;
        if (!gameOver && gameStarted && !isPaused) {
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
    }, [gameOver, gameStarted, isPaused]);

    useEffect(() => {
        if (gameOver) {
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
        setIsPaused(false);
        setTime(0);
    };

    const handlePlayPause = (isPlaying) => {
        setIsPaused(!isPlaying);
    };

    return (
        <div className='game-wrapper'>
            <div className={`game-container ${(!gameStarted || showModal) ? 'blur' : ''}`}>
                    <Timer time={time} />
                    <div className={`game-container-no-controller ${isPaused ?'blur' : ''}`}>
                        <Board gameOver={gameOver}
                            setGameOver={setGameOver}
                            boardData={boardData}
                            setBoardData={setBoardData}
                            isPaused={isPaused}
                            restartGame={restartGame}>
                        </Board>
                    </div>
                    <Controller 
                        restartGame={restartGame}
                        onPlayPause={handlePlayPause}
                        disabled={!gameStarted || gameOver}
                    />           
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