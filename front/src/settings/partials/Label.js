import React from 'react';
import Proptypes from 'prop-types';

const Label = ({text}) => {
    return (
        <div className="col content-top">
            <label>
                {text}
            </label>
        </div>
    )
}


Label.Proptypes = {
    text: Proptypes.string
}

export default Label;