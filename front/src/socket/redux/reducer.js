import {
    MESSAGE,
    SEND_MESSAGE,
    NOTIFICATION,
    CHAT_MESSAGES_READ,
    DUDE_CHANNEL_UPDATE,
    USER_WENT_ONLINE,
    AUTH_SUCCESS,
    USER_WENT_OFFLINE,
    SEND_DUDE_MESSAGE,
    CHANNEL_ON_CHANNEL_UPDATE,
    USER_HAS_SUBSCRIPTION
} from './events';


const reducer = (state = {
    received: null,
    channel_timestamp: +(new Date)
}, action) => {
    switch(action.type)
    {
        case NOTIFICATION : {
            return {
                ...state,
                received: NOTIFICATION
            }
        }
        case MESSAGE : {
            return {
                ...state,
                received: MESSAGE,
                data: action.data
            }
        }
        case SEND_MESSAGE : {
            return {
                ...state,
                received: SEND_MESSAGE,
                data: action.data
            }            
        }
        case CHAT_MESSAGES_READ : {
            return {
                ...state,
                received: CHAT_MESSAGES_READ,
                data: action.data
            }
        }
        case USER_WENT_ONLINE : {
            return {
                ...state,
                received: USER_WENT_ONLINE,
                data: action.data
            }
        }
        case USER_WENT_OFFLINE : {
            return {
                ...state,
                received: USER_WENT_OFFLINE,
                data: action.data,
            }
        }
        case SEND_DUDE_MESSAGE : {
            return {
                ...state,
                received: SEND_DUDE_MESSAGE,
                data: action.data
            }
        }
        case DUDE_CHANNEL_UPDATE : {
            return {
                ...state,
                received: DUDE_CHANNEL_UPDATE,
                data: action.data
            }
        }
        case AUTH_SUCCESS : {
            return {
                ...state,
                received: AUTH_SUCCESS,
                token: action.data
            }
        }
        case USER_HAS_SUBSCRIPTION : {
            return {
                ...state,
                received: USER_HAS_SUBSCRIPTION
            }
        }
        case CHANNEL_ON_CHANNEL_UPDATE : {
            return {
                ...state,
                received: CHANNEL_ON_CHANNEL_UPDATE,
                data: action.data,
                channel_timestamp: +(new Date)
            }
        }
    }

    return state;
}

export default reducer;