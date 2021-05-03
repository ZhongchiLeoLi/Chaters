import ChatAvatar from './ChatAvatar';
import ModalImage from "react-modal-image";

const IncomingMessage = ({ lastMessage, nextMessage, message }) => {
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
    const isLastMessageByUser = !nextMessage || nextMessage.sender.username !== message.sender.username;

    return(
        <div className='message-row' style={{ marginTop: isFirstMessageByUser ? '22px' : '0' }}>
            {isFirstMessageByUser && (
                <div style={{marginLeft: '65px', fontSize: '13px', width: '100%', color: '#535B65' }} >{message.sender.username}</div>
            )}
            {isLastMessageByUser && (
                <ChatAvatar username={message?.sender?.username} className='chat-avatar' />
            )}
            {message?.attachments?.length > 0
                ? (
                    <ModalImage
                        className={`incoming-chat-image ${isLastMessageByUser ? 'last' : ''}`}
                        small={message.attachments[0].file}
                        large={message.attachments[0].file}
                        hideDownload={true}
                        hideZoom={true}
                    />
                ) : (
                    <div className='message' style={{ float: 'left', backgroundColor: '#FFFFFF', marginLeft: isLastMessageByUser ? '12px' : '50px', borderBottomLeftRadius: isLastMessageByUser ? '22px' : '5px', borderTopLeftRadius: isFirstMessageByUser ? '22px' : '5px' }}>
                        {message.text}
                    </div>
                )
            }
        </div>
    );
}

export default IncomingMessage;