import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { isValidBackId, modalStyle } from '../Util.js';
import {Box} from "@mui/material";

// TODO: 버튼 CSS 작성
// TODO: Join Modal CSS 작성

function JoinModal(props) {
    const [backId, setBackId] = useState('');

    const handleJoin = () => {
        props.moveToBackViewer(backId)
    }

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
        >
            <Box sx={modalStyle}>
                <input value={backId} onChange={e => {
                    setBackId(e.target.value)}}/>
                <button onClick={handleJoin} disabled={!isValidBackId(backId)}>참여</button>
                <button onClick={props.onClose}>취소</button>
            </Box>
        </Modal>
    )
}

export default JoinModal
