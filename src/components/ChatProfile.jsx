import { fb } from '../service';
import { useChat } from '../context';
import ChatAvatar from "./ChatAvatar";
import FeatherIcon from 'feather-icons-react';

const ChatProfile = () => {
    const { chatConfig } = useChat();

    const handleUpload = (event) => {
        const storageRef = fb.storage.ref();
        const uploadRef = storageRef.child(
            `${chatConfig.userSecret}_avatar.jpg`,
        );
        if(event.target.files.length) {
            uploadRef.put(event.target.files[0]).then(() => {
                uploadRef.getDownloadURL().then(url => {
                    fb.firestore
                        .collection('chatUsers')
                        .doc(chatConfig.userSecret)
                        .update({ avatar: url })
                        .then(() => {console.log('Avatar uploaded');});
                });
            });
        }
    }

    return(
        <div className='chat-profile-container'>
            <label className='upload-avatar' htmlFor='upload-avatar' style={{display: 'flex', alignItems: 'flex-end'}}>
                <ChatAvatar username={chatConfig.userName} className='chat-profile-avatar'/>
                <div className='camera-icon-wrapper'>
                    <FeatherIcon className='' icon="camera" size='13' />
                </div>
            </label>
            <input
                type="file"
                id="upload-avatar"
                accept="image/jpeg,image/png"
                style={{ display: 'none' }}
                onChange={handleUpload}
            />
            <div style={{width: '100%', display:'flex', justifyContent: 'space-between'}}>
                <div className='profile-title'>{chatConfig.userName}</div>
                <div>
                    <FeatherIcon className='github-button' icon="github" onClick={()=> window.open('https://github.com/ZhongchiLeoLi/Chaters', '_blank')} style={{marginRight: '0.8rem'}} />
                    <FeatherIcon className='logout-button' icon="log-out" onClick={() => fb.auth.signOut()} />
                </div>
            </div>
        </div>
    );
}

export default ChatProfile;