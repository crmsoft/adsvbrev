import React, {Component, Fragment} from 'react';
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

String.prototype.nl2br = function() {
    return this.replace(/(?:\r\n|\r|\n)/g, '<br />');
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

class Youtube extends Component{

    state = {
		loaded: false
	}

	render()
	{
		const {loaded} = this.state;
        const {url} = this.props;
        
        // find yt id
        const parts = url.split('').reverse();
        let id = [];
        for(let i = 0; i < parts.length; i++ )
        {   
            if (parts[i] === '=' || parts[i] === '/')
            {
                break;
            } // end if

            id.push( parts[i] );
        } // end for
        id = id.reverse().join('');

		return loaded ? (
            <div className="yt-video">
                <iframe 
                        src={`https://www.youtube.com/embed/${id}?autoplay=1`} 
                        height="360"
                        frameBorder="0"
                        className="w-100" />
            </div>
		) : (
            <div 
                className="yt-video"
                onClick={
                    e => {
                        this.setState({loaded:true})
                    }
                }
                key={url}>
                <img
                    className="w-100" 
                    src={`https://img.youtube.com/vi/${id}/0.jpg`} 
                />
                <div className="yt-play-btn"></div>
			</div>
		)
	}
}

class Twitch extends Component{

    state = {
		loaded: false
	}

	render()
	{
		const {loaded} = this.state;
        const {url} = this.props;
        
        // find yt id
        const parts = url.split('').reverse();
        let id = [];
        for(let i = 0; i < parts.length; i++ )
        {   
            if (parts[i] === '=' || parts[i] === '/')
            {
                break;
            } // end if

            id.push( parts[i] );
        } // end for
        id = id.reverse().join('');

		return loaded ? (
            <div className="yt-video">
                <iframe 
                        src={`https://www.youtube.com/embed/${id}?autoplay=1`} 
                        height="360"
                        frameBorder="0"
                        className="w-100" />
            </div>
		) : (
            <div 
                className="yt-video"
                onClick={
                    e => {
                        this.setState({loaded:true})
                    }
                }
                key={url}>
                <img
                    className="w-100" 
                    src={`https://img.youtube.com/vi/${id}/0.jpg`} 
                />
                <div className="yt-play-btn"></div>
			</div>
		)
	}
}

class Url extends Component{

    isLink(text)
    {
        return (text.indexOf('http://') !== -1) || (text.indexOf('https://') !== -1);
    }

    isYoutube( text )
    {
        return text.indexOf('https://youtu') !== -1 || (
            text.indexOf('https://www.youtu') !== -1
        );
    }

    render()
    {
        const {text} = this.props;
        if (text.length === 0)
        {
            return null;
        } // end if
   
        return <Fragment key={text}>
            {
                this.isYoutube(text) ? (
                    <Youtube url={text} />
                ) : (
                    this.isLink(text) ? (
                        <a href={text}>
                            {text}
                        </a>
                    ) : (
                        <span>
                            {text}
                        </span>
                    )
                )
            }
        </Fragment>
    }
}

const urlify = (text) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map(candidate => <Url text={candidate} />)
}

export {
    placeEmoji,
    inViewPort,
    urlify
};