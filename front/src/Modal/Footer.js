import React from 'react';

import {Loading} from '../general/Loading';

export const Footer = ({
    actions
}) => {
    return actions ? (
        <div
            className={`dd-modal-footer`}
        >
            <span className="processing-indicator">
                <Loading />
            </span>
            {
                actions.map((act, index) => {
                    return (
                        <button 
                            key={index}
                            className={`dd-btn btn-sm ${act.class}`}
                            onClick={act.onAction}
                        >
                            {act.title}
                        </button>
                    )
                })
            }
        </div>
    ) : null
}