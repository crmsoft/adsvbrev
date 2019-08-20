import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Modal} from '../../Modal';
import {GameCard} from '../../feed/GameGroups';

const GamesModal = ({
    open,
    onClose,
    list
}) => {
    
    const actions = [
        {
            onAction: onClose,
            title: 'Close'
        }
    ]
    
    return (
        <Modal
            title="My Games"
            open={open}
            onClose={onClose}
            actions={actions}

        >
            <div className="list-scroll p-3">
                {
                    list.map(game => <GameCard key={game.username} game={game} />)
                }
            </div>
        </Modal>
    )
} 

const GameSlide = ({game, active}) => {
    let st = active ? {display:'block',position:'relative', minHeight: '150px'}:{position:'relative',display:'none', minHeight: '150px'}
    return (
        <Link to={`/g/${game.username}`} style={st}>
            <img src={game.ava} style={{height: '150px', objectFit: 'cover'}} />
            <span style={{ background: 'linear-gradient(rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0.83))', position:'absolute', textAlign: 'center', left:'0', right: '0', bottom: '0', paddingBottom: '5px'}}>
                {game.full_name}
            </span>
        </Link>
    )
}

export class Games extends Component {
    
    state = {
        index: 0,
        modal: false
    }

    componentDidMount()
    {
        setInterval(() => {
            var length = this.props.list.length;
            var next = Math.floor(Math.random() * length);
            this.setState({
                index: next
            })
        }, 2500);
    }

    render()
    {
        const {total, list, isGuest} = this.props;
        const {index, modal} = this.state;

        return (
            <div>
                <GamesModal 
                    list={list}
                    onClose={() => this.setState(() => ({modal:false}))}
                    open={modal}
                />
                <div className="header">
                    <a 
                        onClick={() => this.setState(() => ({modal:true}))}
                        href="javascript:void(0);">
                        <span className="icon-gamepad"></span>
                        <h3>My Games</h3>
                        <span className="items-count"> ({total})</span>
                    </a>
                    <div className={'game-star'} ><img src="/img/game-star.svg" alt=""/></div>
                </div>
    
                <div className="block-content">

                    <div className="row">
                        <div className="col">
                            {
                                list.map((game, i) => <GameSlide key={game.username} active={index === i} game={game} />)
                            }
                        </div>
                    </div>
                    <div className="text-center pt-3">
                        {
                            isGuest ? (
                                <a href="/my-games" className="dd-btn btn-sm">
                                    <small>
                                        <span className="icon-gamepad"></span>
                                        Game gallery
                                    </small>
                                </a>
                            ) : (
                                <a href="/my-games" className="dd-btn btn-sm">
                                    <small>
                                        <span className="icon-plus"></span>
                                        Add new games
                                    </small>
                                </a>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}