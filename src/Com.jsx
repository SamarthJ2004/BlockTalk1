import React from 'react'
import Sidebar from './components/Sidebar'
import New from './New'
import RightSidebar from './components/RightSidebar'
import "./App.css";

const Com = () => {
  return (
    <div className='app'>
      <Sidebar />
      <New />
      <RightSidebar />
    </div>
  )
}

export default Com;