
import {
    MESSAGE_SENDED,
    MESSAGE_RECEIVED,
    MARK_MESSAGES_AS_READ,
    CHATS_LOADED,
    CLOSE_CHAT,
    CHAT_CLOSED,
    INC_CHAT_UNREAD,
    CHAT_READ,
    CHAT_PUSH,
    CHAT_UPDATE,
    CHAT_REMOVE,
    MESSAGE_NOTIFIED,
    STATUS_BUSY,
    STATUS_ONLINE,
    STATUS_OFFLINE,
    SOUND_OFF,
    SOUND_ON,
    USER_STATUS_OFFLINE,
    USER_STATUS_ONLINE
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
        case CHAT_REMOVE : {
            return {
                ...state,
                messenger: {
                    ...state.messenger,
                    chat: state.messenger.chat.filter(chat => chat.hash_id !== action.data)
                }
            }
        }
        case CHAT_UPDATE : {
            return {
                ...state,
                messenger: {
                    ...state.messenger,
                    chat: [
                        action.data,
                        ...state.messenger.chat.filter(c => c.hash_id !== action.data.hash_id)
                    ]
                }
            } 
        }
        case CHAT_PUSH : {
            return {
                ...state,
                messenger: {
                    ...state.messenger,
                    chat: [
                        action.data,
                        ...state.messenger.chat
                    ]
                }
            }
        }
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

        case MARK_MESSAGES_AS_READ : {
            const chat_id = action.data;
            return {
                ...state,
                messenger: {
                    ...state.messenger,
                    chat: state.messenger.chat.map(chat => {
                        if (chat.hash_id === chat_id)
                        {
                            chat.readed = (new Date()).getTime()
                        } // end if

                        return chat;
                    })
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
                    chat: chats.sort((a,b) => a.unread < b.unread),
                    unread_chats: chats.reduce((count, chat) => {
                        return chat.unread ? (++count) : count;
                    }, 0)
                }
            }
        }
        case CHAT_READ : {
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
        case MESSAGE_RECEIVED : {
            return {
                action: MESSAGE_RECEIVED,
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
        case USER_STATUS_OFFLINE : {
            return {
                ...state,
                messenger: {
                    ...state.messenger,
                    friend: state.messenger.friend.map(user => {
                        if (user.username === action.data.target) {
                            user.status = 'offline';
                        }
                        return user;
                    })
                }
            }
        }
        case USER_STATUS_ONLINE : {
            return {
                ...state,
                messenger: {
                    ...state.messenger,
                    friend: state.messenger.friend.map(user => {
                        if (user.username === action.data.target) {
                            user.status = action.data.status;
                        }
                        return user;
                    })
                }
            }
        }
        default: return {
            ...state
        }
    }
}

export default reducer;