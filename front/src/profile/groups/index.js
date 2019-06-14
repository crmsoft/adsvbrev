import React, {Component} from 'react';
import Header  from './partials/header';
import Group from './partials/group';
import GroupList from './popup/index';
import {Link} from 'react-router-dom';


export default class Groups extends Component{
    
    state = {
        show: false
    }

    constructor(props){
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    /**
     * impact
     * @param GroupListContent
     * close modal with friend list and followers list !
     */
    closeModal(){
        this.setState({show:false});
    }

    /**
     * impact
     * @param FriendAndFollowersList
     * @param Header
     * show modal with friend list and followers list !
     */
    showModal(){        
        this.setState({show:true});
    }

    render(){

        const {list, isGuest, user, total} = this.props;
        const {show} = this.state;

        return (
            <div>
                <div className="header">
                    <Header showModal={this.showModal} total={total} />
                    <GroupList user={user} closeModal={this.closeModal} show={show} />
                </div>

                <div className="block-content">

                    <div className="friends">

                        {
                            list.map( (item, index) => {
                               return <Group key={index} group={item} />
                            })
                        }

                        {
                            isGuest ? null : (
                                <Link to="/search?i=gr" className="friend">
                                    <span className="search-more"></span>
                                </Link>
                            )
                        }

                    </div>

                </div>
            </div>
        )
    }
}