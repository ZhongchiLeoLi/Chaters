import { useEffect } from 'react';
import { useChat } from '../context';
import { getChats, ChatEngine} from 'react-chat-engine'
import ChatFeed from './ChatFeed';
import ChatList from './ChatList';

const Chat = () => {
    const { myChats, setMyChats, chatConfig, selectedChat } = useChat();

    useEffect(() => {
        console.log('My Chats: ', myChats);
    }, [myChats]);

    return( !!chatConfig &&
        <ChatEngine
            height='100vh'
            projectID='df2a398d-a6b6-41ce-b4fe-915701fa969d'
            userName={chatConfig.userName}
            userSecret={chatConfig.userSecret}
            // onConnect={() => {
            //     getChats(chatConfig, setMyChats);
            // }}
            renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState}/>}
            renderChatList={(chatAppState) => <ChatList {...chatAppState}/>}
        />
    );
}

export default Chat;