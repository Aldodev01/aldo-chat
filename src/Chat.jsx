
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import userEvent from '@testing-library/user-event'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Chat.css'
import db from './firebase'
import { useStateValue } from './StateProvider'
import firebase from 'firebase'

function Chat( ) {

    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("")
    const [roomName, setRoomName] = useState("")
    const { roomId } = useParams()
    const [messages, setMessages] = useState([])
    const [{user}, dispatch ] = useStateValue()

    useEffect ( () => {
        if (roomId) {
            db.collection('rooms')
              .doc(roomId)
              .onSnapshot((snapshot) => 
               setRoomName(snapshot.data().name)
            )

            db.collection('rooms')
              .doc(roomId)
              .collection('messages')
              .orderBy('timestamp', 'asc')
              .onSnapshot(snapshot => (
                  setMessages(snapshot.docs.map(doc => doc.data()))
              ))
        }
    }, [roomId] )

    useEffect( () => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [] )

    const sendMessage = (e) => {
        e.preventDefault()
        console.log("You typed >>>", input)

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("")
    }

    return (
        <div className="chat">
            <div className="chatHeader">
                <Avatar src= {`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chatInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className="chatRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>

                    <IconButton>
                        <AttachFile/>
                    </IconButton>

                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="chatBody">
                {messages.map((message) => (
                    <p className= {`chatMessage ${true && "chatReciver"}`}>
                        <span className="chatName">{message.name}</span>
                        {message.message}
                        <span className="chatTimestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}

            </div>

            <div className="chatFooter">
                <InsertEmoticon/>
                    <form>
                        <input 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            type="text" 
                            placeholder="Type a message" />
                        <button type="submit" onClick={sendMessage}>Send a message</button>
                    </form>
                <Mic/>
            </div>
        </div>
    )
}

export default Chat
