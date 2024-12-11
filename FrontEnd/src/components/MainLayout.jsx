import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSideBar from './LeftSideBar'

function Mainlayout() {
  return (
    <div>
      <div><Outlet/></div>
      <LeftSideBar/>
    </div>
  )
}

export default Mainlayout
