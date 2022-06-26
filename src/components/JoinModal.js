import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { isValidString } from '../Util.js'

function JoinModal(props) {
    const [backId, setBackId] = useState('');

    const onOk = () => {
        if (backId === '' || backId === null || backId === undefined) {
            message.error('등 번호를 입력하세요.');
            return;
        }
        // TODO: id check해서 존재하는지 확인해봐야 함, 없으면 alert 띄워서 없는 등 번호라고 알려주기
        props.moveToBackViewer(backId)
    }

    const onCancel = () => {
        props.onCancel()
    }

    return (
        <Modal title='Join LocaBack'
            visible={props.visible} onCancel={onCancel}
            footer={[
                <Button key='join' type='primary' onClick={onOk} disabled={isValidString(backId)}>
                    Join
                </Button>,
                <Button key='cancel' onClick={onCancel}>
                    Cancel
                </Button>
            ]}
        >
            <Input value={backId} onChange={e => {
                setBackId(e.target.value)}}/>
        </Modal>
    )
}

export default JoinModal
