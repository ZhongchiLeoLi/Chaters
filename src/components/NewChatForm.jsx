import { useChat } from '../context';
import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';

const NewChatForm = () => {
    const { createChatClick } = useChat();
    const [value, setValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent browser from refreshing
        const title = value.trim();
        if(title.length) createChatClick(title);
        setValue('');
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return(
        <div className='new-chat-form-container'>
            <form className='chat-form' onSubmit={handleSubmit}>
                <input 
                    className='new-chat-input'
                    placeholder='Create a new chat'
                    value={value}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    required
                />
                <button type='submit' className='new-chat-button'>
                    +
                </button>
            </form>
        </div>
    );
}

export default NewChatForm;