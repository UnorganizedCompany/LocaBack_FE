import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home.js';
import BackViewer from './components/BackViewer.js';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='back/:id' element={<BackViewer />} />
                    <Route path='*' element={<Navigate replace to='/'/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
