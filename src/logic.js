import {MaxMines, N, M} from "./App";
import React from "react";

export function getNumbersImg(num) {
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

export function changeSmile(smileClass) {
    document.getElementById("smile-box").className = smileClass;
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * (max));
}

export function generateMines(selectedX, selectedY) {
    let minesSet = new Set();
    while (minesSet.size <= MaxMines) {
        let x = getRandomNumber(N);
        let y = getRandomNumber(M);
        if (!(x === selectedX && y === selectedY)) {
            minesSet.add(JSON.stringify({X: x, Y: y}));
        }
    }
    return Array.from(minesSet).map(s => JSON.parse(s));
}