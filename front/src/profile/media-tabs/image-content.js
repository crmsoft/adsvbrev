import React, { Component, Fragment } from 'react';


export default class ImageCotent extends Component {


    render(){
        
        const {media} = this.props;

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
                                            <img src={m.options.thumb ? m.options.thumb : m.full_path} alt="" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <a href="#" className="user-content-all">All (14)</a>
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