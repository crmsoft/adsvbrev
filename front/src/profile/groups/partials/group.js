import React from 'react';
import {Link} from 'react-router-dom';

const Group = ( props ) => {
    return (
        <Link to={`/gg/${props.group.name}`} className="friend">
            <img src={`/`} alt="body" />
            <h2>{props.group.name}</h2>
        </Link>
    )
}

export default Group;