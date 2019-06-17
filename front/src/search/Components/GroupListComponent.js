import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class GroupListComponent extends Component{

    render(){
        const group = this.props.data;
        return (
            <div className="search-item-user">
                <Link to={group.gamers !== undefined ? `/g/${group.username}`:`/gr/${group.username}`} className="d-flex">
                    <div className="user-ava">
                        <img src={group.ava} />
                    </div>
                    <div className="user-info">
                        <div className="user-name">
                            {group.full_name}
                        </div>
                        <div className="user-username">
                            {group.username}
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}