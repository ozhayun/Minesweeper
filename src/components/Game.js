import React, {useEffect, useState} from 'react'
import Board from "./Board";
import createBoard from "../util/createBoard";
import Timer from "./Timer";

export default function Game () {
    const numOfRows = 10
    const numOfCols = 10
    const numOfBombs = 30

    const[gameOver, setGameOver] = useState(false)
    const [boardData, setBoardData] = useState(createBoard(numOfRows * numOfCols, numOfBombs))

    // const [grid, setGrid] = useState([]);
    // const[nonMineCount, setNonMineCount] = useState(0)
    // const [minesLocations, setMinesLocations] = useState([])

    let [time, setTime] = useState(0);

    useEffect(() => {
        if (time > 0 && gameOver) {
            setTime(0);
        }
    }, [gameOver, time]);

    useEffect(() => {
        function incrementTime() {
            setTimeout(() => {
                let newTime = time + 1;
                setTime(newTime)
            },1000)
        }
        incrementTime()
    }, [time]);

    useEffect(() => {
        refreshBoard()
    },[]);

    const refreshBoard = () => {
        // const newBoard = createBoard(numOfRows * numOfCols, numOfBombs);
        setBoardData(createBoard(numOfRows * numOfCols, numOfBombs))
        // setNonMineCount(numOfRows * numOfCols - numOfBombs)
        // setMinesLocations(newBoard.minesLocations)
        // setGrid(newBoard.board)
    }

    const restartGame = () => {
        refreshBoard()
        setGameOver(false)
    }


    return (
        <div>
            <Timer time={time} />
            <Board gameover={gameOver} setGameOver={setGameOver} boardData={boardData}></Board>

        </div>
    )




}