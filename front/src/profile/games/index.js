import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const GameCard = ({game, active}) => {
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
        index: 0
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
        const {total, list} = this.props;
        const {index} = this.state;

        return (
            <div>
                <div className="header">
                    <a href="javascript:void(0);">
                        <span className="icon-gamepad"></span>
                        <h3>My Games</h3>
                        <span className="items-count"> ({total})</span>
                    </a>
                </div>
    
                <div className="block-content">
                    <div className="row">
                        <div className="col">
                            {
                                list.map((game, i) => <GameCard key={game.username} active={index === i} game={game} />)
                            }
                        </div>
                    </div>
                    <div className="text-center pt-3">
                        <a href="/my-games" className="dd-btn btn-sm">
                            <small>
                                <span className="icon-plus"></span>
                                Add new games
                            </small>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}