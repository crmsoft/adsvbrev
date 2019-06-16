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

        return (
            <div onClick={ e => onClick(data)  } className="user-chat">
                <div className="user-list-item">
                    <div className="d-flex">
                        <div className="user-list-ava">
                            { <UsersAva list={members} /> }
                        </div>
                        <div className="user-list-user">
                            <span>
                                { data.members.map(user => { return user.first_name; }).join(', ') }
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