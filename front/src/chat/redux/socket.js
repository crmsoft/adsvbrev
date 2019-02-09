import store from './store';
import {
    MESSAGE_RECIEVED
} from './events';
const socket = new WebSocket('ws://35.205.191.229/yraMgipTBPDo42aK/?token=' + window.gg.wsc());
//const socket = new WebSocket('ws://127.0.0.1:8181/?token=' + window.gg.wsc());

socket.onclose = function(){
    //document.location.reload();
}

socket.onmessage = ({data}) => {
    const response = JSON.parse(data);
    if(response.action === 'message')
    {
        store.dispatch({type: MESSAGE_RECIEVED, data: response.target});
    }
}

export default {
    chatMessagePush: chat => {
        socket.send(JSON.stringify({action:'message', data: chat}));
    }
};

