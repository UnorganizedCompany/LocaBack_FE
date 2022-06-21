import React from 'react';
import { Modal } from 'antd';

function JoinModal(props) {
    //TODO: form에서 접속할 등 번호 입력받아야 함, props로 넘어온 moveToBackViewer 함수 호출해서 navigate만 시키면 됨

    return (
        <Modal title="Join Modal" visible={props.visible} onOk={props.onOk} onCancel={props.onCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default JoinModal
