export const isValidBackId = (string) => {
    return (typeof string === 'string') &&
        string !== '' &&
        string !== null &&
        string !== undefined &&
        string.length === 6
};
