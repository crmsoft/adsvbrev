import React, {Component, useCallback, useState} from 'react';
import {Modal, actions} from '../../Modal/index';

const TwitchPlayer = ({username, onClose, title}) => {
    const [loaded, setLoaded] = useState(false);
    
    return <Modal
        processing={!loaded}
        open={true}
        onClose={onClose}
        title={title}
        actions={[
            {
                title: 'Close',
                onAction: onClose
            }
        ]}
    >
        <iframe 
            onLoad={e => setLoaded(true)}
            allowFullScreen
            height="360"
            frameBorder="0"
            className="w-100"
            src={`https://player.twitch.tv/?channel=${username}&muted=true&autoplay=true`} 
        />
    </Modal>
}

const ListAll = ({
    list,
    onClose,
    open,
    watch
}) => {
    
    return (
        <Modal
            actions={[
                {
                    title: 'Close',
                    onAction: onClose
                }
            ]}
            onClose={onClose}
            open={open}
            title="Trending streams"
        >
            <div className="row p-md-4 list-scroll">
            {
                list.map((stream, index) => {
                    return (
                        <div 
                            onClick={e => watch(index)}
                            key={index}
                            className="col-4"
                        >   
                            <div>
                                <img src={stream.thumb} className="img-fluid w-100" alt="" />
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
        </Modal>
    )
}

export class StreamList extends Component {

    state = {
        watching: null,
        showingAll: false
    }

    watch( index )
    {
        this.setState(() => {
            return {
                watching: index
            }
        });
    }

    closeAll() {
        this.setState(({showingAll: false}))
    }

    render()
    {
        const {streams} = this.props;
        const {watching, showingAll} = this.state;

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
                <ListAll 
                    watch={this.watch.bind(this)}
                    onClose={this.closeAll.bind(this)}
                    open={showingAll}
                    list={streams}
                />
            }
            {
                <Player />
            }
                <div className="row">
                    {
                        streams.slice(0, 3).map((stream, index) => {
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
                <span 
                    onClick={e => this.setState(({showingAll:true}))}
                    className="user-content-all"
                >All ({streams.length})</span>
            </div>
        )
    }
}