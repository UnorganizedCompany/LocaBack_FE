import React, { useState } from 'react';
import { Modal, Upload, Button, Checkbox, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function CreationModal(props) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [useDefaultImage, setUseDefaultImage] = useState(false);

    const uploadProps = {
        beforeUpload: (file) => {
            setFile(file)
            return false
        },
        maxCount: 1,
    };

    const onOk = () => {
        console.log(useDefaultImage)

        const formData = new FormData();
        if (!useDefaultImage) {
            formData.append('files[]', file)
        }
        setUploading(true);

        // TODO: back create api 호출
        fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFile(null);
                message.success('upload successfully.');
                // TODO: navigate to back viewer
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    }

    const onCancel = () => {
        props.onCancel()
    }

    return (
        <Modal title='Create LocaBack'
            visible={props.visible} onCancel={onCancel}
            footer={[
                <Button key='create' type='primary' onClick={onOk}
                    disabled = {uploading || (file === null && !useDefaultImage)}
                >
                    Create
                </Button>,
                <Button key='cancel' onClick={onCancel}>
                    Cancel
                </Button>
            ]}
        >
            <Upload accept='image/*' {...uploadProps}>
                    <Button icon={<PlusOutlined/>} />
            </Upload>
            <Checkbox onChange={e => setUseDefaultImage(e.target.checked)}>Use default image</Checkbox>
        </Modal>
    )
}

export default CreationModal;