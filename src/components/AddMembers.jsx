import { useChat } from '../context';
import { getOtherPeople } from 'react-chat-engine';
import SelectSearch from 'react-select-search';
import { useEffect, useState } from 'react';
import AddMemberOption from './AddMemberOption'
import fuzzySearch from 'react-select-search/src/fuzzySearch'

const AddMembers = ({ chat }) => {
    const { chatConfig } = useChat();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (chat) {
            getOtherPeople(chatConfig, chat.id, (chatId, data) => {
                const userNames = Object.keys(data)
                    .map(key => data[key].username);
                setSearchResults(userNames.map(u => ({ name: u, value: u })));
            });
        } else {
            setSearchResults([]);
        }
    }, [chatConfig, chat]);
    
    return (
        <SelectSearch 
            options={searchResults} 
            placeholder="Add a new member" 
            search 
            filterOptions={fuzzySearch}
            emptyMessage={'No results found'}
            renderOption={(optionsProps, optionData) => (
                <div>
                    <AddMemberOption chat={chat} {...optionData} />
                </div>
            )}
        />
    );
}

export default AddMembers;