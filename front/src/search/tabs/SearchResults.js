import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class SearchResult extends Component{

    render(){
        console.log(this.props.items);
        
        return (
            <div>
                {
                    this.props.items.map((item,index) => {
                        return (
                            <div key={index}>
                                <this.props.render data={item}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}