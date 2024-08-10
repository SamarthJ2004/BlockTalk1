import React from 'react'
import Sidebar from './components/Sidebar'
import New from './New'
import RightSidebar from './components/RightSidebar'

const Com = () => {
  return (
    <div className='Community'>
      <Sidebar></Sidebar>
      <New></New>
      <RightSidebar></RightSidebar>
    </div>
  )
}

export default Com
