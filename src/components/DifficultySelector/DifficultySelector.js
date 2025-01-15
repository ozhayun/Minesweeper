import React, { useState } from 'react';
import './DifficultySelector.css';

const DIFFICULTY_PRESETS = {
    beginner: { rows: 8, cols: 8, bombs: 10, color: '#4CAF50' },
    intermediate: { rows: 12, cols: 12, bombs: 30, color: '#FFA726' },
    expert: { rows: 16, cols: 16, bombs: 50, color: '#EF5350' },
    custom: { color: '#7E57C2' }
};

const DifficultySelector = ({ onDifficultyChange }) => {
    const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
    const [customValues, setCustomValues] = useState({
        rows: 10,
        cols: 10,
        bombs: 30
    });
    const [showCustom, setShowCustom] = useState(false);

    const handleDifficultyClick = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setShowCustom(difficulty === 'custom');
        
        if (difficulty !== 'custom') {
            onDifficultyChange(DIFFICULTY_PRESETS[difficulty]);
        }
    };

    const handleCustomUpdate = () => {
        onDifficultyChange(customValues);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomValues(prev => ({
            ...prev,
            [name]: parseInt(value, 10)
        }));
    };

    return (
        <div className="difficulty-selector">
            <div className="difficulty-buttons">
                {Object.entries(DIFFICULTY_PRESETS).map(([key, { color }]) => (
                    <button
                        key={key}
                        className={`difficulty-button ${selectedDifficulty === key ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleDifficultyClick(key)}
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                ))}
            </div>
            {showCustom && (
                <div className="custom-controls">
                    <div className="custom-inputs">
                        <input
                            type="number"
                            name="rows"
                            value={customValues.rows}
                            onChange={handleInputChange}
                            placeholder="Rows"
                            min="4"
                            max="30"
                        />
                        <input
                            type="number"
                            name="cols"
                            value={customValues.cols}
                            onChange={handleInputChange}
                            placeholder="Columns"
                            min="4"
                            max="30"
                        />
                        <input
                            type="number"
                            name="bombs"
                            value={customValues.bombs}
                            onChange={handleInputChange}
                            placeholder="Bombs"
                            min="1"
                            max={customValues.rows * customValues.cols - 1}
                        />
                    </div>
                    <button 
                        className="update-button"
                        onClick={handleCustomUpdate}
                    >
                        Update
                    </button>
                </div>
            )}
        </div>
    );
};

export default DifficultySelector; 