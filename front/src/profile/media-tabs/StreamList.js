import React, {Component} from 'react';
import {Modal} from '../../Modal/index';

const TwitchPlayer = ({username, onClose, title}) => {
    return <Modal
        open={true}
        onClose={onClose}
        title={title}
    >
        <iframe 
            allowFullScreen
            height="360"
            frameBorder="0"
            className="w-100"
            src={`https://player.twitch.tv/?channel=${username}&muted=true&autoplay=true`} 
        />
    </Modal>
}

export class StreamList extends Component {

    state = {
        watching: null
    }

    watch( index )
    {
        this.setState(() => {
            return {
                watching: index
            }
        });
    }

    render()
    {
        const {streams} = this.props;
        const {watching} = this.state;

        let Player = () => <span></span>;

        if (watching !== null)
        {
            Player = () => {
                const stream = streams[watching];

                return <TwitchPlayer 
                    username={stream.username}
                    title={stream.title}
                    onClose={
                        e => this.setState({watching: null})
                    }
                />
            }
        }

        return (
            <div className="user-content active">
            {
                <Player />
            }
                <div className="row">
                    {
                        streams.map((stream, index) => {
                            return (
                                <div 
                                    onClick={e => this.watch.call(this, index)}
                                    key={index}
                                    className="col-4"
                                >   
                                    <div>
                                        <img src={stream.thumb} alt="" />
                                    </div>
                                    <div>
                                        <small>
                                            watching: {stream.watching} | <span className="main-color">by {stream.username}</span>
                                        </small>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <a href="#" className="user-content-all">All (14)</a>
            </div>
        )
    }
}