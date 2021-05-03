import { useChat } from '../context';
import { ChatEngine} from 'react-chat-engine'
import ChatFeed from './ChatFeed';
import ChatList from './ChatList';
import ChatSettings from './ChatSettings';

const Chat = () => {
    const { chatConfig } = useChat();

    return( !!chatConfig &&
        <ChatEngine
            height='100vh'
            projectID='df2a398d-a6b6-41ce-b4fe-915701fa969d'
            userName={chatConfig.userName}
            userSecret={chatConfig.userSecret}
            renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState}/>}
            renderChatList={(chatAppState) => <ChatList {...chatAppState}/>}
            renderChatSettings={(chatAppState) => <ChatSettings {...chatAppState}/>}
        />
    );
}

export default Chat;