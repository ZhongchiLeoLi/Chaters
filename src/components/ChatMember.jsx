import ChatAvatar from './ChatAvatar';
import { useChat } from '../context';
import FeatherIcon from 'feather-icons-react';
import axios from 'axios';

const ChatMember = ({ chat, username, isAdmin }) => {
    const { chatConfig } = useChat();
    const isAdminMember = username === chat?.admin.username;

    const handleClick = async () => {
        await axios.put(
            `https://api.chatengine.io/chats/${chat.id}/people/`, 
            { 'username': username }, 
            { headers: {
                'Project-ID': chatConfig.projectID,
                'User-Name': chatConfig.userName,
                'User-Secret': chatConfig.userSecret
            }});
    }
    
    return(
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <ChatAvatar chat={chat} username={username} className='chat-avatar' />
                <div style={{paddingLeft: '10px'}}>
                    <p>{username}</p>
                    {isAdminMember && <p style={{fontSize: '0.7rem', color: '#535B65'}}>Admin</p>}
                </div>
            </div>
            {(!isAdminMember && isAdmin) && <FeatherIcon className='remove-member-button' size='17' icon='user-x' onClick={handleClick}/>}
        </div>
    );
}

export default ChatMember;