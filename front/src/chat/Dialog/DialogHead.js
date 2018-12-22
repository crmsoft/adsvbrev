import React,{Component} from 'react';

export default class Header extends Component{
    render(){
        const {members, me} = this.props;
        console.log(this.props,me);
        
        return (
            <div onClick={e => this.props.closeChat()}>
                {
                    members.map(member => {
                        return me === member.username ? 'Me' :  member.first_name
                    }).join(', ')
                }
            </div>
        )
    }
}