import React from 'react'
import NavBar from '../navbar/NavBar'
import Topbar from '../topbar/Topbar'

export default function AppLayout() {
    return <>
        <div style={{width:'100%',height:'100%'}}>
            <Topbar />
            <NavBar />
        </div>
    </>
}
