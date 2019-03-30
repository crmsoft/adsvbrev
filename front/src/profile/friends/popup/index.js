import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import FriendAndFollowersContent from './popup-content';

class FriendAndFollowersList extends Component{
        
    constructor(props){
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal () {
        this.props.closeModal();
    }

    render(){  
        return (
            <Popup
                lockScroll={false}
                contentStyle={{backgroundColor: 'transparent', border:0,padding:0}} 
                modal={true} 
                open={this.props.show}
                closeOnDocumentClick={true}
                closeOnEscape={true}
                onClose={this.closeModal}
            >
                <div className="popup">
                    <div className="popup-header">
                        <div className="title">
                            <h2>Friend List</h2>
                        </div>
                        <div className="close" onClick={this.closeModal}>
                            <span>&times;</span>
                        </div>
                    </div>
                    <div className="popup-content">

                        <FriendAndFollowersContent 
                            isGuest={this.props.isGuest}
                            user={this.props.user} 
                        />
                    
                    </div>
                    <div className="popup-footer">
                        <div>
                            <button 
                                onClick={() => this.props.closeModal()}
                                className="dd-btn btn-sm">Close</button>
                        </div>
                    </div>
                </div>
            </Popup>     
        )
    }
}


export default FriendAndFollowersList;