
import {
    MESSAGE_SENDED,
    MESSAGE_RECIEVED,
    CHATS_LOADED,
    CLOSE_CHAT,
    CHAT_CLOSED,
    INC_CHAT_UNREAD,
    CHAT_READED,
    MESSAGE_NOTIFIED,
    STATUS_BUSY,
    STATUS_ONLINE,
    STATUS_OFFLINE,
    SOUND_OFF,
    SOUND_ON
} from './events';

const initialState = {
    action: 'none',
    target: undefined,
    messenger: {
        friend: [],
        chat: [],
        unread_chats: 0
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SOUND_OFF : {
            return {
                ...state,
                messenger: {
                    ...state.messenger,
                    m_sound: 'off'
                }
            }
        }
        case SOUND_ON : {
            return {
                ...state,
                messenger: {
                    ...state.messenger,
                    m_sound: 'on'
                }
            }
        }
        case STATUS_BUSY : {
            return {
                ...state,
                messenger: {
                    ...state.messenger,
                    m_status: 'busy'
                }
            }
        }
        case STATUS_ONLINE : {
            return {
                ...state,
                messenger: {
                    ...state.messenger,
                    m_status: 'online'
                }
            }
        }
        case STATUS_OFFLINE : {
            return {
                ...state,
                messenger: {
                    ...state.messenger,
                    m_status: 'offline'
                }
            }
        }

        case MESSAGE_SENDED : {
            return {
                ...state,
                action: null,
            }
        }
        case INC_CHAT_UNREAD : {
            const chats = state.messenger.chat.map(chat => {                        
                if(action.data === chat.hash_id)
                {
                    chat.unread++;
                } // end if

                return chat;
            });

            return {
                ...state,
                action: null,
                messenger: {
                    ...state.messenger,
                    chat: chats,
                    unread_chats: chats.reduce((count, chat) => {
                        return chat.unread ? (++count) : count;
                    }, 0)
                }
            }
        }
        case CHAT_READED : {
            const newChat = action.data;
            const added = state.messenger.chat.filter(
                function( chat )
                {
                    return chat.hash_id === newChat.hash_id
                }
            );

            let chats = state.messenger.chat;

            if(added.length)
            {
                const index = chats.indexOf(added.pop());
                chats[index].unread = 0;
            }
            else
            {
                chats.push(newChat);
            }


            return {
                ...state,
                action: null,
                messenger: {
                    ...state.messenger,
                    chat: [
                        ...chats
                    ],
                    unread_chats: chats.reduce((count, chat) => {
                        return chat.unread ? (++count) : count;
                    }, 0)
                }
            }
        }
        case MESSAGE_RECIEVED : {
            return {
                action: MESSAGE_RECIEVED,
                target: action.data,
                messenger: {
                    ...state.messenger
                }
            }
        }
        case MESSAGE_NOTIFIED : {            
            return {
                ...state,
                action: null
            }
        }
        case CHATS_LOADED : {            
            return {
                ...state,
                messenger: {
                    ...action.data,
                    unread_chats: state.messenger.chat.reduce((count, chat) => {
                        return chat.unread ? (++count) : count;
                    }, 0)
                }
            }
        }
        case CLOSE_CHAT : {
            return {
                ...state,
                chatToClose: action.data,
                action: CLOSE_CHAT
            }
        }
        case CHAT_CLOSED : {
            return {
                ...state,
                chatToClose: null,
                action: null
            }
        }
        default: return {
            ...state
        }
    }
}

export default reducer;