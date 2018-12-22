import axios from "axios";

const MESSAGE_SENDED = 'MESSAGE_SENDED';
const MESSAGE_RECIEVED = 'MESSAGE_RECIEVED';
const CHATS_LOADED = 'CHATS_LOADED';
const CLOSE_CHAT = 'CLOSE_CHAT';
const CHAT_CLOSED = 'CHAT_CLOSED';

const m_sended = chat => {
    return {type: MESSAGE_SENDED, data:chat};
}

const m_recieved = chat => {
    return {type: MESSAGE_RECIEVED, data: chat};
}

const load_chats = () => {
    return dispatch => axios.get(`/chats`)
                        .then(response => dispatch({type:CHATS_LOADED, data: response.data}))
}

const close_chat = hash => {
    return {type: CLOSE_CHAT, data: hash}
}

export {
    MESSAGE_SENDED,
    MESSAGE_RECIEVED,
    CHATS_LOADED,
    CHAT_CLOSED,
    CLOSE_CHAT,
    m_sended,
    m_recieved,
    load_chats,
    close_chat
}