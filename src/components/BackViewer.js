import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Stack, IconButton } from '@mui/material';
import { getBack } from '../api/BackAPI';
import './BackViewer.css'
import light_back_scratcher from '../images/light_back_scratcher.png'
import { setScreenSize } from '../Util';

setScreenSize();

function BackViewer() {
    const [image, setImage] = useState('');
    const [point, setPoint] = useState({x: -1, y: -1});
    const [imageStyle, setImageStyle] = useState({top: 0, left: 0, width: 0, height: 0});
    const { backId } = useParams();
    const navigate = useNavigate();
    let ws = useRef(null);

    function handleResize() {
        setScreenSize();
        setImageStyle(getImageStyle())
    }

    function onLoad() {
        setImageStyle(getImageStyle())
    }

    function getImageStyle() {
        const img_width = document.getElementById('back-img').naturalWidth;
        const img_height = document.getElementById('back-img').naturalHeight;
        const client_width = window.innerWidth
        const client_height = window.innerHeight * 0.95
        const min_ratio = Math.min((client_width / img_width), (client_height/ img_height))
        const resize_img_width = img_width * min_ratio
        const resize_img_height = img_height * min_ratio

        return {
            top: (client_height - resize_img_height) / 2,
            left: (client_width - resize_img_width) / 2,
            width: resize_img_width,
            height: resize_img_height
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        getBack(backId)
            .then(response => {
                setImage(URL.createObjectURL(response.data))
            })
            .catch(error => {
                console.log(error)
                alert('올바른 등 번호가 아닙니다.')
                navigate('/');
            })

        // const webSocketUrl = 'ws://localhost:8000/backs/' + backId
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
            const img = document.getElementById('back-img')
            const imageWidth = img.clientWidth;
            const imageHeight = img.clientHeight;

            let p = Object()
            p.x = JSON.parse(evt.data).x * imageWidth - 15
            p.y = JSON.parse(evt.data).y * imageHeight - 5

            if (!isNaN(p.x) && !isNaN(p.y))
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

        ws.current.send(
            JSON.stringify({
                'x': normalizeX,
                'y': normalizeY
            })
        );
    }

    return (
        <div id='viewer-div'>
            <Stack id='header-div' direction='row'>
                <IconButton onClick={() => { navigate('/') }}>
                    <HomeRoundedIcon/>
                </IconButton>
                <p>
                    등 #{backId}
                </p>
            </Stack>
            <div id='img-div'>
                <img
                    id='back-img'
                    src={image}
                    onClick={handleBackClick}
                    alt=''
                    style={{
                        width: imageStyle.width,
                        height: imageStyle.height
                    }}
                    onLoad={onLoad}
                />
                {point.x > 0 && point.y > 0
                    && <div id='scratcher-div' style={{left: point.x + imageStyle.left, top: point.y + imageStyle.top}}>
                        <img src={light_back_scratcher} alt=''/>
                    </div>}
            </div>
        </div>
    )
}

export default BackViewer;
