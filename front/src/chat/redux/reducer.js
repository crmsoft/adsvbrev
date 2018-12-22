
import {
    MESSAGE_SENDED,
    MESSAGE_RECIEVED,
    CHATS_LOADED,
    CLOSE_CHAT,
    CHAT_CLOSED
} from './events';

const initialState = {
    action: 'none',
    target: undefined,
    messenger: {
        friend: [],
        chat: []
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case MESSAGE_SENDED : {
            return {
                action: MESSAGE_SENDED,
                target: action.data
            }
        }
        case MESSAGE_RECIEVED : {
            return {
                action: MESSAGE_RECIEVED,
                target: action.data
            }
        }
        case CHATS_LOADED : {
            return {
                ...state,
                messenger: action.data
            }
        }
        case CLOSE_CHAT : {
            return {
                ...state,
                chatToClose: action.data
            }
        }
        case CHAT_CLOSED : {
            return {
                ...state,
                chatToClose: null
            }
        }
        default: return {
            ...state
        }
    }
}

export default reducer;