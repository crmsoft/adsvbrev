import React, {Component} from 'react';
import axios from 'axios';

import {GroupList} from './GroupList';
import {Editor} from './editor';


export default class GroupTabContent extends Component{

    state = {
        editId: null,
        groups: []
    }

    componentDidMount()
    {
        axios.get('groups')
        .then(({data}) => {
            this.setState(() => ({groups: data.data}))
        });
    }

    edit(id)
    {
        this.setState(() => ({editId: id}))
    }

    goBack(id)
    {
        
        if(id)
        {
            this.setState(state => ({
                editId: null,
                groups: state.groups.filter(gr => gr.username !== id)
            }))
        } else {
            this.setState(() => ({editId: null}))
        }
    }

    render()
    {
        const {editId, groups} = this.state;
        const {edit, goBack} = this;

        return editId ? <Editor id={editId} goBack={goBack.bind(this)} /> : 
                <GroupList 
                    pushGroup={group => this.setState(state => ({groups: [...groups, group]}))}
                    onEdit={edit.bind(this)} 
                    list={groups} 
                />
    }
}