import React from 'react';
import {getHashParams} from '../../utils';
import ShowPost from './ShowPost';

export default function () {
    return <div id="app-dynamic">
        <TheRouteIsChanged />
    </div>;
}

const TheRouteIsChanged = () => {
    const params = getHashParams();
    
    if (params.p)
    {
        return <ShowPost key={Math.random()} post_id={params.p}/>
    } // end if

    return null;
}