import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './App.css';
import {changeSmile, generateMines, getNumbersImg} from "./logic";

export const N = 16;
export const M = 16;
export const MaxMines = 40;

function App() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [counter, setCounter] = useState(MaxMines);


    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isRunning]);

    const handleLeftClick = (event) => {
        let classList = event.target.classList;
        if (classList.contains("flag")) {
            return;
        }

        if (classList.contains("grid-col")) {
            if (classList.contains("bomb")) {
                classList.replace("grid-col", "bomb-red");
                const bombs = document.querySelectorAll("#grid-container .bomb");
                console.log(bombs);
                bombs.forEach(b => b.classList.replace("grid-col", "bomb-find"));
                changeSmile("smile-sad");
                setIsRunning(false);
            } else {
                classList.replace(  "grid-col", "pressed-button");
            }
        }

        if (!isRunning) {
            setIsRunning(true);

            // Вытаскиваем текущие координаты
            let selectedCoords = Array.from(classList).filter(c => c.startsWith("f-"))[0];
            let split = selectedCoords.split("-");
            let selectedY = split[1];
            let selectedX = split[2];

            let container = document.getElementById("grid-container");

            // нужно сгенерировать MaxMines (40 штук) мин
            let mines = generateMines(selectedX, selectedY);
            mines.forEach(m => {
                const field = container.querySelector(`.f-${m.X}-${m.Y}`);
                field.classList.add("bomb");
            })
        }
    };

    const handleRightClick = (event) => {
        event.preventDefault();

        let classList = event.target.classList;

        if (classList.contains("pressed-button")) {
            return;
        }

        if (classList.contains("flag")) {
            classList.replace("flag", "question-button");
            setCounter(counter + 1);
        } else if (classList.contains("question-button")) {
            classList.replace("question-button", "grid-col");
        } else {
            classList.replace("grid-col", "flag");
            setCounter(counter - 1);
        }
    };

    function detectSmileRelease(event) {
        let element = document.getElementById("smile-box");
        element.classList.replace("smile-clicked", "smile");
        setIsRunning(false);
        setCounter(MaxMines);
        setTime(0);

        const colDivs = document.querySelectorAll('#grid-container .col');
        colDivs.forEach(d => {
            let selectedCoords = Array.from(d).filter(c => c.startsWith("f-"))[0];
            d.className = `grid-col ${selectedCoords} col`;
        })
        this.forceUpdate();
    }

    function renderFields(){
        const rows = [];
        for (let i = 0; i < N; i++) {
            const cols = [];
            for (let j = 0; j < M; j++) {
                cols.push(<Col key={j} className={`grid-col f-${j}-${i}`}
                               onClick={handleLeftClick}
                               onContextMenu={handleRightClick}
                               onMouseDown={e => changeSmile("smile-wow")}
                               onMouseUp={e => changeSmile("smile")}
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
                     onMouseUp={detectSmileRelease}
                ></div>
                {getNumbersImg(time)}
            </div>
            <Container fluid id="grid-container">
                {renderFields()}
            </Container>


        </div>
    );
}

export default App;