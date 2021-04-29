const ChatCard = ({ title, lastMessage, lastSender, sentDate, isSelected }) => {
    return(
        <div className='chat-card' style={{display: 'flex', backgroundColor: isSelected ? '#E6EFEE' : ''}}>
            <img className='chat-card-avatar' src='https://www.pngkit.com/png/detail/128-1284523_group-chat-icon-google-group-chat-icon.png' />
            <div style={{display: 'flex', flexDirection: 'column', width: 'calc(100% - 12px)', paddingLeft: '12px'}}>
                <h2 className='chat-card-title'>{title}</h2>
                <div style={{display: 'flex', justifyContent: 'space-between', color: '#717C89'}}>
                    {lastMessage.length ? <><p>{lastSender}: {lastMessage}</p><p>{sentDate}</p></> : <p>Say hello!</p>}
                </div>
            </div>
        </div>
    );
}

export default ChatCard;