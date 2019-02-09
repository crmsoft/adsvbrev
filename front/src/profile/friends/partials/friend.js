import React from 'react';
import {Link} from 'react-router-dom';

const Friend = ( props ) => {
    return (
        <Link to={`/gg/${props.friend.username}`} className="friend">
            <img src={`${props.friend.ava}`} alt="body" />
            <h2>{props.friend.first_name}</h2>
        </Link>
    )
}

export default Friend;