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
        if (!isRunning) {
            setIsRunning(true);
        }
        console.log("Left clicked!");
    };

    const handleRightClick = (event) => {
        event.preventDefault();
        console.log("Right clicked!");
    };



    function getNumbersImg(num) {
        let num1 = Math.floor(num / 100);
        let num2 = Math.floor((num / 10) % 10);
        let num3 = num % 10;

        return (
            <div className="timer-container">
                <div className={`num-${num1}`} />
                <div className={`num-${num2}`} />
                <div className={`num-${num3}`} />
            </div>
        )

    }


    const rows = [];
    for (let i = 0; i < 16; i++) {
        const cols = [];
        for (let j = 0; j < 16; j++) {
            cols.push(<Col key={j} className={`grid-col f-${j}-${i}`} onClick={handleLeftClick}/>);
        }
        rows.push(<div key={i} className="grid-row"><Row>{cols}</Row></div>);
    }

    return (
        <div id='global'>
            <div className="head-container">
                {getNumbersImg(counter)}
                <div className="smile-container smile"></div>
                {getNumbersImg(time)}
            </div>
            <Container fluid className="grid-container">
                {rows}
            </Container>


        </div>
    );
}

export default App;