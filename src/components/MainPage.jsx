import React from 'react'
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import RightSidebar from './RightSidebar';
import '../App.css'

const MainPage = () => {
    return (
        <div className="app">
            <Sidebar/>
            <MainContent />
            <RightSidebar />
        </div>
    )
}

export default MainPage;