import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import FriendAndFollowersContent from './popup-content';
import {Modal} from '../../../Modal/index';

class FriendAndFollowersList extends Component{
        
    constructor(props){
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal () {
        this.props.closeModal();
    }

    render(){  
        const actions = [
            {
                title: `Ok`,
                onAction: this.closeModal,
                class: `btn-empty`
            }
        ];
        return (
            <Modal
                open={this.props.show}
                onClose={this.closeModal}
                actions={actions}
                title={ this.props.isGuest ? `Friend List` : `My Friends`}
            >
                    <FriendAndFollowersContent 
                        isGuest={this.props.isGuest}
                        user={this.props.user} 
                    />
            </Modal> 
        )
    }
}


export default FriendAndFollowersList;