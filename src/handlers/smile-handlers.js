import {changeSmile} from "../logic";
import {GameStatus, MaxMines} from "../App";

export const smileOnMouseUp = (event, setGameStatus, setCounter, setTime) => {
    if (event.button === 0) {
        changeSmile("smile");
        setGameStatus(GameStatus.NOT_STARTED);
        setCounter(MaxMines);
        setTime(0);

        let fields = document.querySelectorAll("#grid-container .col");
        fields.forEach(f => f.className = "grid-col cr cp col");
    }
}

export const smileOnMouseDown = (event) => {
    if (event.button === 0) {
        changeSmile("smile-clicked");
    }
}

export const smileOnMouseOver = (isMouseDown) => {
    if (isMouseDown) {
        changeSmile("smile-clicked")
    }
}

export const smileOnMouseOut = (gameStatus) => {
    switch (gameStatus) {
        case GameStatus.LOST:
            changeSmile("smile-sad");
            break;
        case GameStatus.WON:
            changeSmile("smile-cool");
            break;
        default:
            changeSmile("smile");
    }
}