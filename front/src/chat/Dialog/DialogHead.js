import React,{Component} from 'react';

export default class Header extends Component{
    render(){
        const {members, me} = this.props;
        
        return (
            <div className="dialog-head">
                <div className="dialog-title">
                {
                    members.map(member => {
                        return me === member.username ? 'Me' :  member.first_name
                    }).join(', ')
                }
                </div>
                <div onClick={e => this.props.closeChat()} className="dialog-actions">
                    ×
                </div>
            </div>
        )
    }
}