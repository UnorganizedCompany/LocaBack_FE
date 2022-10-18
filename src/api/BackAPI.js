import axios from 'axios';
const base_url = 'http://ec2-43-206-108-9.ap-northeast-1.compute.amazonaws.com:8000/'
// const base_url = 'http://localhost:8000/'

export function getBack(id) {
    return axios.get(
        base_url + 'backs/' + id + '/image',
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
        base_url + 'backs',
        form_data
    );
}
