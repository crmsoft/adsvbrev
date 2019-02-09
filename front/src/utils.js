import React, {Component} from 'react';
import { Emoji, emojiIndex } from 'emoji-mart'

const placeEmoji = text => {
    const emojies = text.match(/\:[\S]*\:/g);
        
    if(!emojies)
    {
        return text;
    } // end if
    
    const result = emojies.filter(emoji => {
        const matches = emojiIndex.search( emoji.replace(/\:/g, '') ).filter(emo => emo.colons === emoji)
        
        return matches.length;
    }).map((emo, i) => {
        return {
            emoji: <Emoji key={i} size={16} emoji={emo} set="google" />,
            index: text.indexOf(emo),
            length: emo.length
        }
    });   
    
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

export {
    placeEmoji
};