import store from './redux/store';
import {
    MESSAGE,
    NOTIFICATION,
    SEND_MESSAGE,
    SEND_DUDE_MESSAGE,
    DUDE_CHANNEL_UPDATE,
    AUTH_SUCCESS,
    CHAT_MESSAGES_READ,
    USER_WENT_OFFLINE,
    USER_WENT_ONLINE,
    CHANNEL_ON_CHANNEL_UPDATE,
    USER_HAS_SUBSCRIPTION
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
        store.dispatch({type: USER_WENT_ONLINE, data: response});
    } // end if 

    if (response.action === 'offline')
    {
        store.dispatch({type: USER_WENT_OFFLINE, data: response});
    } // end if 

    if (response.action === 'channel-update') {
        store.dispatch({type: DUDE_CHANNEL_UPDATE, data: response.target})
    } // end if

    if (response.action === 'auth') {
        store.dispatch({type: AUTH_SUCCESS, data: response.token})
    } // end if

    if (response.action === 'new-participant') {
        store.dispatch({type: CHANNEL_ON_CHANNEL_UPDATE, data: response.channel})
    } // end if

    if (response.action === 'pop-participant') {
        store.dispatch({type: CHANNEL_ON_CHANNEL_UPDATE, data: response.channel})
    } // end if

    if (response.action === 'subscription') {
        store.dispatch({type: USER_HAS_SUBSCRIPTION, data: response.channel})
    } // end if
}

const wrapper = new SocketWrapper(window.location.href.indexOf('//game') !== -1);
wrapper.bind(onMessage);

store.subscribe(() => {
    const state = store.getState();
    if (state.received === SEND_MESSAGE)
    {
        wrapper.send(JSON.stringify({action:'message', data: state.data}));
    } else if (state.received === SEND_DUDE_MESSAGE) {
        wrapper.send(JSON.stringify({
            action: 'find-dudes-message',
            data: state.data
        }));
    }// end if
});

