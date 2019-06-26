import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export const GameCard = ({game}) => {
    return (
        <Link to={`/g/${game.username}`} className="game-group row ml-1 mb-2">
            <div>
                <img src={game.ava} style={{width: 50}} />
            </div>
            <div className="col">
                <div className="name main-color">
                    <small title={game.full_name}>
                        {game.full_name}
                    </small>
                </div>
                <span className="gamer-count">
                    <small>
                        {game.gamers} {`gamers`}
                    </small>
                </span>
            </div>
        </Link>
    )
}

export default class GameGroups extends Component {
    
    state = {
        list: []
    }

    componentDidMount()
    {
        axios.get(`/game/list/groups`)
        .then(({data}) => {
            this.setState(() => {
                return {
                    list: data.data,
                    total: data.total
                }
            })
        })
    }

    render()
    {
        const {list} = this.state;
        return (
            <div>
                <div className="header">
                    <a href="javascript:void(0);">
                        <span className="icon-group"></span>
                        <h3>Game Groups</h3>
                    </a>
                </div>
                <div className="block-content">
                    <div className="row">
                        <div className="col">
                            {
                                list.map((game, i) => <GameCard key={game.id} game={game} />)
                            }
                        </div>
                        <div className="col">
                            <Link to="/search?i=gr">
                                <small className="main-color">
                                    {`show all groups`}
                                </small>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}