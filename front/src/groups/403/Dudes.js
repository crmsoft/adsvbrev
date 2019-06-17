import React from 'react';


export default function ({
    data, knocked, setKnock
}) {
    return (
        <div className="dd-block container">
            <div className="row">
                <div className="col" style={{paddingTop: '5px'}}>
                    <small className="light-gray">
                        {data.total_participant} Dudes
                    </small>
                </div>
                <div className="col text-right">
                    <button className="btn dd-btn btn-sm" disabled={knocked} onClick={e => setKnock(true)}>
                        <span className="icon-plus"></span>
                        { knocked ? 'knock knock' : 'Knock on the door' }
                    </button>
                </div>
            </div>
        </div>
    )
}