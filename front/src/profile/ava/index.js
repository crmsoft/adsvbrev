import React, {Component} from 'react';
import AvaPopup from './edit/AvaPopup';
import ImageZoom from '../../general/ImageZoom';

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
        const {ava, isGuest} = this.props;
        return (
            <div>
                <div className="ava-holder" onClick={this.showModal}>
                    {
                        !isGuest ? editAva() : null
                    }
                    {
                        isGuest ? <ImageZoom src={ava.replace('200_', 'original_')} thumb={ava}  /> : 
                        <img src={ava} alt="That's you !" />
                    }
                </div>
                <AvaPopup ava={ava.replace('200_', 'original_')} closeModal={this.closeModal} show={this.state.show} />
            </div>
        )
    }
}
