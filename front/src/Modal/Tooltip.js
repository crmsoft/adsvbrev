import React from 'react';
import Popup from 'reactjs-popup';


export default ({
    trigger=<span className="icon-more">&nbsp;</span>,
    children,
    onOpen=() => {}
}) => {
    return (
        <div className="dd-tooltip d-inline-block">
            <Popup
                onOpen={onOpen}
                keepTooltipInside={true}
                lockScroll={false}
                closeOnEscape={true}
                closeOnDocumentClick
                position="top center"
                modal={false}
                on={'hover'}
                trigger={trigger}
            >
                {children}
            </Popup>
        </div>
    )
}