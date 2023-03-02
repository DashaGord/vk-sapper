import {M, MaxMines, N} from "./App";
import React from "react";

export function getNumbersImg(num) {
    let num1 = Math.floor(num / 100);
    let num2 = Math.floor((num / 10) % 10);
    let num3 = num % 10;

    return (
        <div className="timer-container">
            <div className={`red-num-${num1}`}/>
            <div className={`red-num-${num2}`}/>
            <div className={`red-num-${num3}`}/>
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
    while (minesSet.size < MaxMines) {
        let x = getRandomNumber(N);
        let y = getRandomNumber(M);
        if (x === selectedX && y === selectedY) {
            continue;
        }
        minesSet.add(JSON.stringify({X: x, Y: y}));
    }
    return Array.from(minesSet).map(s => JSON.parse(s));
}

export function calculateAndPush(points, calcX, calcY) {
    if ((calcX >= 0 && calcX < N) && (calcY >= 0 && calcY < N)) {
        points.push({X: calcX, Y: calcY})
    }
}

export function getCoordinatesAroundField(point) {
    let points = [];

    const x = point.X;
    const y = point.Y;

    calculateAndPush(points, x - 1, y - 1);
    calculateAndPush(points, x, y - 1);
    calculateAndPush(points, x + 1, y - 1);
    calculateAndPush(points, x + 1, y);
    calculateAndPush(points, x + 1, y + 1);
    calculateAndPush(points, x, y + 1);
    calculateAndPush(points, x - 1, y + 1);
    calculateAndPush(points, x - 1, y);

    return points;
}