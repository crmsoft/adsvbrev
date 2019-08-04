import store from './redux/store';
import {
    MESSAGE,
    NOTIFICATION,
    SEND_MESSAGE,
    CHAT_MESSAGES_READ,
    USER_WENT_OFFLINE,
    USER_WENT_ONLINE
} from './redux/events';
import SocketWrapper from './SocketWrapper';

const onMessage = ({data}) => {
    
    const response = JSON.parse(data);
    
    if(response.action === 'message')
    {
        store.dispatch({type: MESSAGE, data: response.target});
    } // end if

    if (response.action === 'notification')
    {
        store.dispatch({type: NOTIFICATION, data: null});
    } // end if

    if (response.action === 'messages-viewed')
    {
        store.dispatch({type: CHAT_MESSAGES_READ, data: response.target});
    } // end if 

    if (response.action === 'online')
    {
        store.dispatch({type: USER_WENT_ONLINE, data: response.target});
    } // end if 

    if (response.action === 'offline')
    {
        store.dispatch({type: USER_WENT_OFFLINE, data: response.target});
    } // end if 
}

const wrapper = new SocketWrapper(true);
wrapper.bind(onMessage);

store.subscribe(() => {
    const state = store.getState();
    if (state.received === SEND_MESSAGE)
    {
        wrapper.send(JSON.stringify({action:'message', data: state.data}));
    } // end if
});

