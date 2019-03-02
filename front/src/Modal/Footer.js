import React from 'react';

export const Footer = ({
    actions
}) => {
    return actions ? (
        <div
            className={`dd-modal-footer`}
        >
            {
                actions.map(act => {
                    return (
                        <button 
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