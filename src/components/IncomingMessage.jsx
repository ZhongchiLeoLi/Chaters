const IncomingMessage = ({ lastMessage, nextMessage, message }) => {
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
    const isLastMessageByUser = !nextMessage || nextMessage.sender.username !== message.sender.username;

    return(
        <div className='message-row' style={{ marginTop: isFirstMessageByUser ? '22px' : '0' }}>
            {isFirstMessageByUser && (
                <div style={{marginLeft: '65px', fontSize: '13px', width: '100%', color: '#717C89' }} >{message.sender.username}</div>
            )}
            {isLastMessageByUser && (
                <div 
                    className='chat-avatar'
                    style={{backgroundImage: `url(${message?.sender?.avatar})`}}
                />
            )}
            {message?.attachments?.length > 0
                ? (
                    <img 
                        src={message.attachments[0].file}
                        alt='attached-image'
                        className='chat-image'
                        style={{ marginLeft: isLastMessageByUser ? '12px' : '50px' }}
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