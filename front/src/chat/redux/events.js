import axios from "axios";

const MESSAGE_SENDED = 'MESSAGE_SENDED';
const MESSAGE_RECIEVED = 'MESSAGE_RECIEVED';
const MESSAGE_NOTIFIED = 'MESSAGE_NOTIFIED';
const MARK_MESSAGES_AS_READED = 'MARK_MESSAGES_AS_READED';

const CHATS_LOADED = 'CHATS_LOADED';
const CLOSE_CHAT = 'CLOSE_CHAT';
const CHAT_CLOSED = 'CHAT_CLOSED';
const INC_CHAT_UNREAD = 'INC_CHAT_UNREAD';
const CHAT_READED = 'CHAT_READED';

const STATUS_ONLINE = 'STATUS_ONLINE';
const STATUS_OFFLINE = 'STATUS_OFFLINE';
const STATUS_BUSY = 'STATUS_BUSY';

const SOUND_ON = 'SOUND_ON';
const SOUND_OFF = 'SOUND_OFF';

const m_sended = chat => {
    return {type: MESSAGE_SENDED, data:chat};
}

const m_notified = chat => {
    return {type: MESSAGE_NOTIFIED, data:chat};
}

const m_recieved = chat => {
    return {type: MESSAGE_RECIEVED, data: chat};
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
    MESSAGE_RECIEVED,
    MARK_MESSAGES_AS_READED,
    CHATS_LOADED,
    CHAT_CLOSED,
    CLOSE_CHAT,
    INC_CHAT_UNREAD,
    CHAT_READED,
    MESSAGE_NOTIFIED,
    STATUS_BUSY,
    STATUS_OFFLINE,
    STATUS_ONLINE,
    SOUND_OFF,
    SOUND_ON,
    m_sended,
    m_recieved,
    load_chats,
    close_chat,
    m_notified
}