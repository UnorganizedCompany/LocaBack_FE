export const isValidBackId = (string) => {
    return (typeof string === 'string') &&
        string !== '' &&
        string !== null &&
        string !== undefined &&
        string.length === 6
};

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
