import { useChat } from '../context';
import FeatherIcon from 'feather-icons-react';
import { leaveChat, deleteChat } from 'react-chat-engine'

const OptionButton = ({ chat, isAdmin }) => {
    const { chatConfig } = useChat();
    
    const handleLeaveChatClick = () => {
        if (window.confirm('Are you sure you want to leave this chat?')) {
            leaveChat(chatConfig, chat.id, ()=>{window.location.reload();});
        }
    }

    const handleDeleteChatClick = () => {
        if (window.confirm('Are you sure you want to delete this chat?')) {
            deleteChat(chatConfig, chat.id, ()=>{window.location.reload();});
        }
    }
    
    return(
        <div className='option-button' onClick={isAdmin ? handleDeleteChatClick : handleLeaveChatClick} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderRadius: '10px'}}>
            <div>{isAdmin ? 'Delete Chat' : 'Leave Chat'}</div>
            {isAdmin ? <FeatherIcon className='remove-member-button' size='17' icon='trash-2'/> : <FeatherIcon className='remove-member-button' size='17' icon='user-minus'/>}
        </div>
    );
}

export default OptionButton;