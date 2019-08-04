import axios from "axios";

const MESSAGE_SENDED = 'MESSAGE_SENDED';
const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
const MESSAGE_NOTIFIED = 'MESSAGE_NOTIFIED';
const MARK_MESSAGES_AS_READ = 'MARK_MESSAGES_AS_READ';

const CHATS_LOADED = 'CHATS_LOADED';
const CLOSE_CHAT = 'CLOSE_CHAT';
const CHAT_CLOSED = 'CHAT_CLOSED';
const INC_CHAT_UNREAD = 'INC_CHAT_UNREAD';
const CHAT_READ = 'CHAT_READ';
const CHAT_PUSH = 'CHAT_PUSH';
const CHAT_UPDATE = 'CHAT_UPDATE';
const CHAT_REMOVE = 'CHAT_REMOVE'; 

const STATUS_ONLINE = 'STATUS_ONLINE';
const STATUS_OFFLINE = 'STATUS_OFFLINE';
const STATUS_BUSY = 'STATUS_BUSY';

const SOUND_ON = 'SOUND_ON';
const SOUND_OFF = 'SOUND_OFF';

const USER_STATUS_ONLINE = 'USER_STATUS_ONLINE';
const USER_STATUS_OFFLINE = 'USER_STATUS_OFFLINE';

const m_sended = chat => {
    return {type: MESSAGE_SENDED, data:chat};
}

const m_notified = chat => {
    return {type: MESSAGE_NOTIFIED, data:chat};
}

const m_received = chat => {
    return {type: MESSAGE_RECEIVED, data: chat};
}

const load_chats = () => {
    return dispatch => axios.get(`/chats`)
                        .then(({data}) => {                            
                            dispatch({type:CHATS_LOADED, data: data.data})
                        })
}

const close_chat = hash => {
    return {type: CLOSE_CHAT, data: hash}
}

export {
    MESSAGE_SENDED,
    MESSAGE_RECEIVED,
    MARK_MESSAGES_AS_READ,
    CHATS_LOADED,
    CHAT_CLOSED,
    CLOSE_CHAT,
    CHAT_PUSH,
    CHAT_UPDATE,
    CHAT_REMOVE,
    INC_CHAT_UNREAD,
    CHAT_READ,
    MESSAGE_NOTIFIED,
    STATUS_BUSY,
    STATUS_OFFLINE,
    STATUS_ONLINE,
    SOUND_OFF,
    SOUND_ON,
    m_sended,
    m_received,
    load_chats,
    close_chat,
    m_notified,
    USER_STATUS_OFFLINE,
    USER_STATUS_ONLINE
}