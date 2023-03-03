import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import './App.css';
import {getNumbersImg} from "./logic";
import {
    colHandleLeftClick,
    colHandleRightClick,
    colOnMouseDown,
    colOnMouseOut,
    colOnMouseOver,
    colOnMouseUp
} from "./handlers/column-handlers";
import {smileOnMouseDown, smileOnMouseOut, smileOnMouseOver, smileOnMouseUp} from "./handlers/smile-handlers";
import {globalHandleMouseDown, globalHandleMouseUp} from "./handlers/global-handlers";

export const N = 16;
export const M = 16;
export const MaxMines = 40;

export const GameStatus = {
    NOT_STARTED: 0,
    STARTED: 1,
    LOST: 2,
    WON: 3
}

function App() {
    const [time, setTime] = useState(0);
    const [gameStatus, setGameStatus] = useState(GameStatus.NOT_STARTED);
    const [counter, setCounter] = useState(MaxMines);
    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        document.addEventListener('mousedown', e => {
            globalHandleMouseDown(e, setIsMouseDown)
        });
        document.addEventListener('mouseup', e => {
            globalHandleMouseUp(e, setIsMouseDown)
        });
        return () => {
            document.removeEventListener('mousedown', e => {
                globalHandleMouseDown(e, setIsMouseDown)
            });
            document.removeEventListener('mouseup', e => {
                globalHandleMouseUp(e, setIsMouseDown)
            });
        };
    });

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
                               onClick={e => colHandleLeftClick(e, gameStatus, setGameStatus)}
                               onContextMenu={e => colHandleRightClick(e, gameStatus, counter, setCounter)}
                               onMouseDown={e => colOnMouseDown(e, gameStatus)}
                               onMouseOut={e => colOnMouseOut(e)}
                               onMouseOver={e => colOnMouseOver(e, isMouseDown, gameStatus)}
                               onMouseUp={e => colOnMouseUp(e, gameStatus, setGameStatus)}
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
                     onMouseUp={e => smileOnMouseUp(e, setGameStatus, setCounter, setTime)}
                     onMouseDown={e => smileOnMouseDown(e)}
                     onMouseOver={e => smileOnMouseOver(isMouseDown)}
                     onMouseOut={e => smileOnMouseOut(gameStatus)}
                />
                {getNumbersImg(time)}
            </div>
            <Container fluid id="grid-container">
                {renderFields()}
            </Container>
        </div>
    );
}

export default App;