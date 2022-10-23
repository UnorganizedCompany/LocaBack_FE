import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageList, ImageListItem } from '@mui/material';
import CreationModal from './CreationModal'
import JoinModal from './JoinModal'
import Button from '@mui/material/Button';
import './Home.css'
import light_back_scratcher from '../images/light_back_scratcher.png'
import dark_back_scratcher from '../images/dark_back_scratcher.png'
import { setScreenSize } from '../Util';

setScreenSize();

function Home() {
    const [creationModalOpen, setCreationModalOpen] = useState(false);
    const [joinModalOpen, setJoinModalOpen] = useState(false);
    const navigate = useNavigate();
    const imgSize = 100;
    const col = Math.ceil(window.innerWidth / imgSize)
    const row = Math.ceil(window.innerHeight / imgSize)
    const [images, setImages] = useState(
        [...Array(col * row)].map((_, index) => {
            if (((index % col) + Math.floor(index / col)) % 2 === 0)
                return light_back_scratcher
            else
                return dark_back_scratcher
        })
    )

    function handleResize() {
        setScreenSize();
        const _col = Math.ceil(window.innerWidth / imgSize)
        const _row = Math.ceil(window.innerHeight / imgSize)
        setImages([...Array(_col * _row)].map((_, index) => {
            if (((index % _col) + Math.floor(index / _col)) % 2 === 0)
                return light_back_scratcher
            else
                return dark_back_scratcher
        }))
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

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
            <ImageList id='home-background' cols={col} rowHeight={imgSize}>
                {images.map((image, index) => (
                    <ImageListItem key={index}>
                        <img
                            src={image}
                            alt=''
                            width={imgSize}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
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
