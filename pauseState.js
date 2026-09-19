export let isPaused = false;

export function togglePause() {
    isPaused = !isPaused;
}

export function setPaused(value) {
    isPaused = value;
}