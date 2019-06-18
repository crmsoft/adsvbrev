import React, {Component} from 'react';

const UsersAva = ({list}) => {
    
    if (list.length === 0)
    {        
        return null;
    } // end if

    const user = list[list.length - 1];
    
    return (
        <div className="chat-user-ava">
            <img key={user.username} src={user.ava} />
            <UsersAva list={list.slice(0,list.length - 1)} />
        </div>
    )
}

const membersTitle = (list) => {
    const us = list.map(user => { return user.first_name; }).join(', ');
    
    return {
        full: us,
        short: us.length > 30 ? us.substr(0, 30)+'...':us
    }
}

export default class Chat extends Component{

    render(){
        
        const {data, onClick, user} = this.props;

        let members = data.members;

        if (members.length === 0)
        {
            return null;
        }

        if (user && (data.members.length > 2))
        {
            members = data.members.filter(m => m.username !== user)
        }

        const title = membersTitle(data.members);

        return (
            <div onClick={ e => onClick(data)  } className="user-chat">
                <div className="user-list-item">
                    <div className="d-flex">
                        <div className="user-list-ava">
                            { <UsersAva list={members} /> }
                        </div>
                        <div className="user-list-user">
                            <span title={title.full}>
                                { title.short }
                            </span>
                            {
                                data.unread === 0 ? null : <span className="unread">{data.unread}</span>
                            }
                            <small dangerouslySetInnerHTML={{__html:data.last}} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}