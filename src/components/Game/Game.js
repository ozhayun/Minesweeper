import React, { useEffect, useState, useCallback } from 'react'
import Board from "../Board/Board";
import createBoard from "../../util/createBoard";
import GameStats from "../Stats/GameStats";
import Modal from "../Modal/Modal";
import Controller from '../Audio-Controller/Controller';
import DifficultySelector from '../DifficultySelector/DifficultySelector';
import "./Game.css";

export default function Game() {
    const [boardConfig, setBoardConfig] = useState({
        rows: 8,
        cols: 8,
        bombs: 10
    });

    const [gameOver, setGameOver] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [viewingBoard, setViewingBoard] = useState(false)
    const [boardData, setBoardData] = useState({
        board: [],
        minesLocations: [],
        numOfNonBombs: 0
    });
    const [time, setTime] = useState(0);
    const [gameStats, setGameStats] = useState({
        revealedCells: 0,
        flaggedCells: 0,
        gamesWon: 0,
        totalGames: 0
    });

    const refreshBoard = useCallback(() => {
        const newBoard = createBoard(boardConfig.rows, boardConfig.cols, boardConfig.bombs);
        setBoardData(newBoard);
        setGameStats(prev => ({
            ...prev,
            revealedCells: 0,
            flaggedCells: 0
        }));
    }, [boardConfig]);

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
            setGameStats(prev => ({
                ...prev,
                totalGames: prev.totalGames + 1,
                gamesWon: prev.gamesWon + (boardData.numOfNonBombs === 0 ? 1 : 0)
            }));
            const timer = setTimeout(() => {
                setShowModal(true);
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            setShowModal(false);
            setViewingBoard(false);
        }
    }, [gameOver, boardData.numOfNonBombs]);

    useEffect(() => {
        refreshBoard()
    }, [refreshBoard]);

    const restartGame = () => {
        refreshBoard();
        setGameOver(false);
        setShowModal(false);
        setViewingBoard(false);
        setGameStarted(true);
        setIsPaused(false);
        setTime(0);
    };

    const handlePlayPause = (isPlaying) => {
        setIsPaused(!isPlaying);
    };

    const updateGameStats = (revealed, flagged) => {
        setGameStats(prev => ({
            ...prev,
            revealedCells: revealed,
            flaggedCells: flagged
        }));
    };

    const handleDifficultyChange = (config) => {
        setBoardConfig(config);
        if (gameStarted) {
            restartGame();
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setViewingBoard(true);
        setIsPaused(true);
    };

    return (
        <div className='game-wrapper'>
            <h1 className='game-title'>Minesweeper Game</h1>
            <DifficultySelector onDifficultyChange={handleDifficultyChange} />
            <div className={`game-container ${(!gameStarted || (showModal && !viewingBoard)) ? 'blur' : ''} ${viewingBoard ? 'viewing-board' : ''}`}>
                <GameStats 
                    time={time}
                    revealedCells={gameStats.revealedCells}
                    flaggedCells={gameStats.flaggedCells}
                    totalBombs={boardConfig.bombs}
                    gamesWon={gameStats.gamesWon}
                    totalGames={gameStats.totalGames}
                />
                <div className={`game-container-no-controller ${isPaused ? 'blur' : ''} ${viewingBoard ? 'viewing-board' : ''}`}>
                    <Board 
                        gameOver={gameOver}
                        setGameOver={setGameOver}
                        boardData={boardData}
                        setBoardData={setBoardData}
                        isPaused={isPaused}
                        onStatsUpdate={updateGameStats}
                    />
                </div>
                <Controller 
                    restartGame={restartGame}
                    onPlayPause={handlePlayPause}
                    disabled={!gameStarted || gameOver}
                    viewingBoard={viewingBoard}
                />           
            </div>
            {(!gameStarted || showModal) && 
                <Modal 
                    restartGame={restartGame} 
                    isStart={!gameStarted && !showModal}
                    onClose={handleModalClose}
                />
            }
        </div>
    )
}