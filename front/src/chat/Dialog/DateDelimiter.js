import React from 'react';
import {DateTime} from 'luxon';

export const DateDelimiter = ({date}) => {
    return (
        <div className="message-date-start">
            <span>
                {date.toLocaleString(DateTime.DATE_MED)}
            </span>
        </div>
    ) 
}