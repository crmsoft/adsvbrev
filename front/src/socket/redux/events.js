export const MESSAGE = 'MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const NOTIFICATION = 'NOTIFICATION';


export const send_message = chat => {
    return dispatch => dispatch({
        type: SEND_MESSAGE,
        data: chat
    })
}