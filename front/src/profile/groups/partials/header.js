import React from 'react';


const Header = ({showModal, total}) => (
    <a href="javascript:void(0);" onClick={() => total && showModal()}>
        <span className="icon-group"></span>
        <h3>Groups</h3>
        <span className="items-count"> ({total})</span>
    </a>
);

export default Header;