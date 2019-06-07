import React from 'react';

export const FILTER_ALL = 'FILTER_ALL';
export const FILTER_BEST = 'FILTER_BEST';
export const FILTER_LAST = 'FILTER_LAST';
export const FILTER_POSITIVE = 'FILTER_POSITIVE';
export const FILTER_NEGATIVE = 'FILTER_NEGATIVE';

const Filter = ({onFilter, active}) => {
    return (
        <table className="filter">
            <tbody>
                <tr>
                    <td>
                        <a 
                            className={active === FILTER_ALL ? 'active':''}
                            onClick={() => onFilter(FILTER_ALL)}
                            href="javascript:void(0)">
                            All Comments
                        </a>
                    </td>
                    <td>
                        <a 
                            className={active === FILTER_POSITIVE ? 'active':''}
                            onClick={() => onFilter(FILTER_POSITIVE)}
                            href="javascript:void(0)">
                            Positive
                        </a>
                    </td>
                    <td>
                        <a 
                            className={active === FILTER_NEGATIVE ? 'active':''}
                            onClick={() => onFilter(FILTER_NEGATIVE)}
                            href="javascript:void(0)">
                            Negative
                        </a>
                    </td>
                    <td>
                        <a 
                            className={active === FILTER_BEST ? 'active':''}
                            onClick={() => onFilter(FILTER_BEST)}
                            href="javascript:void(0)">
                            Best
                        </a>
                    </td>
                    <td>
                        <a 
                            className={active === FILTER_LAST ? 'active':''}
                            onClick={() => onFilter(FILTER_LAST)}
                            href="javascript:void(0)">
                            Last Comments
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

Filter.filterReviews = (type, arr) => {

    if (type === FILTER_ALL)
    {
        return arr;
    } // end if

    if (type === FILTER_NEGATIVE)
    {
        return arr.filter(r => r.type === 'negative');
    } // end if

    if (type === FILTER_POSITIVE)
    {
        return arr.filter(r => r.type === 'positive');
    } // end if

    if (type === FILTER_BEST)
    {
        return arr.sort((a,b) => (a.like_count > b.like_count) ? 1 : ((b.like_count > a.like_count) ? -1 : 0));
    } // end if

    if (type === FILTER_LAST)
    {
        return arr.sort((a,b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0));
    } // end if

    return [];
}

export default Filter;