import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreationModal from './CreationModal'
import JoinModal from './JoinModal'
import Button from '@mui/material/Button';
import './Home.css'

// TODO: 홈 배경 이미지 만들고 적용하기
// TODO: 버튼 CSS 작성

function Home() {
    const [creationModalOpen, setCreationModalOpen] = useState(false);
    const [joinModalOpen, setJoinModalOpen] = useState(false);
    const navigate = useNavigate();

    const openCreationModal = () => {
        setCreationModalOpen(true)
    }
    const closeCreationModal = () => {
        setCreationModalOpen(false)
    }
    const openJoinModal = () => {
        setJoinModalOpen(true)
    }
    const closeJoinModal = () => {
        setJoinModalOpen(false)
    }

    const moveToBackViewer = (backId) => {
        if (creationModalOpen) {
            closeCreationModal()
        }
        if (joinModalOpen) {
            closeJoinModal()
        }
        navigate('/back/' + backId)
    }

    return (
        <div id='home-div'>
            <img src='/1.PNG' alt=''/>
            <Button id='create-btn' onClick={openCreationModal}>등 생성하기</Button>
            <Button id='join-btn' onClick={openJoinModal}>등 참여하기</Button>
            {creationModalOpen &&
                <CreationModal open={creationModalOpen}
                    moveToBackViewer={moveToBackViewer}
                    onClose={closeCreationModal} />}
            {joinModalOpen &&
                <JoinModal open={joinModalOpen}
                    moveToBackViewer={moveToBackViewer}
                    onClose={closeJoinModal} />}
        </div>
    )
}

export default Home;
