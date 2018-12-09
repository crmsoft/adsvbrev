import React, { Component } from 'react';


export default class ImageCotent extends Component {


    render(){
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