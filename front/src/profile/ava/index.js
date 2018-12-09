import React, {Component} from 'react';
import AvaPopup from './edit/AvaPopup';

const editAva = () => {
    return (
        <div className="ava-edit">
            <span>Edit Avatar</span>
        </div>
    )
}

export default class AvaComponent extends Component {

    state = {
        show: false
    }

    constructor(props){
        super(props);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    showModal(){
        !this.props.isGuest && this.setState({show:true});
    }

    closeModal(){
        this.setState({show:false});
    }

    render(){
        const ava_path = `${this.props.ava}`;
        return (
            <div>
                <div className="ava-holder" onClick={this.showModal}>
                    {
                        !this.props.isGuest ? editAva() : null
                    }
                    <img src={ava_path} alt="That's you !" />
                </div>
                <AvaPopup ava={ava_path} closeModal={this.closeModal} show={this.state.show} />
            </div>
        )
    }
}
