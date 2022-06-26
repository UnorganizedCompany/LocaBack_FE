import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BackViewer() {
    const { backId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // TODO: 실제로 있는 등인지 체크, 없으면 navigate to home, 있으면 이미지 화면에 그린다
        console.log(backId);
        if (backId === '123') {
            navigate('/');
            return;
        }
        // TODO: ws open
        console.log('ws open');

        return () => {
            console.log('ws close')
        }
    }, [backId, navigate]);

    const onBackClick = (e) => {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        const imageWidth = e.target.clientWidth;
        const imageHeight  = e.target.clientHeight;
        const normalizeX = x / imageWidth;
        const normalizeY = y / imageHeight;

        if (normalizeX < 0 || normalizeY < 0 || normalizeX > 1 || normalizeY > 1)
            return;

        // TODO: 모바일에서 확대되었을 때 위치 제대로 그려지는지 확인해야 함
        // TODO: ws 호출
        console.log(normalizeX, normalizeY)
    }

    // TODO: 이미지 그릴 때 divice width, height 받아서 height 90%랑 width 비교한 뒤 가로 세로랑도 비교해서 어디에 맞춰서 그릴지 정해야 함

    return (
        <div>
            <h2>
                back viewer - {backId}
            </h2>
            <div style={{'textAlign': 'center'}}>
                <img src='/defaultBack.PNG' alt='back' onClick={e => onBackClick(e)}/>
            </div>
        </div>
    )
}

export default BackViewer;