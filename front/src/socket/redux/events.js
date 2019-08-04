export const MESSAGE = 'MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const NOTIFICATION = 'NOTIFICATION';
export const CHAT_MESSAGES_READ = 'CHAT_MESSAGES_READ';

export const USER_WENT_ONLINE = 'USER_WENT_ONLINE';
export const USER_WENT_OFFLINE = 'USER_WENT_OFFLINE';


export const send_message = chat => {
    return dispatch => dispatch({
        type: SEND_MESSAGE,
        data: chat
    })
}