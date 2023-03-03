import {changeSmile, generateMines, getCoordinatesAroundField, processingClickField, recursiveSelect} from "../logic";
import {GameStatus} from "../App";

export const colHandleLeftClick = (event, gameStatus, setGameStatus) => {
    let node = event.target;
    let classList = node.classList;
    if (gameStatus > 1 || classList.contains("flag") || !classList.contains("cp")) {
        return;
    }

    let split = node.id.split("-");
    let selectedX = parseInt(split[1]);
    let selectedY = parseInt(split[2]);
    let selectedPoint = {X: selectedX, Y: selectedY};

    if (GameStatus.NOT_STARTED === gameStatus) {
        setGameStatus(GameStatus.STARTED);

        let mines = generateMines(selectedPoint);
        mines.forEach(m => {
            const field = document.querySelector(`#grid-container #f-${m.X}-${m.Y}`);
            field.classList.add("bomb");

            let points = getCoordinatesAroundField(m);
            points.forEach(p => {
                const field = document.getElementById(`f-${p.X}-${p.Y}`);
                let elemClassList = field.classList;
                if (elemClassList.contains("num")) {
                    Array.from(elemClassList).filter(si => si.startsWith("num-")).forEach(g => {
                        let number = g.split("-")[1];
                        elemClassList.replace(`num-${number}`, `num-${parseInt(number) + 1}`);
                    })
                } else {
                    field.classList.add("num");
                    field.classList.add("num-1");
                }
            })
        })
    }

    if (classList.contains("grid-col")) {
        if (classList.contains("bomb")) {
            node.className = "bomb-red col";

            const bombs = document.querySelectorAll("#grid-container .bomb");
            bombs.forEach(b => b.className = "bomb-find col");

            let flags = document.querySelectorAll("#grid-container .flag");
            flags.forEach(b => b.className = "bomb-cross col");

            let questions = document.querySelectorAll("#grid-container .question-button");
            questions.forEach(b => b.className = "question-pressed col");

            let untouched = document.querySelectorAll("#grid-container .cp, #grid-container .cr");
            untouched.forEach(b => b.classList.remove("cp", "cr"));

            changeSmile("smile-sad");
            setGameStatus(GameStatus.LOST);
        } else {
            processingClickField(node);
            let firstNodeWithNum = classList.contains("num");
            let freeFields = [selectedPoint];
            let allDetectedCoords = new Set([JSON.stringify(selectedPoint)]);
            recursiveSelect(firstNodeWithNum, freeFields, allDetectedCoords);

            let notPressed = document.querySelectorAll('#grid-container .grid-col, #grid-container .question-button');
            let cleanFields = Array.from(notPressed).filter(np => !np.classList.contains("bomb")).length;

            if (cleanFields === 0) {
                changeSmile("smile-cool");
                setGameStatus(GameStatus.WON);

                const untouchedBombs = document.querySelectorAll("#grid-container .bomb:not(.flag)");
                untouchedBombs.forEach(b => b.className = "bomb-find col");

                let untouched = document.querySelectorAll("#grid-container .flag");
                untouched.forEach(b => b.classList.remove("cp"));
            }
        }
    }
};

export const colHandleRightClick = (event, gameStatus, counter, setCounter) => {
    event.preventDefault();

    let node = event.target;
    let classList = node.classList;

    if (GameStatus.STARTED !== gameStatus || !classList.contains("cr")) {
        return;
    }

    if (classList.contains("flag")) {
        classList.replace("flag", "question-button");
        setCounter(counter + 1);
    } else if (classList.contains("question-button")) {
        classList.replace("question-button", "grid-col");
    } else if (counter > 0) {
        classList.replace("grid-col", "flag");
        setCounter(counter - 1);
    }
};

export const colOnMouseDown = (event, gameStatus) => {
    if (event.button === 0) {
        event.preventDefault();
        let classList = event.target.classList;
        if (classList.contains("grid-col")) {
            if (!classList.contains("question-pressed")) {
                classList.add("question-pressed");
            }
            changeSmile("smile-wow", gameStatus);
        }
    }
}

export const colOnMouseOut = (event) => {
    let classList = event.target.classList;
    if (classList.contains("question-pressed")) {
        classList.remove("question-pressed");
    }
}

export const colOnMouseOver = (event, isMouseDown, gameStatus) => {
    event.preventDefault();
    let classList = event.target.classList;
    if (isMouseDown && classList.contains("grid-col")) {
        if (!classList.contains("question-pressed")) {
            classList.add("question-pressed");
        }
        changeSmile("smile-wow", gameStatus);
    }
}

export const colOnMouseUp = (event, gameStatus, setGameStatus) => {
    if (event.button === 0) {
        let classList = event.target.classList;
        classList.remove("question-pressed");

        changeSmile("smile", gameStatus);
        colHandleLeftClick(event, gameStatus, setGameStatus);
    }
}