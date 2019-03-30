import React, {Component} from 'react';
import Header  from './partials/header';
import Friend from './partials/friend';
import FriendAndFollowersList from './popup/index';
import {Link} from 'react-router-dom';

export default class Friends extends Component{
    
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
     * @param FriendAndFollowersList
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
                    <FriendAndFollowersList 
                        isGuest={this.props.isGuest}
                        user={this.props.user} 
                        closeModal={this.closeModal} 
                        show={this.state.show} 
                    />
                </div>

                <div className="block-content">

                    <div className="friends">

                        {
                            this.props.list.map( (item, index) => {
                               return <Friend key={index} friend={item} />
                            })
                        }

                        {
                            this.props.isGuest ? null : (
                                <Link to="/search" className="friend">
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