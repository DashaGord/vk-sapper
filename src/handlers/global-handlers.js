export const globalHandleMouseDown = (event, setIsMouseDown) => {
    if (event.button === 0) {
        setIsMouseDown(true);
    }
}

export const globalHandleMouseUp = (event, setIsMouseDown) => {
    if (event.button === 0) {
        setIsMouseDown(false);
    }
}