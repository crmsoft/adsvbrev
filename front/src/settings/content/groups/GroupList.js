import React from 'react';
import {Link} from 'react-router-dom';

import CreateGroup from './CreateGroup';

export const GroupList = ({list, onEdit, pushGroup}) => {
    return (
        <div>
            <CreateGroup 
                onGroup={group => pushGroup(group)}
            />
            <h6 className="mt-3 mb-2">{`Groups you manage`}</h6> 
            <ul className="m-0 p-0">
                <List list={list} onEdit={onEdit}/>
            </ul>
        </div>
    )
}

const List = ({list, onEdit}) => list.map(group => <Group key={group.username} onEdit={onEdit} data={group} />)

const Group = ({data, onEdit}) => (
    <li className="list-unstyled mb-2 position-relative">
        <div className="row border-0 p-0">
            <div className="col-auto">
                <img src={data.ava} width={50}/>
            </div>
            <div className="col-auto p-0">
                
                <Link to={`/gr/${data.username}`} className="link-unstyled main-color">
                    {data.full_name}
                </Link> 

                <small className="d-block">
                    {data.role}
                </small>

            </div>
            <div className="position-absolute" style={{marginLeft: '50%', fontSize: '13px', textDecoration: 'underline', cursor: 'pointer'}}>
                <span 
                    className="ml-3"
                    onClick={e => onEdit(data.username)}
                >Manage</span>
            </div>
        </div>
    </li>
)