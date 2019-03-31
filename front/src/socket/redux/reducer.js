import {
    MESSAGE,
    SEND_MESSAGE,
    NOTIFICATION,
    CHAT_MESSAGES_READED
} from './events';


const reducer = (state = {
    recieved: null
}, action) => {
    switch(action.type)
    {
        case NOTIFICATION : {
            return {
                recieved: NOTIFICATION
            }
        }
        case MESSAGE : {
            return {
                recieved: MESSAGE,
                data: action.data
            }
        }
        case SEND_MESSAGE : {
            return {
                recieved: SEND_MESSAGE,
                data: action.data
            }            
        }
        case CHAT_MESSAGES_READED : {
            return {
                recieved: CHAT_MESSAGES_READED,
                data: action.data
            }
        }
    }
}

export default reducer;