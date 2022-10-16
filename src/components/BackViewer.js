import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Stack, IconButton } from '@mui/material';
import { getBack } from '../api/BackAPI';
import './BackViewer.css'

// TODO: 효자손 이미지로 점 표시하기

function BackViewer() {
    const [image, setImage] = useState('');
    const [point, setPoint] = useState({x: null, y: null});
    const { backId } = useParams();
    const navigate = useNavigate();

    let ws = useRef(null);

    useEffect(() => {
        console.log(backId);
        getBack(backId)
            .then(response => {
                setImage(URL.createObjectURL(response.data))
            })
            .catch(error => {
                console.log(error)
                alert('올바른 등 번호가 아닙니다.')
                navigate('/');
            })

        const webSocketUrl = 'ws://ec2-43-206-108-9.ap-northeast-1.compute.amazonaws.com:8000/backs/' + backId
        ws.current = new WebSocket(webSocketUrl);
        ws.current.onopen = () => {
            console.log("connected to " + webSocketUrl);
        };
        ws.current.onclose = (error) => {
            console.log("disconnect from " + webSocketUrl);
            console.log(error);
        };
        ws.current.onerror = (error) => {
            console.log("connection error " + webSocketUrl);
            console.log(error);
        };
        ws.current.onmessage = (evt) => {
            // TODO: Welcome message 재문이가 못지운다고 하면 여기서 처리할 것
            const img = document.getElementById('back-img')
            const imageWidth = img.clientWidth;
            const imageHeight = img.clientHeight;

            let p = Object()
            p.x = JSON.parse(evt.data).x * imageWidth - 5
            p.y = JSON.parse(evt.data).y * imageHeight - 5
            setPoint(p);
        };

        return () => {
            console.log('clean up');
            ws.current.close();
        };
    }, [backId, navigate]);

    const handleBackClick = (e) => {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        const imageWidth = e.target.clientWidth;
        const imageHeight  = e.target.clientHeight;
        const normalizeX = x / imageWidth;
        const normalizeY = y / imageHeight;

        if (normalizeX < 0 || normalizeY < 0 || normalizeX > 1 || normalizeY > 1)
            return;

        // TODO: 모바일에서 확대되었을 때 위치 어떻게 그려지는지 확인해야 함
        console.log(normalizeX, normalizeY)
        ws.current.send(
            JSON.stringify({
                'x': normalizeX,
                'y': normalizeY
            })
        );
    }

    return (
        <div id='viewer-div'>
            <Stack direction='row'>
                <IconButton onClick={() => { navigate('/') }}>
                    <HomeRoundedIcon/>
                </IconButton>
                <p>
                    등 #{backId}
                </p>
            </Stack>
            <div id='img-div'>
                <img id='back-img' src={image} onClick={handleBackClick} alt=''/>
                <div id='svg-div' style={{left: point.x, top: point.y}}>
                    <svg>
                        <circle cx='5' cy='5' r='5'/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default BackViewer;