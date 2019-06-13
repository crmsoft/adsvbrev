import React, {Component} from 'react';
import axios from 'axios';

import {Form} from './Form';
import {Loading} from '../../../../general/Loading';

export class Editor extends Component{

    state = {
        data: null
    }

    componentDidMount()
    {
        const {id} = this.props;

        axios.get(`/groups/${id}`)
        .then(({data}) => this.setState(() => ({data:data.data})))
    }

    render()
    {
        const {data} = this.state;
        
        return (
            <div>
                <button onClick={e => this.props.goBack()} className="dd-btn btn-gray btn-sm mb-3">
                    <span 
                        className="icon-arrow-down d-inline-block" 
                        style={{fontSize: 6, transform: 'rotate(90deg)', transformOrigin: '4px 0px'}}></span>
                    Go back
                </button>
                {data ? <Form data={data} onDelete={() => this.props.goBack(data.id)} />:<Loading />} 
            </div>
        )
    }
}