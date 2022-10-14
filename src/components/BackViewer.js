import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Stack, IconButton } from '@mui/material';
import { getBack } from '../api/BackAPI';

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

        const webSocketUrl = 'ws://localhost:8000/backs/' + backId
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
            setPoint(JSON.parse(evt.data));
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

    // TODO: 이미지 그릴 때 divice width, height 받아서 height 90%랑 width 비교한 뒤 가로 세로랑도 비교해서 어디에 맞춰서 그릴지 정해야 함
    // TODO: point 값과 기타 size 가지고 긁을 위치 그려야 함
    return (
        <div id='viewer-div'>
            <Stack direction='row'>
                <IconButton onClick={() => { navigate('/') }}>
                    <HomeRoundedIcon/>
                </IconButton>
                <p>
                    등 #{backId} {point.x} {point.y}
                </p>
            </Stack>
            <div style={{'textAlign': 'center'}}>
                <img style={{'width': '100%'}} src={image} onClick={handleBackClick} alt=''/>
            </div>
        </div>
    )
}

export default BackViewer;
