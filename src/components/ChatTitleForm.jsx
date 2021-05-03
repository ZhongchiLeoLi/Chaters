import { useChat } from '../context';
import { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import axios from 'axios';

const ChatTitleForm = ({ chat }) => {
    const { chatConfig } = useChat();
    const [value, setValue] = useState(chat.title);

    useEffect(() => {
        setValue(chat.title);
    }, [chat]);

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent browser from refreshing
        const title = value.trim();
        if(title.length) {
            await axios.patch(
                `https://api.chatengine.io/chats/${chat.id}/`, 
                { title: title }, 
                { headers: {
                    'Project-ID': chatConfig.projectID,
                    'User-Name': chatConfig.userName,
                    'User-Secret': chatConfig.userSecret
                }});
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return(
        <div className='chat-title-form-container'>
            <form className='chat-title-form' onSubmit={handleSubmit}>
                <input 
                    className='chat-title-input'
                    placeholder='Rename your chat'
                    value={value}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    required
                />
                <button type='submit' className='chat-title-button'>
                    <FeatherIcon size='17' icon='edit-3' />
                </button>
            </form>
        </div>
    );
}

export default ChatTitleForm;