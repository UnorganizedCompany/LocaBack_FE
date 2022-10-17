import React, { useState } from 'react';
import { Box, Modal, Button } from '@mui/material';
import { postBack } from '../api/BackAPI';
import './CreationModal.css'


// TODO: Upload Input 보기 좋게 작업, 참고자료: https://mui.com/material-ui/react-button/#upload-button
// TODO: 버튼 CSS 작성
// TODO: Creation Modal CSS 작성
// TODO: Child Modal CSS 작성

function CreationModal(props) {
    const [image, setImage] = useState(null);
    const [backId, setBackId] = useState('')
    const [joinModalOpen, setJoinModalOpen] = useState(false);

    const handleImageChange = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    };

    const handleSubmit = () => {
        postBack(image)
            .then(response => {
                console.log(response.data);
                setBackId(response.data.id)
                setJoinModalOpen(true)
            })
            .catch(error => {
                console.log(error)
                alert('등 생성에 실패했습니다.')
            })
    };

    const handleJoinModalClose = () => {
        setJoinModalOpen(false)
        props.onClose()
    };

    return (
        <Modal
            id='creation-modal'
            open={props.open}
            onClose={props.onClose}
        >
            <Box id='modal-box'>
                <div id='input-div'>
                    <input type="file"
                           id="image-input"
                           accept="image/*"
                           onChange={handleImageChange}
                    />
                </div>
                <div id='button-div'>
                    <Button onClick={handleSubmit} disabled={ image === null }>생성</Button>
                    <Button onClick={props.onClose}>취소</Button>
                </div>
                <Modal
                    id='join-modal'
                    hideBackdrop
                    open={joinModalOpen}
                    onClose={handleJoinModalClose}
                    aria-describedby='child-modal-description'
                >
                    <Box id='modal-box'>
                        <p id='child-modal-description'>
                            생성된 등 번호는 {backId}입니다. 바로 참여하시겠습니까?
                        </p>
                        <button onClick={() => { props.moveToBackViewer(backId) }}>참여</button>
                        <button onClick={handleJoinModalClose}>취소</button>
                    </Box>
                </Modal>
            </Box>
        </Modal>
    )
}

export default CreationModal;
