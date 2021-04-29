import { fb } from '../service';
import { useChat } from '../context';
import { useState, useRef } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import ChatAvatar from "./ChatAvatar";
import FeatherIcon from 'feather-icons-react';


const ChatProfile = () => {
    const { createChatClick, chatConfig } = useChat();
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    const [image, setImage] = useState();

    // const signOut = () => {
    //     fb.auth.signOut;
    // }

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
                        .then(() => {
                            // setImage(null);
                        });
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
                    {/* <img className='camera-icon' src="https://user-images.githubusercontent.com/60017285/116612901-10b30e00-a906-11eb-8e37-6890749d72d4.png" alt=""/> */}
                </div>
            </label>
            <input
                type="file"
                // multiple={false}
                id="upload-avatar"
                // accept="image/jpeg,image/png"
                style={{ display: 'none' }}
                onChange={handleUpload}
            />
            <div style={{width: '100%', display:'flex', justifyContent: 'space-between'}}>
                <div className='profile-title'>{chatConfig.userName}</div>
                <FeatherIcon className='logout-button' icon="log-out" onClick={() => fb.auth.signOut()} />
            </div>
            
            {/* <a style={{backgroundColor: '#00A389'}} className src="" alt="" onClick={() => fb.auth.signOut()}>Sign out</a> */}
        </div>
    );
}

export default ChatProfile;