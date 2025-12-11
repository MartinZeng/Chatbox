import React from 'react'
import "./App.css"
import ChatWindow from "./components/ChatWindow"

const MainRoom: React.FC = () => {
    return (
        <>
        <h2>💙🌺Blue Poppy Chat Room💙🌺</h2> 
        <div className="main-room">
            <ChatWindow/>
        </div>
        </>
    )
}

export default MainRoom; 

