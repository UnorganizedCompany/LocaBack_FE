import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import CreationModal from './CreationModal'
import JoinModal from './JoinModal'

function Home() {
    const [creationModalVisible, setCreationModalVisible] = useState(false);
    const [joinModalVisible, setJoinModalVisible] = useState(false);
    const navigate = useNavigate();

    const openCreationModal = () => {
        setCreationModalVisible(true)
    }
    const closeCreationModal = () => {
        setCreationModalVisible(false)
    }
    const openJoinModal = () => {
        setJoinModalVisible(true)
    }
    const closeJoinModal = () => {
        setJoinModalVisible(false)
    }

    const moveToBackViewer = (backId) => {
        if (creationModalVisible) {
            closeCreationModal()
        }
        else {
            closeJoinModal()
        }
        navigate('/back/' + backId)
    }

    return (
        <>
            <h2>
                home
            </h2>
            <Button onClick={openCreationModal}>Create LocaBack</Button>
            <Button onClick={openJoinModal}>Join LocaBack</Button>
            {creationModalVisible &&
                <CreationModal visible={creationModalVisible}
                    moveToBackViewer={moveToBackViewer}
                    onCancel={closeCreationModal} />}
            {joinModalVisible &&
                <JoinModal visible={joinModalVisible}
                    moveToBackViewer={moveToBackViewer}
                    onCancel={closeJoinModal} />}
        </>
    )
}

export default Home;
