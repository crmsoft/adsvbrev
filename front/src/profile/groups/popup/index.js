import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import GroupListContent from './popup-content';

class GroupList extends Component{
        
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

                        <GroupListContent user={this.props.user} />
                    
                    </div>
                    <div className="popup-footer">
                        <div>
                            <button>Close</button>
                            <button>Ok</button>
                        </div>
                    </div>
                </div>
            </Popup>     
        )
    }
}


export default GroupList;