import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';


import Menu from '../menu'
import Game from './Game';
import {Loading} from '../general/Loading';
import Input from '../chat/Dialog/Input';
import MessageList from './MessageList';
import socketStore from '../socket/redux/store';
import { send_dude_message } from '../socket/redux/events';

export const DudeContext = React.createContext();

const GameList = ({games}) => (
    <div className="my-games-section list-scroll">
        {
            games.map((game, index) => {
                return <Game 
                            key={game.id} 
                            index={index} 
                            game={game} 
                        />
            })
        }
    </div>
)

class FDudesComponent extends Component{

    state = {
        loading: true,
        games: [],
        active_index: 0,
        messageSend: null,
    }

    componentDidMount() {
        axios.get('/find-dudes/games')
        .then(response => this.setState(({games:response.data, loading:false})))
    }

    componentWillUnmount() {
        const {games, active_index} = this.state;
        const channel = games[active_index].username;

        axios.post(`/find-dudes/${channel}/unsubscribe`, {
            "page-id": socketStore.getState().token
        });
    }

    setActive(index) {
        this.setState(({active_index:index}));
    }

    onMessage(message, attachment) {

        const {active_index, games} = this.state;

        let frm = new FormData();
        frm.append('message', message);
        frm.append('channel', games[active_index].username);
        attachment && frm.append('file', attachment);

        axios.post('/find-dudes/messages/store', frm)
        .then(({data}) => {
            this.props.send_dude_message(games[active_index].username);
            this.setState(
                ({messageSend:data.data}), 
                () => this.setState(({messageSend:null}))
            );
        })
    }
    
    render()
    {
        const {loading, games, active_index, messageSend} = this.state;
        const activeGame = games[active_index];

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
                                <div className="my-games" >
                                    <div className="my-games-title">
                                        <img src="img/gamepad.svg" alt="" />
                                        <h3>My Games</h3>
                                    </div>
                                    <DudeContext.Provider
                                        value={{
                                            activeIndex:active_index,
                                            setActive:this.setActive.bind(this)
                                        }}
                                    >
                                    {
                                        loading ? <Loading /> : <GameList games={games} />
                                    }
                                    </DudeContext.Provider>

                                    <div className="my-games-bottom">
                                    <div className="my-games-notifications">
                                        <p>* You can only access
                                            the rooms of your chosen
                                            games. <b> Click </b>to select a game!</p>
                                    </div>

                                    <div className="my-games-search">
                                        <div className="input-group flex-nowrap">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="addon-wrapping"><i className="fa fa-search"></i></span>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Search My games.." aria-label="Search My games" aria-describedby="addon-wrapping" />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="my-games-inside">
                                    <div className="my-games-inside-title font-bold">

                                        <h3> 
                                            <span className="icon icon-friends"></span> 
                                            {
                                                activeGame ? activeGame.full_name : 'Find Your Dudes'
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
                                            game={activeGame ? activeGame.username : null}
                                            push={messageSend}
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
                                    <div className="on-channels-messages">

                                    </div>


                                    <div className="my-games-bottom">
                                        <div className="my-games-search">
                                            <div className="input-group flex-nowrap">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="addon-wrapping"><i className="fa fa-search"></i></span>
                                                </div>
                                                <input type="text" className="form-control" placeholder="Search My games.." aria-label="Search My games" aria-describedby="addon-wrapping" />
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
