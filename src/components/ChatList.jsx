import { useState } from "react";
import { useChat } from '../context';
import PuffLoader from 'react-spinners/PuffLoader';
import ChatCard from './ChatCard';
import { number } from "yup";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'


const ChatList = (props) => {
    const { myChats, createChatClick } = useChat();
    const { chats, activeChat, setActiveChat } = props;

    console.log(props);
    // const keys = Object.keys(chats);
    // console.log(keys);

    const handleClick = (event) => {

    }

    const renderChats = () => {
        const keys = Object.keys(chats);
        return keys.map((key, index) => {
            const chat = chats[key];
            const title = chat.title;
            const lastSender = chat.last_message.sender_username.length ? chat.last_message.sender.username : '';
            const lastMessage = chat.last_message.attachments.length ? '[attachment]' : chat.last_message.text;
            const date = new Date(chat.last_message.created);
            const currentDate = new Date();
            const isSelected = key === activeChat.toString();
            console.log(date.toString());
            let sentDate = date.toString().slice(4, 10);
            if(currentDate.getFullYear() !== date.getFullYear()) sentDate = date.toString().slice(4, 15);
            else if(currentDate.getDate() === date.getDate()) sentDate = date.toString().slice(16, 21);
            else if(currentDate.getDate() - date.getDate() < 7) sentDate = date.toString().slice(0, 4);
            // const sentDate = (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24) >= 7 ? date.toString().slice(4, 10) : date.toString().slice(0, 4);
            // const sentDate = date.toString();

            const selectChat = () => {
                setActiveChat(parseInt(key));
            }

            return (
                <div key={`cht_${index}`} onClick={selectChat} >                
                    <ChatCard 
                        key={`cht_${index}`} 
                        title={title} 
                        lastSender={lastSender} 
                        lastMessage={lastMessage} 
                        sentDate={sentDate} 
                        isSelected={isSelected} 
                    />
                </div>
            );
        });
    }

    return ( !!chats
    ?   <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <div className='chat-title-container'>
                <div className='chat-title'>Chat List</div>
            </div>
            <PerfectScrollbar className='chat-list'>
                {renderChats()}
            </PerfectScrollbar>
            <button className='new-chat-button' onClick={createChatClick}>New Chat</button>

        </div>
    :   <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <PuffLoader color='#A1E5AB' loading={true} css='' size={100} />
        </div>
    );

}

export default ChatList;