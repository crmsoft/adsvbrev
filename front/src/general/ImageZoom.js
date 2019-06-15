import React, {Component} from 'react';

import {Modal} from '../Modal';

export default class ImageZoom extends Component {
    
    state = {
        shown: false,
        loaded: false
    }
    
    close()
    {
        setTimeout(() => {
            this.setState(state => {
                return {
                    shown: false
                }
            })
        }, 50)
    }

    open()
    {
        this.setState({shown: true})
    }

    onLoad(e)
    {
        this.setState(() => ({loaded:true}))
    }

    render()
    {
        const {thumb, src} = this.props;
        const {shown, loaded} = this.state;

        return (
            <div onClick={this.open.bind(this)} style={{cursor:'pointer'}}>
                <img className="thumb" src={thumb} />
                <Modal
                    processing={!loaded}
                    cls='fit-width'
                    title=''
                    open={shown}
                    onClose={() => this.close.call(this)}
                    actions={[{title:'Close', onAction: this.close.bind(this)}]}
                >
                    <img src={src} onLoad={this.onLoad.bind(this)} style={{maxHeight: '75vh'}}/>
                </Modal>
            </div>
        )
    }
}
