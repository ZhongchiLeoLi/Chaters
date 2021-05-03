import ChatAvatar from './ChatAvatar';
import { useChat } from '../context';

const ChatCard = ({ chat, isSelected, hasNewMessages }) => {
    const { chatConfig } = useChat();
    const title = chat.title;
    const lastSender = chat.last_message.sender_username.length ? chat.last_message.sender.username : '';
    const lastMessage = chat.last_message.attachments.length ? '[attachment]' : chat.last_message.text;
    const date = new Date(chat.last_message.created);
    const currentDate = new Date();

    // Generate last message's date display based on how far ago was the message sent
    let sentDate = date.toString().slice(4, 10);
    if(currentDate.getFullYear() !== date.getFullYear()) sentDate = date.toString().slice(4, 15);
    else if(currentDate.getDate() === date.getDate()) sentDate = date.toString().slice(16, 21);
    else if(currentDate.getDate() - date.getDate() < 7) sentDate = date.toString().slice(0, 4);

    // Compute username used to generate avatar
    let username = '';
    if(chat.people.length > 1) {
        username = chat.people.find(p => p.person.username !== chatConfig.userName).person.username;
    } else {
        username = chat.people[0].person.username;
    }

    // Generate subtext for the chat card
    let subtext = '';
    if(lastSender.length + lastMessage.length + 2 > 24) subtext = (lastSender + ': ' + lastMessage).slice(0, 23) + '...';
    else subtext = lastSender + ': ' + lastMessage;

    return(
        <div className='chat-card' style={{display: 'flex', backgroundColor: isSelected ? '#E6EFEE' : ( hasNewMessages ? '#def1ed' : '')}}>
            <ChatAvatar chat={chat} username={username} className='chat-card-avatar' />
            <div style={{display: 'flex', flexDirection: 'column', width: 'calc(100% - 12px)', paddingLeft: '12px'}}>
                <h2 className='chat-card-title'>{title}</h2>
                <div style={{display: 'flex', justifyContent: 'space-between', color: '#535B65', fontSize: '0.95rem'}}>
                    {lastMessage.length ? <><p>{subtext}</p><p>{sentDate}</p></> : <p>Say hello!</p>}
                </div>
            </div>
        </div>
    );
}

export default ChatCard;