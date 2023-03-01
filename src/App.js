import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './App.css';

function App() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [counter, setCounter] = useState(40);


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


        if (!isRunning) {
            setIsRunning(true);
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

    function detectLeftButtonPressed(event) {
        let element = document.getElementById("smile-box");
        element.classList.replace("smile", "smile-wow");
    }

    function detectLeftButtonRelease(event) {
        let element = document.getElementById("smile-box");
        element.classList.replace("smile-wow", "smile");
    }


    function getNumbersImg(num) {
        let num1 = Math.floor(num / 100);
        let num2 = Math.floor((num / 10) % 10);
        let num3 = num % 10;

        return (
            <div className="timer-container">
                <div className={`num-${num1}`}/>
                <div className={`num-${num2}`}/>
                <div className={`num-${num3}`}/>
            </div>
        )

    }


    const rows = [];
    for (let i = 0; i < 16; i++) {
        const cols = [];
        for (let j = 0; j < 16; j++) {
            cols.push(<Col key={j} className={`grid-col f-${j}-${i}`}
                           onClick={handleLeftClick}
                           onContextMenu={handleRightClick}
                           onMouseDown={detectLeftButtonPressed}
                           onMouseUp={detectLeftButtonRelease}
            />);
        }
        rows.push(<div key={i} className="grid-row"><Row>{cols}</Row></div>);
    }

    return (
        <div id='global'>
            <div className="head-container">
                {getNumbersImg(counter)}
                <div id="smile-box" className="smile-container smile"></div>
                {getNumbersImg(time)}
            </div>
            <Container fluid className="grid-container">
                {rows}
            </Container>


        </div>
    );
}

export default App;