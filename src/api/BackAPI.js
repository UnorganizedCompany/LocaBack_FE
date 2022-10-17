import axios from 'axios';

export function getBack(id) {
    return axios.get(
        'http://ec2-43-206-108-9.ap-northeast-1.compute.amazonaws.com:8000/backs/' + id + '/image',
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
        'http://ec2-43-206-108-9.ap-northeast-1.compute.amazonaws.com:8000/backs/',
        form_data
    );
}
