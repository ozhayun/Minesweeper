import React, { useState, useEffect } from "react";
import "./Modal.css"

function Modal({ restartGame, isStart = false }) {
    const [render, setRender] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setRender(true);
        });
    }, []);

    const handleStartGame = () => {
        restartGame();
    }

    return (
        <div className={`modal-overlay ${render ? 'visible' : ''}`}>
            <div className="modal-content">
                <h2 className="modal-title">
                    {isStart ? "Welcome!" : "Game Over!"}
                </h2>
                {!isStart && <div id="gameOverImage"></div>}
                <button onClick={handleStartGame} className="tryAgain">
                    {isStart ? "Start Game" : "Try Again"}
                </button>
            </div>
        </div>
    );
}

export default Modal