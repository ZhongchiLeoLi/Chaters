import ModalImage from "react-modal-image";

const OutgoingMessage = ({ lastMessage, nextMessage, message }) => {
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
    const isLastMessageByUser = !nextMessage || nextMessage.sender.username !== message.sender.username;
    if(message?.attachments?.length > 0) {
        return (
            <ModalImage
                className='outgoing-chat-image'
                small={message.attachments[0].file}
                large={message.attachments[0].file}
                hideDownload={true}
                hideZoom={true}
            />
        );
    }
    return(
        <div className='message' style={{ float: 'right', marginRight: '18px', color: 'black', backgroundColor: '#A2CDC6', borderBottomRightRadius: isLastMessageByUser ? '22px' : '5px', borderTopRightRadius: isFirstMessageByUser ? '22px' : '5px', marginTop: isFirstMessageByUser ? '22px' : '0' }}>
            {message.text}
        </div>
    );
}

export default OutgoingMessage;