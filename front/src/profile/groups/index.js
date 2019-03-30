import React, {Component} from 'react';
import Header  from './partials/header';
import Group from './partials/group';
import GroupListContent from './popup/index';
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
        return (
            <div>
                <div className="header">
                    <Header showModal={this.showModal} total={this.props.total} />
                    <GroupListContent user={this.props.user} closeModal={this.closeModal} show={this.state.show} />
                </div>

                <div className="block-content">

                    <div className="friends">

                        {
                            this.props.list.map( (item, index) => {
                               return <Group key={index} group={item} />
                            })
                        }

                        {
                            this.props.isGuest ? null : (
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