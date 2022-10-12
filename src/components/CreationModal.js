import React, { useState } from 'react';
import { Modal, Upload, Button, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { postBack } from '../api/BackAPI';
import axios from "axios";

function CreationModal(props) {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [useDefaultImage, setUseDefaultImage] = useState(false);

    const handleImageChange = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    };
    //
    // const onOk = () => {
    //     console.log(useDefaultImage)
    //
    //     const formData = new FormData();
    //     if (!useDefaultImage) {
    //         formData.append('UploadFile', file, file.name)
    //     }
    //     setUploading(true);
    //
    //
    //     postBack(formData).then(res => {
    //         console.log(res)
    //     }).catch(error => {
    //         console.log(error)
    //     });
    // }

    const onCancel = () => {
        props.onCancel()
    }

    const handleSubmit = (e) => {
        let form_data = new FormData();
        form_data.append(
            'image',
            image,
            image.name
        );

        axios.post('http://localhost:8000/backs/', form_data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => console.log(error))
    };

    return (
        <Modal title='Create LocaBack' visible={props.visible} onCancel={onCancel}>
            <form>
                <p>
                    <input type="file"
                           id="image"
                           accept=".png, .jpeg, .jpg" onChange={handleImageChange} required/>
                </p>
            </form>
            <button onClick={handleSubmit}>Upload</button>
        </Modal>
    )
}

export default CreationModal;
