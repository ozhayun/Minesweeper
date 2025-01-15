import React from 'react';
import './CurrentScore.css';

const CurrentScore = ({ revealedCells, flaggedCells, totalBombs }) => {
    return (
        <div className="current-score">
            <div className="score-item">
                <span role="img" aria-label="revealed" className="score-icon">🔍</span>
                <span className="score-value">{revealedCells}</span>
            </div>
            <div className="score-item">
                <span role="img" aria-label="flags" className="score-icon">🚩</span>
                <span className="score-value">{flaggedCells}</span>
            </div>
            <div className="score-item">
                <span role="img" aria-label="bombs" className="score-icon">💣</span>
                <span className="score-value">{totalBombs}</span>
            </div>
        </div>
    );
};

export default CurrentScore;
