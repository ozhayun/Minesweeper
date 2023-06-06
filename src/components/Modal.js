import React, { useState, useEffect } from "react";
import "./Modal.css"

function Modal({ restartGame }) {
    const [render, setRender] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setRender(true);
        }, 1000);
    }, []);

    const handleRestartGame = () => {
        restartGame();
    }

    return (
        <div
            style={{
                opacity: render ? 1 : 0,
                height: "100%",
                width: "100%",
                position: "absolute",
                background: "rgba(0,0,0,0.3)",
            }}
        >
            <div id="gameOverImage"></div>
            <div onClick={() => restartGame()} className="tryAgain">
                Try Again
            </div>
        </div>
    );
}

export default Modal