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

export function changeSmile(smileClass, gameStatus = 1) {
    if (gameStatus < 2) {
        document.getElementById("smile-box").className = smileClass;
    }
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * (max));
}

export function generateMines(point) {
    let minesSet = new Set();
    while (minesSet.size < MaxMines) {
        let x = getRandomNumber(N);
        let y = getRandomNumber(M);
        if (x === point.X && y === point.Y) {
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

export function recursiveSelect(firstNodeWithNum, freeFields, allDetectedCoords) {
    let newFreeFields = [];
    freeFields.forEach(ff => {
        getCoordinatesAroundField(ff)
            .map(p => JSON.stringify(p))
            .filter(p => !allDetectedCoords.has(p))
            .forEach(p => {
                let pp = JSON.parse(p);
                const field = document.getElementById(`f-${pp.X}-${pp.Y}`);
                let fcl = field.classList;
                if (!fcl.contains("bomb")) {
                    if (firstNodeWithNum && !fcl.contains("num")) {
                        allDetectedCoords.add(p);
                        processingClickField(field);
                        newFreeFields.push(pp);
                    } else if (!firstNodeWithNum) {
                        allDetectedCoords.add(p);
                        processingClickField(field);
                        if (!fcl.contains("num")) {
                            newFreeFields.push(pp);
                        }
                    }
                }
            });
    });
    if (newFreeFields.length > 0) {
        recursiveSelect(false, newFreeFields, allDetectedCoords);
    }
}

export function processingClickField(node) {
    let classList = node.classList;
    if (classList.contains("num")) {
        classList.remove("grid-col", "cr", "cp");
        Array.from(classList).filter(si => si.startsWith("num-")).forEach(g => {
            let number = g.split("-")[1];
            classList.replace(`num-${number}`, `field-num-${number}`);
        })
    } else {
        node.className = "pressed-button col";
    }
}