import React, { useState } from 'react';
import { Button } from 'antd';
import CreationModal from './CreationModal'
import JoinModal from './JoinModal'

function Home() {
    const [creationModalVisible, setCreationModalVisible] = useState(false);
    const [joinModalVisible, setJoinModalVisible] = useState(false);

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

    // TODO: moveToBackViewer - navigate 필요

    return (
        <div>
            <h2>
                home
            </h2>
            <Button onClick={openCreationModal}>등 생성하기</Button>
            <Button onClick={openJoinModal}>등 참여하기</Button>
            <CreationModal visible={creationModalVisible} onOk={openCreationModal} onCancel={closeCreationModal} />
            <JoinModal visible={joinModalVisible} onOk={openJoinModal} onCancel={closeJoinModal} />
        </div>
    )
}

export default Home;
