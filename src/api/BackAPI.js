import axios from 'axios';

export function getBack(id) {
    return axios.get(
        'http://localhost:8000/backs/' + id + '/image',
        {responseType: 'blob'}
    );
}

export function postBack(image) {
    let form_data = new FormData();
    form_data.append(
        'image',
        image,
        image.name
    );
    return axios.post(
        'http://localhost:8000/backs/',
        form_data
    );
}
