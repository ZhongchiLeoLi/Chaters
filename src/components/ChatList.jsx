import { useState } from "react";
import { useChat } from '../context';
import PuffLoader from 'react-spinners/PuffLoader';
import ChatCard from './ChatCard';
import NewChatForm from './NewChatForm';
import { number } from "yup";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import ChatAvatar from "./ChatAvatar";
import ChatProfile from './ChatProfile';


const ChatList = (props) => {
    const { myChats, createChatClick, chatConfig } = useChat();
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
            
            const isSelected = key === activeChat.toString();

            
            // let avatar = ''
            // const sentDate = (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24) >= 7 ? date.toString().slice(4, 10) : date.toString().slice(0, 4);
            // const sentDate = date.toString();

            const selectChat = () => {
                setActiveChat(parseInt(key));
            }

            return (
                <div key={`cht_${index}`} onClick={selectChat} >                
                    <ChatCard 
                        chat={chat}
                        isSelected={isSelected} 
                    />
                </div>
            );
        });
    }

    return ( !!chats
    ?   <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <ChatProfile />
            <NewChatForm />
            <PerfectScrollbar className='chat-list'>
                {renderChats()}
            </PerfectScrollbar>
            {/* <button className='new-chat-button' onClick={createChatClick}>New Chat</button> */}
            
        </div>
    :   <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <PuffLoader color='#A1E5AB' loading={true} css='' size={100} />
        </div>
    );

}

export default ChatList;