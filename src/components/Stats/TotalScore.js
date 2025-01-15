import React from 'react';
import './TotalScore.css';

const TotalScore = ({ gamesWon, totalGames }) => {
    return (
        <div className="total-score">
            <div className="score-item">
                <span role="img" aria-label="trophy" className="score-icon">🏆</span>
                <span className="score-value">{gamesWon}/{totalGames}</span>
            </div>
            <div className="win-rate">
                <span className="rate-label">Win Rate:</span>
                <span className="rate-value">
                    {totalGames > 0 ? Math.round((gamesWon / totalGames) * 100) : 0}%
                </span>
            </div>
        </div>
    );
};

export default TotalScore;
