const OutgoingMessage = ({ lastMessage, nextMessage, message }) => {
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
    const isLastMessageByUser = !nextMessage || nextMessage.sender.username !== message.sender.username;
    if(message?.attachments?.length > 0) {
        return (
            <img 
                src={message.attachments[0].file}
                alt='attached-image'
                className='chat-image'
                style={{ float: 'right' }}
            />
        );
    }
    return(
        <div className='message' style={{ float: 'right', marginRight: '18px', color: 'black', backgroundColor: '#c4d4d4', borderBottomRightRadius: isLastMessageByUser ? '22px' : '5px', borderTopRightRadius: isFirstMessageByUser ? '22px' : '5px', marginTop: isFirstMessageByUser ? '22px' : '0' }}>
            {message.text}
        </div>
    );
}

export default OutgoingMessage;