import React from 'react';
import {Link} from 'react-router-dom';

const Group = ( {group} ) => {
    return (
        <Link to={`/gr/${group.username}`} className="friend">
            <img src={group.ava} alt="body" />
            <h2>{group.full_name}</h2>
        </Link>
    )
}

export default Group;