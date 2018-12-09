import React, {Component} from 'react';
import Popup from 'reactjs-popup';

const ListHOC = (ListItem, trigger) => {
    return class ListItems extends Component{
        
        constructor(props){
            super(props);
            this.state = { open: false }
            this.openModal = this.openModal.bind(this)
            this.closeModal = this.closeModal.bind(this)

        }

        openModal (){
            this.setState({ open: true })
        }
        closeModal () {
            this.setState({ open: false })
        }

        render(){
            return (
                <Popup
                    lockScroll={true}
                    contentStyle={{backgroundColor: 'transparent', border:0,padding:0}} 
                    trigger={trigger} 
                    modal={true} 
                    open={this.state.open}
                    closeOnDocumentClick={true}
                    onClose={this.closeModal}
                    onOpen={this.openModal}
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
                        {
                            this.props.items.map( (item,index) => {
                                return <ListItem key={index} data={item} />
                            })
                        }
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
};

export default ListHOC;