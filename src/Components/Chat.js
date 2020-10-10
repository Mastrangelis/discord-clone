import React, { useState, useEffect } from 'react'
import '../styles/Chat.css';
import ChatHeader from './ChatHeader';
import Message from './Message';
import GifIcon from '@material-ui/icons/Gif';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';
import { useSelector } from 'react-redux';
import { selectChannelName, selectChannelId } from '../features/appSlice';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import firebase from 'firebase';

function Chat() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const user = useSelector(selectUser);
    const channelName = useSelector(selectChannelName);
    const channelId = useSelector(selectChannelId);

    useEffect(() => {
        if (channelId) {    
            db.collection('channels')
              .doc(channelId)
              .collection('messages')
              .orderBy('timestamp', 'desc')
              .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [channelId])

    const sendMessage = e => {
        e.preventDefault();
        
        let message = {
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }

        db.collection('channels')
          .doc(channelId)
          .collection('messages')
          .add(message);


        setInput("");
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>

            <div className="chat__messages">
                {messages.map(({timestamp, message, user}, index) => (
                    <Message
                        key={index}
                        message={message}
                        user={user}
                        timestamp={timestamp}
                    />
                ))}
            </div>

            <div className="chat__input">
                <form>
                    <input
                        value={input}
                        disabled={!channelId}
                        placeholder={channelName ? `Send on ${channelName} channel!` : ''}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button 
                        disabled={!channelId}
                        className="chat__inputButton"
                        type="submit"
                        onClick={(e) => sendMessage(e)}    
                    >
                        Send Message
                    </button>
                    <SendIcon 
                        fontSize="large"
                        onClick={(e) => sendMessage(e)}
                    />
                </form>

                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>

        </div>
    )
}

export default Chat
