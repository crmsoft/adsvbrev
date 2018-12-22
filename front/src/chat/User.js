import React, {Component} from 'react';

export default class User extends Component {
    render(){
        const {data, onClick} = this.props;
        return (
            <div 
                key={data.username}
                onClick={e => { onClick(data.username); }}
            >
                <div className="user-list-item">
                    <a className="d-flex" href="/gg/rowena09">
                        <div className="user-list-ava">
                            <img src={data.ava} />
                        </div>
                        <div className="user-list-user">
                            <span>{data.full_name}</span>
                            <span>{data.username}</span>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}