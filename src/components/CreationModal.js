import React from 'react';
import { Modal } from 'antd';

function CreationModal(props) {
    // TODO: image file uploader 필요함, OK 누르면 api 호출하게끔

    return (
        <Modal title="Creation Modal" visible={props.visible} onOk={props.onOk} onCancel={props.onCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default CreationModal
