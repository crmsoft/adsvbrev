import React, { Component, Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import handleViewport from 'react-in-viewport';

import ImageZoom from '../../general/ImageZoom';
import {Modal} from '../../Modal';

const ImageListItem = ({
    info,
    inViewport,
    innerRef
}) => {
    return (
        <div ref={innerRef} className="col-4" style={{height: '9vw', overflow: 'hidden'}}>
            {inViewport ? <ImageZoom 
                thumb={info.thumb ? info.thumb : info.full_path}
                src={info.full_path}
            /> : null}
        </div>
    )
}

const ViewportImageItem = handleViewport(ImageListItem);

const ImageList = ({
    onLoad,
    user
}) => {
        
    const [list, setList] = useState(() => {

        var url = `/media/list/${user.username}`;

        if (user.type === 'game')
        {
            url = `/game/media/${user.username}`;
        } // end if

        axios.get(url)
        .then(({data}) => {            
            setList(data.data);
        });

        return [];
    });

    useEffect(() => {
        onLoad(
            list.length
        );
    }, [list])
    
    return (
        <div className="row">
            {
                list.map((img, index) => <ViewportImageItem key={index} info={img} />)
            }
        </div>
    )
}

const Gallery = ({
    open,
    onClose,
    user
}) => {
    const [fetched, setFetched] = useState(false);

    return (
        <Modal
            processing={!fetched}
            open={open}
            onClose={onClose}
            title='Media'
            actions={[
                {
                    onAction: onClose,
                    title: 'Close'
                }
            ]}
        >
            <div className="container pt-3 pb-3" style={{maxHeight: '75vh', overflowY: 'auto'}}>
                <ImageList 
                    user={user}
                    onLoad={setFetched}
                />
            </div>
        </Modal>
    )
}

export default class ImageContent extends Component {
    
    state = {
        gallery: false
    }

    showGallery()
    {
        this.setState(() => ({gallery:true}))
    }

    hideGallery()
    {
        this.setState(() => ({gallery:false}))
    }

    render(){
        
        const {media, totalImage, user} = this.props;
        const {gallery} = this.state;
        const {showGallery, hideGallery} = this;        

        if (media)
        {
            return (
                <Fragment>
                    <div className="user-content active">
                        <div className="row user-media">
                            {
                                media.slice(0,3).map((m, index) => {
                                    return (
                                        <div 
                                            key={index}
                                            className="col-4"
                                        >
                                            <ImageZoom 
                                                thumb={m.options.thumb ? m.options.thumb : (m.thumb ? m.thumb:m.full_path)}
                                                src={m.full_path}
                                            />
                                        </div>
                                    )
                                })
                            }
                            <Gallery 
                                user={user}
                                open={gallery} 
                                onClose={hideGallery.bind(this)}
                            />
                        </div>
                        {
                            (media.length < 4) ? null : (
                                <a onClick={showGallery.bind(this)} href="javascript:void(0)" className="user-content-all">All ({media.length})</a>                                
                            )
                        }

                        {
                            (totalImage < 4 || !totalImage) ? null : (
                                <a onClick={showGallery.bind(this)} href="javascript:void(0)" className="user-content-all">All ({totalImage})</a>                                
                            )
                        }
                    </div>
                </Fragment>
            )
        } // end if

        return null;
    }
}