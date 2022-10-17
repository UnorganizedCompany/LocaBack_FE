import React, { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { isValidBackId } from '../Util.js';
import './Modal.css'

function JoinModal(props) {
    const [backId, setBackId] = useState(props.backId ?? '');

    const handleJoin = () => {
        props.moveToBackViewer(backId)
    }

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
        >
            <Box id='modal-box'>
                <div id='join-input-div'>
                    {
                        props.backId === undefined
                        ? <input value={backId} onChange={e => { setBackId(e.target.value) }}/>
                        : <p>생성된 등 번호는 {backId}입니다.<br/>
                            바로 참여하시겠습니까?</p>
                    }
                </div>
                <div id='button-div'>
                    <Button
                        id='primary'
                        onClick={handleJoin}
                        disabled={!isValidBackId(backId) && props.backId === undefined}>
                        참여
                    </Button>
                    <Button
                        id='cancel'
                        onClick={props.onClose}>
                        취소
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default JoinModal
