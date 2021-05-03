import { useChat } from '../context';
import PuffLoader from 'react-spinners/PuffLoader';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import ChatAvatar from "./ChatAvatar";
import ChatMember from "./ChatMember";
import ChatTitleForm from "./ChatTitleForm";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState,
} from 'react-accessible-accordion';
import FeatherIcon from 'feather-icons-react';
import AddMembers from "./AddMembers";
import OptionButton from "./OptionButton";
import ModalImage from "react-modal-image";

const ChatSettings = (props) => {
    const { chatConfig } = useChat();
    const { chats, activeChat, userName } = props;
    const chat = chats && chats[activeChat];
    const isAdmin = userName === chat?.admin.username;

    let username = '';
    if(chat?.people.length > 1) {
        username = chat.people.find(p => p.person.username !== chatConfig.userName).person.username;
    } else {
        username = chat?.people[0].person.username;
    }

    const renderChatMembers = () => {
        return chat?.people.map((person, index) => {
            return <ChatMember key={`member_${index}`} chat={chat} username={person.person.username} isAdmin={isAdmin}/>;
        })
    }

    const renderChatMedia = () => {
        return chat?.attachments.map((media, index) => {
            return (
                <ModalImage
                    style={{display: 'inline'}}
                    key={`media_${index}`}
                    className='shared-media'
                    small={media.file}
                    large={media.file}
                    hideDownload={true}
                    hideZoom={true}
                />
            );
        })
    }

    return ( !!chat
        ?   <PerfectScrollbar>
            <div style={{display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center'}}>
                    <div className="chat-setting-profile">
                        <ChatAvatar chat={chat} username={username} className='chat-setting-avatar' />
                        {userName === chat.admin.username 
                            ? <ChatTitleForm chat={chat}/>
                            : <h2 className='chat-title'>{chat.title}</h2>
                        }
                    </div>
                    <Accordion allowZeroExpanded allowMultipleExpanded style={{width: '90%'}} preExpanded={['chatMembers', 'chatMedia', 'chatOptions']} >
                        <AccordionItem uuid='chatMembers'>
                            <AccordionItemHeading>
                                <AccordionItemButton className='accordian-item-button' >
                                    <p>Chat Members</p>
                                    <AccordionItemState>
                                        {({ expanded }) => (expanded ? <FeatherIcon size='20' icon='chevron-up' />
                                                                    : <FeatherIcon size='20' icon='chevron-down' />)}
                                    </AccordionItemState>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel style={{padding: '10px', paddingTop: '0px', marginBottom: '1rem'}}>
                                {chat && isAdmin && <AddMembers chat={chat} username={userName} isAdmin={isAdmin}/>}
                                <div>
                                    {renderChatMembers()}
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid='chatMedia'>
                            <AccordionItemHeading>
                                <AccordionItemButton className='accordian-item-button' >
                                    <p>Shared Media</p>
                                    <AccordionItemState>
                                        {({ expanded }) => (expanded ? <FeatherIcon size='20' icon='chevron-up' />
                                                                    : <FeatherIcon size='20' icon='chevron-down' />)}
                                    </AccordionItemState>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className='shared-media-container' style={{padding: '10px', paddingTop: '0px', marginBottom: '1rem'}}>
                                    {renderChatMedia()}
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid='chatOptions'>
                            <AccordionItemHeading>
                                <AccordionItemButton className='accordian-item-button'>
                                    <p>Options</p>
                                    <AccordionItemState>
                                        {({ expanded }) => (expanded ? <FeatherIcon size='20' icon='chevron-up' />
                                                                    : <FeatherIcon size='20' icon='chevron-down' />)}
                                    </AccordionItemState>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel style={{padding: '10px', paddingTop: '0px', marginBottom: '1rem'}}>
                                <OptionButton chat={chat} isAdmin={isAdmin} />
                            </AccordionItemPanel>
                        </AccordionItem>
                    </Accordion>
                </div>
            </PerfectScrollbar>
        :   <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <PuffLoader color='#00A389' loading={true} css='' size={100} />
            </div>
    );
}

export default ChatSettings;