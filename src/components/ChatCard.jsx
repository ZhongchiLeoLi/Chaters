import ChatAvatar from './ChatAvatar';
import { useChat } from '../context';

const ChatCard = ({ chat, isSelected }) => {
    const { chatConfig } = useChat();
    const title = chat.title;
    const lastSender = chat.last_message.sender_username.length ? chat.last_message.sender.username : '';
    const lastMessage = chat.last_message.attachments.length ? '[attachment]' : chat.last_message.text;
    const date = new Date(chat.last_message.created);
    const currentDate = new Date();

    let sentDate = date.toString().slice(4, 10);
    if(currentDate.getFullYear() !== date.getFullYear()) sentDate = date.toString().slice(4, 15);
    else if(currentDate.getDate() === date.getDate()) sentDate = date.toString().slice(16, 21);
    else if(currentDate.getDate() - date.getDate() < 7) sentDate = date.toString().slice(0, 4);

    let username = '';
    if(chat.people.length > 1) {
        username = chat.people.find(p => p.person.username !== chatConfig.userName).person.username;
    } else {
        username = chat.people[0].person.username;
    }

    let subtext = '';
    if(lastSender.length + lastMessage.length + 2 > 26) subtext = (lastSender + ': ' + lastMessage).slice(0, 23) + '...';
    else subtext = lastSender + ': ' + lastMessage;

    return(
        <div className='chat-card' style={{display: 'flex', backgroundColor: isSelected ? '#E6EFEE' : ''}}>
            <ChatAvatar chat={chat} username={username} className='chat-card-avatar' />
            {/* <img className='chat-card-avatar' src='https://user-images.githubusercontent.com/60017285/116497613-cc782d00-a875-11eb-8135-130677aa0f3e.png' /> */}
            <div style={{display: 'flex', flexDirection: 'column', width: 'calc(100% - 12px)', paddingLeft: '12px'}}>
                <h2 className='chat-card-title'>{title}</h2>
                <div style={{display: 'flex', justifyContent: 'space-between', color: '#535B65'}}>
                    {lastMessage.length ? <><p>{subtext}</p><p>{sentDate}</p></> : <p>Say hello!</p>}
                </div>
            </div>
        </div>
    );
}

export default ChatCard;