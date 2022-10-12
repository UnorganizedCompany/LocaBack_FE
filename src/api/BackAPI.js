import axios from 'axios'

export function getBack(id) {
    return axios.get('http://127.0.0.1:8000/backs/' + id + '/image', {responseType: 'blob'});
}

export function postBack(form_data) {
    console.log(form_data)
    return axios.post('http://127.0.0.1:8000/backs', form_data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}
