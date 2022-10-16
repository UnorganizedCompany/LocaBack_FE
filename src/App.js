import React from 'react';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import Home from './components/Home.js';
import BackViewer from './components/BackViewer.js';

function App() {
    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='back/:backId' element={<BackViewer />} />
                    <Route path='*' element={<Navigate replace to='/'/>} />
                </Routes>
            </HashRouter>
        </div>
    )
}

export default App;
