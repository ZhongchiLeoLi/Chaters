import { fb } from '../service';
import { useEffect, useState, useContext, createContext } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children, authUser }) => {
    const [chatConfig, setChatConfig] = useState();

    useEffect(() => {
        if (authUser) {
            fb.firestore
                .collection('chatUsers')
                .doc(authUser.uid)
                .onSnapshot(res => {
                    setChatConfig({
                        userSecret: authUser.uid,
                        avatar: res.data().avatar,
                        userName: res.data().userName,
                        projectID: 'df2a398d-a6b6-41ce-b4fe-915701fa969d',
                    });
                });
        }
    }, [authUser]);

    return (
        <ChatContext.Provider
            value={{
                chatConfig,
                setChatConfig
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

// Custom hook to provide easy state access
export const useChat = () => {
    const {
        chatConfig,
        setChatConfig
    } = useContext(ChatContext);

    return {
        chatConfig,
        setChatConfig
    };
};