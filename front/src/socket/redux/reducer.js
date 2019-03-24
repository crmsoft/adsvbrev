import {
    MESSAGE,
    SEND_MESSAGE,
    NOTIFICATION
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
    }
}

export default reducer;