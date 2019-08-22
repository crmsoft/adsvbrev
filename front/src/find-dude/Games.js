import React, {Component} from 'react';
import Game from './Game';
import { Loading } from '../general/Loading';
import {DudeContext} from './index';

const GameList = ({games, filter}) => (
    <div className="my-games-section list-scroll">
        {
            (filter.length ? games.filter(game => game.name.toLocaleLowerCase().indexOf(filter) !== -1) : games)
            .map((game, index) => {
                return <Game 
                            key={game.id} 
                            index={index} 
                            game={game} 
                        />
            })
        }
    </div>
)

const Games = () => {
    return (
        <DudeContext.Consumer>
            {
                ({games, loading}) => <MyGames loading={loading} games={games} />
            }
        </DudeContext.Consumer>
    )
}
class MyGames extends Component {

    state = {
        filterGame: ''
    }

    render () {
        const {loading, games} = this.props;
        const {filterGame} = this.state;
        
        return (
            <div className="my-games" >
                <div className="my-games-title">
                    <img src="img/gamepad.svg" alt="" />
                    <h3>My Games</h3>
                </div>
                
                {
                    loading ? <Loading /> : <GameList filter={filterGame.toLocaleLowerCase().trim()} games={games} />
                }

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
                        <input 
                            value={filterGame}
                            type="text" 
                            className="form-control" 
                            placeholder="Search game" 
                            onChange={e => this.setState(({filterGame:e.target.value}))}
                            />
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Games;
