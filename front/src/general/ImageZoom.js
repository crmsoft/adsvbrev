import React, {Component} from 'react';

import {Modal} from '../Modal';

class ImageZoom extends Component {
    
    state = {
        shown: false,
        loaded: false
    }
    
    close()
    {
        this.setState(() => ({shown:false}))
    }

    onLoad(e)
    {
        const img = e.target;
        const {vHeight, vWidth} = getViewport();
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        
        if (height > vHeight)
        {

        } // end if

        this.setState(() => ({loaded:true}))
    }

    render()
    {
        const {thumb, src} = this.props;
        const {shown, loaded} = this.state;

        return (
            <div onClick={e => this.setState(() => ({shown: true}))} style={{cursor:'pointer'}}>
                <img className="thumb" src={thumb} />
                <Modal
                    processing={!loaded}
                    cls='fit-width'
                    title=''
                    open={shown}
                    onClose={this.close.bind(this)}
                    actions={[{title:'Close', onAction: this.close.bind(this)}]}
                >
                    <img src={src} onLoad={this.onLoad.bind(this)} style={{maxHeight: '75vh'}}/>
                </Modal>
            </div>
        )
    }
}

function getViewport() {

    var viewPortWidth;
    var viewPortHeight;

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
        viewPortWidth = window.innerWidth,
        viewPortHeight = window.innerHeight
    }

    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined'
    && typeof document.documentElement.clientWidth !=
    'undefined' && document.documentElement.clientWidth != 0) {
        viewPortWidth = document.documentElement.clientWidth,
        viewPortHeight = document.documentElement.clientHeight
    }

    // older versions of IE
    else {
        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
        viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
    }
    return {vWidth: viewPortWidth, vHeight: viewPortHeight};
}

export default ImageZoom;