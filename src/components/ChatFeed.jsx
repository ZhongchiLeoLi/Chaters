import ChatForm from './ChatForm';
import OutgoingMessage from './OutgoingMessage';
import IncomingMessage from './IncomingMessage';
import ScrollableFeed from 'react-scrollable-feed';
import PuffLoader from 'react-spinners/PuffLoader';
import { useState } from 'react';


// import { ChatHeader } from 'react-chat-engine';

const ChatFeed = (props) => {
    // console.log(props);
    const [loading, setLoading] = useState(true);
    const { chats, activeChat, userName, messages } = props;
    const chat = chats && chats[activeChat];

    const renderReadReceipts = (message, isOutgoingMessage) => {
        return chat.people.map((person, index) => person.last_read === message.id && (
            <div 
                key={`read_${index}`}
                className='read-receipt'
                style={{ float: isOutgoingMessage ? 'right' : 'left', backgroundImage: `url(${person?.person?.avatar})` }}
            />
        ));
    }

    const renderMessages = () => {
        const keys = Object.keys(messages);
        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const nextMessageKey = index === messages.length - 1 ? null : keys[index + 1];
            const isOutgoingMessage = userName === message.sender.username;
            
            // console.log(isOutgoingMessage);

            return (
                <div key={`msg_${index}`} >
                    <div className='message-block'>
                        {
                            isOutgoingMessage
                            ? <OutgoingMessage message={message} lastMessage={messages[lastMessageKey]} nextMessage={messages[nextMessageKey]}/>
                            : <IncomingMessage message={message} lastMessage={messages[lastMessageKey]} nextMessage={messages[nextMessageKey]} />
                        }
                    </div>
                    <div className='read-receipts' style={{ marginRight: isOutgoingMessage ? '18px' : '0px', marginLeft: isOutgoingMessage ? '0px' : '75px' }}>
                        {renderReadReceipts(message, isOutgoingMessage)}
                    </div>
                </div>
            );
        })
    }


    return ( !!chat
        ?   <div className='chat-feed'>
                {/* <ChatHeader /> */}
                <div className='chat-title-container'>
                    <div className='chat-title'>{chat.title}</div>
                    <div className='chat-subtitle'>
                        {chat.people.map((person) => ` ${person.person.username}`)}
                    </div>
                </div>
                <ScrollableFeed className='chat-messages'>
                    {renderMessages()}
                </ScrollableFeed>
                <div className='chat-form-container'>
                    <ChatForm {...props} chatId={activeChat} />
                </div>
            </div>
        :   <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <PuffLoader color='#A1E5AB' loading={true} css='' size={100} />
            </div>
    );
}

export default ChatFeed;