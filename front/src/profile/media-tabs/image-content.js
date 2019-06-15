import React, { Component, Fragment } from 'react';

import ImageZoom from '../../general/ImageZoom';

export default class ImageCotent extends Component {


    render(){
        
        const {media, totalImage} = this.props;
console.log(totalImage);

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
                        </div>
                        {
                            (media.length < 4) ? null : (
                                <a href="#" className="user-content-all">All ({media.length})</a>                                
                            )
                        }

                        {
                            (totalImage < 4 || !totalImage) ? null : (
                                <a href="#" className="user-content-all">All ({totalImage})</a>                                
                            )
                        }
                    </div>
                </Fragment>
            )
        } // end if

        return (
                
            <div>
                <div className="user-content active">
                    <div className="row">
                        <div className="col-4">
                            <img src="../img/sample-100.jpg" alt="" />
                        </div>
                        <div className="col-4">
                            <img src="../img/sample-100.jpg" alt="" /> 
                        </div>
                        <div className="col-4">
                            <img src="../img/sample-100.jpg" alt="" />
                        </div>
                    </div>
                    <a href="#" className="user-content-all">All (14)</a>
                </div>
                
            </div>
        )
    }
}