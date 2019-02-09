import React, {Component} from 'react';

export default class User extends Component {
    render(){
        const {data, onClick} = this.props;
        return (
            <div 
                key={data.username}
                onClick={e => { onClick(data.username); }}
                className="user"
            >
                {
                    <div className="user-list-item">
                        <div className="ava-wrapper">
                            <div className={`status ${data.status}`}></div>
                            <div className="user-list-ava">
                                <img src={data.ava} />
                            </div>    
                        </div>
                        <div className="user-list-user">
                            <span className="user-list-user-name">{data.full_name}</span>
                            <span className="user-list-username">{data.username}</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}