import { fb } from '../service';
import { useEffect, useState, useContext, createContext } from 'react';
import { newChat, leaveChat, deleteChat, getMessages } from 'react-chat-engine';

export const ChatContext = createContext();

export const ChatProvider = ({ children, authUser }) => {
    const [myChats, setMyChats] = useState();
    const [chatConfig, setChatConfig] = useState();
    const [selectedChat, setSelectedChat] = useState();

    const createChatClick = () => {
        newChat(chatConfig, { title: '' });
    };
    
    const deleteChatClick = chat => {
        // only allow chat admin to delete chat, leave chat otherwise
        const isAdmin = chat.admin === chatConfig.userName;
        if (isAdmin && window.confirm('Are you sure you want to delete this chat?')) {
            deleteChat(chatConfig, chat.id);
        } else if (window.confirm('Are you sure you want to leave this chat?')) {
            leaveChat(chatConfig, chat.id, chatConfig.userName);
        }
    };

    const selectChatClick = chat => {
        // set selectedChat along with its chat messages
        getMessages(chatConfig, chat.id, messages => {
            setSelectedChat({...chat, messages});
        });
    };

    // Set the chat config once the
    // authUser has initialized.
    useEffect(() => {
        if (authUser) {
            fb.firestore
                .collection('chatUsers')
                .doc(authUser.uid)
                .onSnapshot(snap => {
                    setChatConfig({
                        userSecret: authUser.uid,
                        avatar: snap.data().avatar,
                        userName: snap.data().userName,
                        projectID: 'df2a398d-a6b6-41ce-b4fe-915701fa969d',
                    });
                });
        }
    }, [authUser]);

    return (
        <ChatContext.Provider
            value={{
                myChats,
                setMyChats,
                chatConfig,
                selectedChat,
                setChatConfig,
                setSelectedChat,
                selectChatClick,
                deleteChatClick,
                createChatClick,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

// Custom hook to provide easy state access
export const useChat = () => {
    const {
        myChats,
        setMyChats,
        chatConfig,
        selectedChat,
        setChatConfig,
        setSelectedChat,
        selectChatClick,
        deleteChatClick,
        createChatClick,
    } = useContext(ChatContext);

    return {
        myChats,
        setMyChats,
        chatConfig,
        selectedChat,
        setChatConfig,
        setSelectedChat,
        selectChatClick,
        deleteChatClick,
        createChatClick,
    };
};