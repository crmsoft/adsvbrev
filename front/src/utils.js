import React, {Component} from 'react';
import { Emoji, emojiIndex } from 'emoji-mart'

const placeEmoji = text => {
    const emojies = text.match(/\:[\S]*\:/g);
        
    if(!emojies)
    {
        return text;
    } // end if
    
    const result = emojies.filter(emoji => {
        const matches = emojiIndex.search( emoji.replace(/\:/g, '') );


        return matches && matches.filter(emo => emo.colons === emoji).length;
    }).map((emo, i) => {
        return {
            emoji: <Emoji key={i} size={16} emoji={emo} set="google" />,
            index: text.indexOf(emo),
            length: emo.length
        }
    });  
    
    /**
     * no emoji found in index !
     */
    if (result.length === 0)
    {
        return text;
    } // end if
    
    let r = [];
    for(let i=0; i<result.length; i++)
    {
        // current to insert
        const emo = result[i];

        // first item in message is not emojit
        if(emo.index !== 0)
        {
            if(i === 0)
            {
                r.push( text.substring( 0, emo.index ) )
            }
            else
            {
                // prev emoji; to calculate previous emoji start index
                const pemo = result[i-1];
                r.push( text.substring( pemo.index + pemo.length, emo.index  ) );
            } // end if
        }// end if        
        r.push( emo.emoji );
    }

    return r;
}

const inViewPort = (elem, parent) => {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (parent.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (parent.innerWidth || document.documentElement.clientWidth)
    );
};

export {
    placeEmoji,
    inViewPort
};