import React from 'react';
import {Link} from 'react-router-dom';

const Menu = () => {
    return(
        <nav className="menu">
            <ul>
                <li>
                    <Link className="active" to="/">
                        <span className="icon-profile"> my profile</span>
                    </Link>
                </li>
                <li>
                    <Link to="/feed">
                        <span className="icon-profile"> feed</span>
                    </Link>
                </li>
                <li>
                    <Link to="/dudes">
                        <span className="icon-profile"> Find Dudes</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Menu;