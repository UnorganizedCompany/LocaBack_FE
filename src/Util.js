export const isValidString = (string) => {
    return (typeof string !== 'string') ||  string === '' || string === null || string === undefined
};