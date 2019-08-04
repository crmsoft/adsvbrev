import {
    MESSAGE,
    SEND_MESSAGE,
    NOTIFICATION,
    CHAT_MESSAGES_READ,
    USER_WENT_ONLINE,
    USER_WENT_OFFLINE
} from './events';


const reducer = (state = {
    received: null
}, action) => {
    switch(action.type)
    {
        case NOTIFICATION : {
            return {
                received: NOTIFICATION
            }
        }
        case MESSAGE : {
            return {
                received: MESSAGE,
                data: action.data
            }
        }
        case SEND_MESSAGE : {
            return {
                received: SEND_MESSAGE,
                data: action.data
            }            
        }
        case CHAT_MESSAGES_READ : {
            return {
                received: CHAT_MESSAGES_READ,
                data: action.data
            }
        }
        case USER_WENT_ONLINE : {
            return {
                received: USER_WENT_ONLINE,
                data: action.data
            }
        }
        case USER_WENT_OFFLINE : {
            return {
                received: USER_WENT_OFFLINE,
                data: action.data
            }
        }
    }
}

export default reducer;