import React, { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { postBack } from '../api/BackAPI';
import JoinModal from './JoinModal';
import './Modal.css'

function CreationModal(props) {
    const [image, setImage] = useState(null);
    const [backId, setBackId] = useState('')
    const [joinModalOpen, setJoinModalOpen] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    };

    const handleSubmit = () => {
        postBack(image)
            .then(response => {
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
        <>
            <Modal
                open={props.open}
                onClose={props.onClose}
            >
                <Box id='modal-box'>
                    <div id='creation-input-div'>
                        <Button
                            id='image-upload-button'
                            component='label'
                            startIcon={<PhotoCamera />}
                        >
                            등 사진 업로드
                            <input
                                hidden
                                accept='image/*'
                                type='file'
                                onChange={handleImageChange}
                            />
                        </Button>
                    </div>
                    <div id='button-div'>
                        <Button
                            id='primary'
                            onClick={handleSubmit}
                            disabled={image === null}>
                            생성
                        </Button>
                        <Button
                            id='cancel'
                            onClick={props.onClose}>
                            취소
                        </Button>
                    </div>
                </Box>
            </Modal>
            {joinModalOpen && <JoinModal
                open={joinModalOpen}
                onClose={handleJoinModalClose}
                backId={backId}
                moveToBackViewer={props.moveToBackViewer}
            />}
        </>
    )
}

export default CreationModal;
