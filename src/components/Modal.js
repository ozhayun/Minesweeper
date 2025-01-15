import React, { useState, useEffect } from "react";
import "./Modal.css"

function Modal({ restartGame }) {
    const [render, setRender] = useState(false);

    useEffect(() => {
        // Set render to true immediately after mount to trigger the transition
        requestAnimationFrame(() => {
            setRender(true);
        });
    }, []);

    const handleRestartGame = () => {
        restartGame();
    }

    return (
        <div className={`modal-overlay ${render ? 'visible' : ''}`}>
            <div id="gameOverImage"></div>
            <div onClick={handleRestartGame} className="tryAgain">
                Try Again
            </div>
        </div>
    );
}

export default Modal