import React, {useEffect, useState} from 'react'
import createBoard from "../util/createBoard";
import Cell from "./Cell";
import "./Board.css"
import {revealed} from "../util/reveal";
import Modal from "./Modal";
import Timer from "./Timer";


const Board = ({ gameOver, setGameOver, boardData, setBoardData}) => {



    // on Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        e.preventDefault()
        let newGrid = JSON.parse(JSON.stringify(boardData.board))
        newGrid[x][y].flagged = true;
        // setGrid(newGrid)
        setBoardData(... newGrid)
    };

    const revealCell = (x, y) => {
        // if(grid[x][y].revealed || gameOver) {
        if(boardData.board[x][y].revealed || gameOver) {
            return;
        }

        let newGrid = JSON.parse(JSON.stringify(grid))
        let newGrid = JSON.parse(JSON.stringify(boardData.board))
        if(newGrid[x][y].value === 'B') {
            for(let i = 0; i < minesLocations.length; i++) {
               newGrid[minesLocations[i][0]][minesLocations[i][1]].revealed = true;
            }
            setGrid(newGrid)
            setGameOver(true)
        } else {
            let newRevealedBoard = revealed(newGrid, x, y, nonMineCount)
            setGrid(newRevealedBoard.arr)
            setNonMineCount(newRevealedBoard.newNonMinesCount)
            if(newRevealedBoard.newNonMinesCount === 0) {
                setGameOver(true)
            }
        }
    }

    return (
        <div className="Board">
            {gameOver &&<Modal restartGame={restartGame}/>}
            {<Timer />}
            {grid.map((singleRow, i) => {
            return (
                  <div key={i} className="rowBoard">
                      {singleRow.map((singleCell, j) => {
                        return (
                          <Cell key={j}
                                cell={singleCell}
                                updateFlag={updateFlag}
                                revealCell={revealCell}
                          />
                        );
                  })}
                  </div>
            );
            })}
        </div>
    );
};





export default Board;