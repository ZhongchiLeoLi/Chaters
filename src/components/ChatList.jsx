import { useChat } from '../context';
import PuffLoader from 'react-spinners/PuffLoader';
import ChatCard from './ChatCard';
import NewChatForm from './NewChatForm';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import ChatProfile from './ChatProfile';


const ChatList = (props) => {
    const { chatConfig } = useChat();
    const { chats, activeChat, setActiveChat } = props;

    function compare(a, b) {
        const dateA = new Date(chats[a].last_message.created);
        const dateB = new Date(chats[b].last_message.created);
        if ( dateA > dateB ) {
            return -1;
        }
        if ( dateA < dateB ) {
            return 1;
        }
        return 0;
    }

    const renderChats = () => {
        const keys = Object.keys(chats);
        try {
            keys.sort( compare );
        } catch (error) {
            window.location.reload(false);
        }
        
        return keys.map((key, index) => {
            const chat = chats[key];
            const isSelected = key === activeChat.toString();
            const hasNewMessages = chat.people.find(p => p.person.username === chatConfig.userName).last_read !== chat.last_message.id;
         
            const selectChat = () => {
                setActiveChat(parseInt(key));
            }

            return (
                <div key={`cht_${index}`} onClick={selectChat} >                
                    <ChatCard 
                        chat={chat}
                        isSelected={isSelected} 
                        hasNewMessages={hasNewMessages}
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
        </div>
    :   <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <PuffLoader color='#00A389' loading={true} css='' size={100} />
        </div>
    );

}

export default ChatList;