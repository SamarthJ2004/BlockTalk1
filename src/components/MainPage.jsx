import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import RightSidebar from './RightSidebar';
import '../App.css'
import Profile from './Profile';

const MainPage = () => {
    const [page, setPage] = useState("/home");
    const location = useLocation();

    useEffect(() => {
        setPage(location.pathname);
        console.log(page);
    }, [location.pathname]);

    return (
        <div className="app">
            <Sidebar />
            {(page == "/home") ? <MainContent /> : <Profile />}
            <RightSidebar />
        </div>
    )
}

export default MainPage;