import store from './redux/store';
import {
    MESSAGE,
    NOTIFICATION,
    SEND_MESSAGE,
    CHAT_MESSAGES_READED
} from './redux/events';
const socket = new WebSocket('wss://divdudes.com/yraMgipTBPDo42aK/?token=' + window.gg.wsc());
//const socket = new WebSocket('ws://127.0.0.1:8181/?token=' + window.gg.wsc());

socket.onclose = function(){
    //document.location.reload();
}

socket.onmessage = ({data}) => {
    
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
        store.dispatch({type: CHAT_MESSAGES_READED, data: response.target});
    } // end if 
}

store.subscribe(() => {
    const state = store.getState();

    if (state.recieved === SEND_MESSAGE)
    {
        socket.send(JSON.stringify({action:'message', data: state.data}));
    } // end if
});

