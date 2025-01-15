import React from 'react';
import Timer from './Timer';
import CurrentScore from './CurrentScore';
import TotalScore from './TotalScore';
import './GameStats.css';

const GameStats = ({ 
    time, 
    revealedCells, 
    flaggedCells, 
    totalBombs,
    gamesWon,
    totalGames
}) => {
    return (
        <div className="game-stats">
            <div className="stats-container">
                <Timer time={time} />
                <CurrentScore 
                    revealedCells={revealedCells}
                    flaggedCells={flaggedCells}
                    totalBombs={totalBombs}
                />
                <TotalScore 
                    gamesWon={gamesWon}
                    totalGames={totalGames}
                />
            </div>
        </div>
    );
};

export default GameStats;
