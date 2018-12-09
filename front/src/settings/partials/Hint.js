import React from 'react';
import Proptypes from 'prop-types';

const Hint = ({text}) => {
    return (
        <div className="text-hint">
            {text}
        </div>
    )
}

Hint.Proptypes = {
    text: Proptypes.string.isRequired
}

export default Hint;