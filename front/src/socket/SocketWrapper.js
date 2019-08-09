const url = 'wss://divdudes.com/yraMgipTBPDo42aK/?token=' + window.gg.wsc();
const queue = [];
const subscribers = [];

export let connectionIdentifier;

export default class SocketWrapper {
    
    constructor(locale) {
        
        this.url = url;
        this.reconnectTimeout;
        this.active = false;

        if (locale) {
            this.url = 'ws://127.0.0.1:8181/?token=' + window.gg.wsc();
        }

        this.connect();
    }

    connect() {
        if (this.active){
            return;
        }

        this.reconnectTimeout = null;
        try{
            this.transport = new WebSocket(this.url);
            this.connected();
        } catch(e) {
            this.reconnect();
        }
    }

    reconnect() {
        this.active = false;
        if (!this.reconnectTimeout) {
            this.reconnectTimeout = setTimeout(this.connect.bind(this), 1500);
        }
    }

    connected() {
        this.active = true;
        this.transport.onmessage = this.message.bind(this);
        this.transport.onclose = this.reconnect.bind(this);
    }

    bind(fn) {
        subscribers.push(fn);
    }

    message(data) {
        subscribers.map(sub => sub(data));
    }

    send(data) {
        if (this.active) {
            return this.transport.send(data);
        } // end if

        queue.push(data);
    }
}