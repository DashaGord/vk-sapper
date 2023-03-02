import {changeSmile, generateMines, getCoordinatesAroundField} from "./logic";
import {GameStatus, MaxMines} from "./App";

export const handleLeftClick = (event, gameStatus, setGameStatus) => {
    let node = event.target;
    let classList = node.classList;
    if (GameStatus.FINISHED === gameStatus || classList.contains("flag")) {
        return;
    }

    if (GameStatus.NOT_STARTED === gameStatus) {
        setGameStatus(GameStatus.STARTED);

        let split = node.id.split("-");
        let selectedX = parseInt(split[1]);
        let selectedY = parseInt(split[2]);

        let mines = generateMines(selectedX, selectedY);
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
            setGameStatus(GameStatus.FINISHED);
        } else {

            if (classList.contains("num")) {
                classList.remove("grid-col", "cr", "cp");
                Array.from(classList).filter(si => si.startsWith("num-")).forEach(g => {
                    let number = g.split("-")[1];
                    classList.replace(`num-${number}`, `field-num-${number}`);
                })
            } else {
                node.className = "pressed-button col";
            }

            let notPressed = document.querySelectorAll('#grid-container .grid-col, #grid-container .question-button');
            let cleanFields = Array.from(notPressed).filter(np => !np.classList.contains("bomb")).length;

            if (cleanFields === 0) {
                changeSmile("smile-cool");
                setGameStatus(GameStatus.FINISHED);

                const untouchedBombs = document.querySelectorAll("#grid-container .bomb:not(.flag)");
                untouchedBombs.forEach(b => b.className = "bomb-find col");

                let untouched = document.querySelectorAll("#grid-container .flag");
                untouched.forEach(b => b.classList.remove("cp"));
            }
        }
    }
};

export const handleRightClick = (event, gameStatus, counter, setCounter) => {
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

export const handleOnMouseOut = (gameStatus) => {
    switch (gameStatus) {
        case GameStatus.NOT_STARTED:
        case GameStatus.STARTED:
            changeSmile("smile");
            break;
        case GameStatus.FINISHED:
            changeSmile("smile-sad");
            break;
    }
}

export const detectSmileRelease = (setGameStatus, setCounter, setTime) => {
    changeSmile("smile");
    setGameStatus(GameStatus.NOT_STARTED);
    setCounter(MaxMines);
    setTime(0);

    let fields = document.querySelectorAll("#grid-container .col");
    fields.forEach(f => f.className = "grid-col cr cp col");
}