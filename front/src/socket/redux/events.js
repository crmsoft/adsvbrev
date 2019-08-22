export const MESSAGE = 'MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_DUDE_MESSAGE = 'SEND_DUDE_MESSAGE';
export const DUDE_CHANNEL_UPDATE = 'DUDE_CHANNEL_UPDATE';
export const NOTIFICATION = 'NOTIFICATION';
export const CHAT_MESSAGES_READ = 'CHAT_MESSAGES_READ';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const CHANNEL_ON_CHANNEL_UPDATE = 'CHANNEL_ON_CHANNEL_UPDATE';

export const USER_WENT_ONLINE = 'USER_WENT_ONLINE';
export const USER_WENT_OFFLINE = 'USER_WENT_OFFLINE';
export const USER_HAS_SUBSCRIPTION = 'USER_HAS_SUBSCRIPTION';


export const send_message = chat => {
    return dispatch => dispatch({
        type: SEND_MESSAGE,
        data: chat
    })
}

export const send_dude_message = channel => {
    return dispatch => dispatch({
        type: SEND_DUDE_MESSAGE,
        data: channel
    })
}
