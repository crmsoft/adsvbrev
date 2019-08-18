import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';


import Menu from '../menu'
import Input from '../chat/Dialog/Input';
import MessageList from './MessageList';
import socketStore from '../socket/redux/store';
import { send_dude_message } from '../socket/redux/events';
import {User} from './User';
import Games from './Games';
import GameChannels from './GameChannels';

export const DudeContext = React.createContext();

const UserList = ({activeGame,activeRoom}) => {
    
    const [users, setUsers] = useState([]);

    const loadUsers = (isSubscribed) => {
        const channel = activeGame.channel;
        const activeRoomId = activeRoom ? activeRoom.id : undefined;

        axios.get(activeRoomId ? `/find-dudes/${channel}/subscribers/${activeRoomId}`:`/find-dudes/${channel}/subscribers`)
        .then(({data}) => {
            isSubscribed && setUsers(data.data);
        })
    }

    useEffect(() => {
        let isSubscribed = true

        if (activeGame && isSubscribed) {
            loadUsers(isSubscribed);
        } // end if

        return () => (isSubscribed = false)
    }, [activeGame, activeRoom])

    return (
        <div className="on-channels-messages list-scroll">
            {
                users.map((user, index) => {
                    return <User 
                        key={index}
                        user={user}
                    />
                })
            }
        </div>
    )
}

class FDudesComponent extends Component{

    state = {
        loading: true,
        games: [],
        active_index: 0,
        messageSend: null,
        subChannels: [],
        active_room_index: -1,
        roomsActive: false
    }

    componentDidMount() {
        axios.get('/find-dudes/games')
        .then(response => this.setState(({games:response.data, loading:false})))
    }

    componentWillUnmount() {
        const {games, active_index} = this.state;
        const channel = games[active_index].channel;

        axios.post(`/find-dudes/${channel}/unsubscribe`, {
            "page-id": socketStore.getState().token
        });
    }

    setActive(index) {
        this.setState(({active_index:index}));
    }

    setActiveRoom(index) {
        
        const {games, active_index, subChannels, active_room_index} = this.state;
        const channel = games[active_index].channel;
        const subChannel = subChannels[index].id;
        
        if (active_room_index === index) {
            return;
        }

        axios.put(`/find-dudes/sub-channels/${channel}/${subChannel}/update`, {
            "page-id": socketStore.getState().token
        })
        .then(({data}) => {
            this.setState(({
                active_room_index: index,
                subChannels: subChannels.map((ch, i) => {
                    if (i === index) {
                        return data.data;
                    } // end if

                    return ch;
                })
            }));
        })
        .catch(({response}) => {
            if (response.status === 303) {
                this.setState(({
                    subChannels: subChannels.map((ch, i) => {
                        if (i === index) {
                            ch.full = true;
                        } // end if

                        return ch;
                    })
                }))
                alert(response.data.message);
            } else {
                alert('Error...')
            } // end if
        })
    }

    onRoomCreated(room) {
        this.setState(state => {
            return {
                subChannels: [
                    room,
                    ...state.subChannels
                ]
            }
        })
    }

    onRoom(state) {

        const {games, active_index, subChannels, active_room_index} = this.state;
        const channel = games[active_index].channel;
        const activeRoom = subChannels[active_room_index];


        if (!state){
            if (activeRoom) {
                this.setState(({
                    roomsActive:state, 
                    loading:state,
                    active_room_index: -1,
                    loading: true,
                    active_index: -1
                }));

                axios.post(`/find-dudes/sub-channels/${channel}/${activeRoom.id}/destroy`, {
                    "page-id": socketStore.getState().token
                }).then(() => {
                    this.setState(({
                        loading: false,
                        active_index: active_index
                    }));
                });

            } else {
                this.setState(({
                    roomsActive:state, 
                    loading:state,
                    active_room_index: -1
                }));
            } // end if
            return;
        }

        this.setState(({
            roomsActive:state, 
            loading:state,
            active_room_index: -1
        }));

        axios.get(`/find-dudes/sub-channels/${channel}`)
        .then(({data}) => {
            this.setState(({subChannels:data.data, loading: false}))
        });
    }

    onMessage(message, attachment) {

        const {active_index, games, subChannels, active_room_index} = this.state;

        let frm = new FormData();
        frm.append('message', message);
        frm.append('channel', games[active_index].channel);
        attachment && frm.append('file', attachment);
        subChannels[active_room_index] && frm.append('room', subChannels[active_room_index].id);

        axios.post('/find-dudes/messages/store', frm)
        .then(({data}) => {
            const channel = games[active_index].channel + (
                subChannels[active_room_index] ? ('_' + subChannels[active_room_index].channel) : ''
            )
            this.props.send_dude_message(channel);
            this.setState(
                ({messageSend:data.data}), 
                () => this.setState(({messageSend:null}))
            );
        })
    }
    
    render()
    {
        const {
            loading, 
            active_room_index,
            games, subChannels, 
            roomsActive, active_index, 
            messageSend
        } = this.state;
        const activeGame = games[active_index];
        const activeRoom = subChannels[active_room_index];

        return (
            <div className="d-flex">
            
                <Menu />

                <div className="user-middle">
                    <div className="find-your-dudes-title">
                        <img src="img/binoculars.svg" alt="" />
                        <h3>Find Your Dudes!</h3>
                    </div>
                    <section  className="find-your-dudes">
                            
                        <div className="row">
                            <div className="col-md-3">
                                <DudeContext.Provider
                                    value={{
                                        activeIndex:active_index,
                                        setActive:this.setActive.bind(this),
                                        openRooms: this.onRoom.bind(this),
                                        activeGame: activeGame,
                                        loading: loading,
                                        games: games,
                                        subChannels: subChannels,
                                        onRoomCreated: this.onRoomCreated.bind(this),
                                        setActiveRoom: this.setActiveRoom.bind(this),
                                        active_room_index: active_room_index
                                    }}
                                >
                                    {roomsActive ? <GameChannels /> : <Games />}
                                </DudeContext.Provider>
                            </div>
                            <div className="col-md-6">
                                <div className="my-games-inside">
                                    <div className="my-games-inside-title font-bold">

                                        <h3> 
                                            <span className="icon icon-friends"></span> 
                                            {
                                                activeGame ? activeGame.name : 'Find Your Dudes'
                                            }
                                        </h3>
                                    </div>
                                    <div className="my-games-banner">
                                        {
                                            activeGame ? <img src={activeGame.poster} className="img-fluid" /> : null
                                        }
                                    </div>
                                    <div className="my-games-messages">
                                        <MessageList
                                            game={activeGame ? activeGame.channel : null}
                                            push={messageSend}
                                            room={activeRoom ? activeRoom : null}
                                        />
                                        <Input 
                                            members={[]}
                                            onMessage={this.onMessage.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dudes-on-channels">
                                    <div className="on-channels-title">
                                        <img src="img/on-channels.svg" alt="" />
                                        <h3>On Channels</h3>
                                    </div>

                                    <UserList 
                                        key={this.props.channel_timestamp}
                                        activeGame={activeGame}
                                        activeRoom={activeRoom}
                                    />

                                    <div className="my-games-bottom">
                                        <div className="my-games-search">
                                            <div className="input-group flex-nowrap">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="addon-wrapping"><i className="fa fa-search"></i></span>
                                                </div>
                                                <input type="text" className="form-control" placeholder="Search user" aria-label="Search My games" aria-describedby="addon-wrapping" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

const FDudes = connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            send_dude_message: channel => dispatch(send_dude_message(channel))
        }
    }
)(FDudesComponent);

export default FDudes;
