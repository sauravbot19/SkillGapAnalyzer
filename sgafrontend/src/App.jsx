import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage'; // 1. Import Landing Page
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AnalysisResult from './pages/AnalysisResult';
import History from './pages/History';

// PrivateRoute stays the same
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            ::-webkit-scrollbar { display: none; }
            html, body {
                -ms-overflow-style: none;
                scrollbar-width: none;
                overflow-y: scroll;
                margin: 0; padding: 0;
            }
        `;
        document.head.appendChild(style);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {/* 2. Public Default Route is now the Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* 3. Dashboard is moved to /dashboard */}
                <Route path="/dashboard" element={
                    <PrivateRoute><Dashboard /></PrivateRoute>
                } />

                <Route path="/analysis/:id" element={
                    <PrivateRoute><AnalysisResult /></PrivateRoute>
                } />

                <Route path="/history" element={
                    <PrivateRoute><History /></PrivateRoute>
                } />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;