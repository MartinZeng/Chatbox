import MessageList from "./MessageList.tsx"
import type { Message } from "./MessageList.tsx"
import MessageInput from "./MessageInput"
import {useState} from 'react'


const ChatWindow: React.FC = () => {
    const [ message , setMessage ] = useState<Message[]>([]);
    const [currMessage, setCurrMessage ] = useState<string>('')
    const [ user, setUser] = useState<string | null> (null);
    const [error,setError] = useState <string | null> (null)

    const handleSend = async () => {

    if (!currMessage || !user) return;// add a field to check empty user aswell
    try{ 
    const res = await fetch("/messages", {
    method: "POST" ,
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
        message: currMessage,
        username:user,
    })
    
    // do a check to ensure res is ok
    
    
    });
    if(!res.ok){
        const err = await res.json();
        setError(err.error|| `Failed to create message`)
        return;
    }
    
    const savedMessage = await res.json();
    


    // setMessage( (prev:string) => [...prev, newMessage]);
    // setMessage(savedMessage);
    console.log(currMessage);
    setMessage((prev) => [...prev, savedMessage])
    // setMessage([]);
    setCurrMessage('')
    } catch (err) {
        console.error("Error creating message:", err);
        setError("Something went wrong. Please try again.");

    }

    

    // //message template
    // const newMessage = {
    //     text: message,
    //     username: user,
    //     createdAt: new Date().toLocaleTimeString(),// new is a invocation alert to let you know that we are using date as a template
    // }
    }
    return (
    <div className= "chat-Window">
        <MessageList messages={message}  />
        <MessageInput 
            handleSend = {handleSend}
            message = {currMessage}
            setMessage = {setCurrMessage}
            user={user}
            setUser={setUser}
            />
    </div>
)
}

export default ChatWindow;