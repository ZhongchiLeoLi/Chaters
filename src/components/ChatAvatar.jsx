import { fb } from '../service';
import { useChat } from '../context';
import { useEffect, useState } from 'react';

const ChatAvatar = ({ chat, username, className, style }) => {
    const { chatConfig } = useChat();
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        if((className === 'chat-card-avatar' || className === 'chat-setting-avatar') && chat?.people.length > 2) {
            setAvatar('https://github.com/ZhongchiLeoLi/Chaters/blob/master/public/groupAvatar.png?raw=true');
        } else {
            fb.firestore
                .collection('chatUsers')
                .where('userName', '==', username)
                .get()
                .then(res => {
                    const data = res.docs[0]?.data();
                    if (data?.avatar) {
                        setAvatar(data.avatar);
                    }
                });
        }
        return () => setAvatar('');
    }, [chat, chatConfig, username]);

    return avatar ? (
        <img className={className} src={avatar} alt={`${username}'s avatar`} style={style}/>
    ) : (
        <div className={`empty-avatar ${className}`} style={style}>
            {username[0].toUpperCase()}
        </div>
    );
};

export default ChatAvatar;