import store from './store';
import {
    MESSAGE_SENDED,
    MESSAGE_RECIEVED
} from './events';
const socket = new WebSocket('ws://127.0.0.1:8181?token=' + window.gg.wsc());

socket.onclose = function(){
    document.location.reload();
}

socket.onmessage = ({data}) => {
    const response = JSON.parse(data);
    if(response.action === 'message')
    {
        store.dispatch({type: MESSAGE_RECIEVED, data: response.target});
    }
}

store.subscribe(() => {
    const {action, target} = store.getState();
    
    switch(action)
    {
        case MESSAGE_SENDED: {
            socket.send(JSON.stringify({action:'message', data: target}));
        } break;
    }    
});


export default socket;

