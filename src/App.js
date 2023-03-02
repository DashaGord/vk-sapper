import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import './App.css';
import {changeSmile, getNumbersImg} from "./logic";
import {detectSmileRelease, handleLeftClick, handleOnMouseOut, handleRightClick} from "./Handles";

export const N = 16;
export const M = 16;
export const MaxMines = 40;

export const GameStatus = {
    NOT_STARTED: 0,
    STARTED: 1,
    FINISHED: 2
}

function App() {
    const [time, setTime] = useState(0);
    const [gameStatus, setGameStatus] = useState(GameStatus.NOT_STARTED);
    const [counter, setCounter] = useState(MaxMines);

    useEffect(() => {
        let intervalId;

        if (GameStatus.STARTED === gameStatus) {
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [gameStatus]);

    function renderFields() {
        const rows = [];
        for (let i = 0; i < N; i++) {
            const cols = [];
            for (let j = 0; j < M; j++) {
                cols.push(<Col key={j}
                               id={`f-${j}-${i}`}
                               className={`grid-col cr cp`}
                               onClick={e => handleLeftClick(e, gameStatus, setGameStatus)}
                               onContextMenu={e => handleRightClick(e, gameStatus, counter, setCounter)}
                               onMouseDown={e => {
                                   if (GameStatus.FINISHED !== gameStatus) {
                                       changeSmile("smile-wow");
                                   }
                               }}
                               onMouseUp={e => {
                                   if (GameStatus.FINISHED !== gameStatus) {
                                       changeSmile("smile");
                                   }
                               }}
                />);
            }
            rows.push(<div key={i} className="grid-row"><Row>{cols}</Row></div>);
        }
        return rows;
    }

    return (
        <div id='global'>
            <div className="head-container">
                {getNumbersImg(counter)}
                <div id="smile-box" className="smile"
                     onMouseDown={e => changeSmile("smile-clicked")}
                     onMouseUp={e => detectSmileRelease(setGameStatus, setCounter, setTime)}
                     onMouseOut={e => handleOnMouseOut(gameStatus)}
                ></div>
                {getNumbersImg(time)}
            </div>
            <Container fluid id="grid-container" onMouseOut={e => handleOnMouseOut(gameStatus)}>
                {renderFields()}
            </Container>
        </div>
    );
}

export default App;