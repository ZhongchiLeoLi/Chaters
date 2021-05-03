import ChatAvatar from './ChatAvatar';
import { useChat } from '../context';
import { addPerson } from 'react-chat-engine';

const AddMemberOption = ({ chat, name }) => {
    const { chatConfig } = useChat();

    const handleClick = () => {
        addPerson(chatConfig, chat.id, name, () => {});
    }
    
    return(
        <div className='add-member-options' onClick={handleClick} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 5px', borderRadius: '10px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <ChatAvatar chat={chat} username={name} className='chat-avatar' />
                <div style={{paddingLeft: '10px'}}>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    );
}

export default AddMemberOption;