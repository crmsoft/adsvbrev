import React, {Component} from 'react';

export default class Chat extends Component{
    
    render(){
        const {data, onClick} = this.props;
        return (
            <div onClick={ e => onClick(data)  } className="user-chat">
                {
                    <div className="user-list-item">
                        <div className="d-flex">
                            <div className="user-list-ava">
                                { data.members.map(user => { return <img key={user.username} src={user.ava} />; }) }
                            </div>
                            <div className="user-list-user">
                                <span>
                                    { data.members.map(user => { return user.first_name; }).join(', ') }
                                </span>
                                {
                                    data.unread === 0 ? null : <span className="unread">{data.unread}</span>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}