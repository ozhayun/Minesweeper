import React from "react";
import "./Cell.css"
import {mineColor} from "../util/mineColors";

const Cell = ({ cell, updateFlag, revealCell }) => {
    const style = {
        block: {
            width: 60,
            height: 60,
            color: numColorCode(cell.value),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 800,
            fontSize: 35,
            cursor: "pointer",
            background: cell.revealed
                ? cell.value === "X"
                    ? mineColor()
                    : bombChexPattern(cell.x, cell.y)
                : chexPattern(cell.x, cell.y),
        },
    };
    const onClickFlag = (e) => {
        e.preventDefault()
        updateFlag(e, cell.x, cell.y)
    }

    return (
        <div style={style.block}
            onContextMenu={(e) => onClickFlag(e)}
            onClick={() => revealCell(cell.x, cell.y)}
            className="Cell">
            {!cell.revealed && cell.flagged
                ? "🚩"
                : cell.revealed && cell.value !== 0
                    ? cell.value === 'B'
                        ? "💣"
                        : cell.value
                    : ""}
        </div>
    )
}

const chexPattern = (x, y) => {
    if (x % 2 === 0 && y % 2 === 0) {
        return "#aad751";
    } else if (x % 2 === 0 && y % 2 !== 0) {
        return "#a2d249";
    } else if (x % 2 !== 0 && y % 2 === 0) {
        return "#a2d249";
    } else {
        return "#aad751";
    }
};

const bombChexPattern = (x, y) => {
    if (x % 2 === 0 && y % 2 === 0) {
        return "#e5c29f";
    } else if (x % 2 === 0 && y % 2 !== 0) {
        return "#d7b899";
    } else if (x % 2 !== 0 && y % 2 === 0) {
        return "#d7b899";
    } else {
        return "#e5c29f";
    }
};

const numColorCode = (num) => {
    if (num === 1) {
        return "#1976d2";
    } else if (num === 2) {
        return "#388d3c";
    } else if (num === 3) {
        return "#d33030";
    } else if (num === 4) {
        return "#7c21a2";
    } else if (num === 5) {
        return "#1976d2";
    } else if (num === 6) {
        return "#1976d2";
    } else {
        return "white";
    }
};
export default Cell;