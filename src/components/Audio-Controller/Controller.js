import React, { useState } from 'react';
import './Controller.css';
import Play from './Icons/Play';
import Pause from './Icons/Pause';
import Restart from './Icons/Restart';

const Controller = ({ restartGame, onPlayPause, disabled }) => {
    const [isPlaying, setIsPlaying] = useState(true);

    const handlePlayPause = () => {
        if (disabled) return;
        const newPlayingState = !isPlaying;
        setIsPlaying(newPlayingState);
        onPlayPause?.(newPlayingState);
    };

    const handleRestart = () => {
        setIsPlaying(true);
        onPlayPause?.(true);
        restartGame();
    };

    return (
        <div className={`controller ${disabled ? 'disabled' : ''}`}>
            <button 
                className="controller-button"
                onClick={handlePlayPause}
                disabled={disabled}
                aria-label={isPlaying ? 'Pause' : 'Play'}
            >
                {isPlaying ? <Pause /> : <Play />}
            </button>
            <button 
                className="controller-button"
                onClick={handleRestart}
                aria-label="Restart"
            >
                <Restart />
            </button>
        </div>
    );
};

export default Controller;