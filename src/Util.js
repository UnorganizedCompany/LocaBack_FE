export const isValidBackId = (string) => {
    return (typeof string === 'string') &&
        string !== '' &&
        string !== null &&
        string !== undefined &&
        string.length === 6
};

export function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
