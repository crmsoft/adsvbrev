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
            </ul>
        </nav>
    )
}

export default Menu;