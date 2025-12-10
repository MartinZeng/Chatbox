import MessageList from "./MessageList.tsx"
import type { Message } from "./MessageList.tsx"
import MessageInput from "./MessageInput"
import {useEffect, useState} from 'react'


const ChatWindow: React.FC = () => {
    const [ messages , setMessages ] = useState<Message[]>([]);
    const [currMessage, setCurrMessage ] = useState<string>('')
    const [ user, setUser] = useState<string> ("");
    const [error,setError] = useState <string | null> (null);
    const [loading, setLoading] = useState<boolean>(true);

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
    setMessages((prev) => [...prev, savedMessage])
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
// create a use effect that will fetch the messages and load them on mount 
    useEffect(() => {

        const fetchMessages = async () => {
            try {
            const res = await fetch("/messages");
            console.log("FETCH STATUS:", res.status);

            if (!res.ok) {
                console.error('Failed to fetch messages');
                return;
            }
             
            const data = await res.json();
            console.log("DATA FROM BACKEND:", data);

            //msn from backend 
            if(res.ok) {
                setMessages(data);
                setLoading(false);
                console.log("NEW STATE:", data);
            } 

            } catch(err) {
                console.error("Error fetching message:" , err)
                setError("Failed to load message");
                setLoading(false);
            }
        }

        fetchMessages();


    }, []);

    

    //Loading state
    // if (messages.length === 0) {
    //     return <div> Loading messages...</div>
    // }


    return (
    <div className= "chat-Window">
        <MessageList
        messages={messages}  
        />
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