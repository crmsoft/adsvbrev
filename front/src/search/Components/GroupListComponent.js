import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class GroupListComponent extends Component{

    render(){
        const group = this.props.data;
        return (
            <Link to=''>
                {group.name}
            </Link>
        )
    }
}