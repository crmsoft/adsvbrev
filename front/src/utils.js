import React, {Component, Fragment} from 'react';
import { Emoji, emojiIndex } from 'emoji-mart'
import qString from 'query-string';
import axios from 'axios';

import {Loading} from './general/Loading';

const placeEmoji = (str, result) => {

    let start_index;
    let length = str.length;
    result = result ? result : [];

    for(var cursor = 0; cursor < length; cursor++ )
    {
        let char = str[cursor];
        
        // no space in emoji tag
        if (start_index && char === ' ')
        {
            result.push(str.substring(0, cursor));
            return placeEmoji(str.substring(cursor, length), result);
        } // end if

        if (char === ':')
        {
            // terminating semicolon ?
            if (start_index !== undefined)
            {        
                let emoji_tag = str.substring(start_index + 1, cursor);
                let exists = emojiIndex.search(emoji_tag);

                if (!exists || !exists.filter(emo => emo.id === emoji_tag).length)
                {
                    result.push(str.substring(0, cursor));
                    return placeEmoji(str.substring(cursor, length), result);
                } // end if

                // we have something before 
                if (start_index)
                {
                    result.push(
                        str.substr(0, start_index)
                    );
                } // end if

                result.push(<Emoji key={Math.random()+`_${emoji_tag}`} sheetSize={20} size={20} emoji={emoji_tag} set="google" />);
                var next = str.substr(cursor+1, length);

                return str[cursor + 1] ? placeEmoji(next, result) : result;
            } else {                
                start_index = cursor;
            } // end if
        } // end if
    } // end for

    result.push(str);

    return result;
/*
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
            emoji: <Emoji key={i} sheetSize={20} size={20} emoji={emo} set="google" />,
            index: text.indexOf(emo),
            length: emo.length
        }
    });  
    
    /**
     * no emoji found in index !
     *
    if (result.length === 0)
    {
        return text;
    } // end if
    
    let r = [];
    for(let i=0; i<result.length; i++)
    {
        // current to insert
        const emo = result[i];

        // first item in message is not emoji
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

    return r; */
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

const extractIframe = text => {
    let div = document.createElement('div');
    div.innerHTML = text;
    let iframe = div.querySelector('iframe');

    return iframe ? iframe.src : text;
}

class Youtube extends Component{

    state = {
		loaded: false
	}

	render()
	{
        
		const {loaded} = this.state;
        const {url} = this.props;
        
        const parts = qString.parseUrl(url);
        let id = parts.query.v;
        let extra = '';

        if (!id)
        {
            id = parts.url.split('/').pop();

            if (Object.keys(parts.query).length)
            {
                id = id.split('?')[0];
            } // end if
        } // end if
        
        if (parts.query.t)
        {
            extra = `&start=${parts.query.t}`;
        } // end if

		return loaded ? (
            <div className="yt-video">
                <iframe 
                        allowFullScreen
                        src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&showinfo=0&playsinline=1${extra}`} 
                        height="360"
                        frameBorder="0"
                        className="w-100" />
            </div>
		) : (
            <div 
                className="yt-video"
                onClick={
                    e => {
                        e.preventDefault();
                        this.setState({loaded:true});
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

class SoundCloud extends Component{

    state = {
		loaded: false
	}

	render()
	{
        
		const {loaded} = this.state;
        const {url} = this.props;

		return (
            <div>
                {loaded ? null : <Loading />}
                <iframe 
                    onLoad={e => this.setState(({loaded: true}))}
                    scrolling="no"
                    allow="autoplay"
                    allowFullScreen
                    src={url} 
                    height="166"
                    frameBorder="0"
                    className={loaded ? `w-100`:`d-none`} />
            </div>
		) 
	}
}

class Twitch extends Component{

    state = {
        loaded: false,
        poster: undefined
    }
    
    fetchPoster( id )
    {
        if (this.state.poster === undefined)
        {
            axios.get(`/api/v1/twitch/video/${id}/thumb`)
            .then(({data}) => {
                !this.state.loaded && this.setState(() => {
                    return {poster: data.medium}
                })
            });
        } // end if
    }

	render()
	{
		const {loaded, poster} = this.state;
        const {url} = this.props;
        
        // find yt id
        const parts = qString.parseUrl( url );
        
        const channel = `https://player.twitch.tv/?channel=#channel&muted=true&autoplay=true`;
        const video = `https://player.twitch.tv/?autoplay=true&video=#video&muted=true`;
        let thumb = ``;

        let iframeUrl = '';

        if (Object.keys(parts.query).length === 0)
        {
            let id = parts.url.split('/').pop();
            if (parts.url.indexOf('video') !== -1)
            {
                iframeUrl = video.replace('#video', id);
                poster ? (thumb = poster) : this.fetchPoster(id);
            } else {
                iframeUrl  = channel.replace('#channel', id);
                thumb = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${id}-640x360.jpg`;
            } // end if
        } // end if

        if (parts.query.channel)
        {
            iframeUrl = channel.replace('#channel', parts.query.channel);
            thumb = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${parts.query.channel}-640x360.jpg`
        } // end if

        if (parts.query.video || parts.query.t)
        {
            let id = parts.query.video ? parts.query.video : (
                parts.url.split('/').pop()
            );
            iframeUrl = video.replace('#video', id);
            poster ? (thumb = poster) : this.fetchPoster(id);
            parts.query.t ? (iframeUrl += `&t=${parts.query.t}`) : ``
        } // end if

		return loaded ? (
            <div className="yt-video">
                <iframe src={iframeUrl} 
                        allowFullScreen
                        height="360"
                        frameBorder="0"
                        className="w-100" />
            </div>
		) : (
            <div 
                className="yt-video"
                onClick={
                    e => {
                        e.preventDefault();
                        this.setState({loaded:true})
                    }
                }
                key={url}>
                <img
                    className="w-100" 
                    src={thumb} 
                />
                <div className="yt-play-btn"></div>
			</div>
		)
	}
}

const Anchor = ({url}) => {
    return (
        <a href={url} target="_blank">
            {url}
        </a>
    )
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

    isTwitch( text )
    {
        return text.indexOf('www.twitch.tv') !== -1 || text.indexOf('player.twitch.tv') !== -1;
    }

    isSoundCloud(text)
    {
        return text.indexOf('soundcloud.com/player') !== -1;
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
                this.isLink(text) ? (
                    this.isYoutube( text ) ? <Youtube url={text} /> : (
                        this.isTwitch( text ) ? <Twitch url={text} /> : (
                            this.isSoundCloud( text ) ? <SoundCloud url={text} /> : <Anchor url={text} />
                        )
                    )
                ) : text
            }
        </Fragment>
    }
}

const urlify = (text) => {
    let results = [];
    let div = document.createElement('div');
    var urlRegex = /(https?:\/\/[^\s]+)/g;

    div.innerHTML = text;

    for(let i=0; i<div.childNodes.length; i++)
    {
        let node = div.childNodes[i];
        let name = node.nodeName.toLocaleLowerCase();

        if ( name === 'iframe')
        {
            results.push(
                <Url text={node.src}/>
            )
        } else if ( node.nodeType === Node.TEXT_NODE )
        {
            node.textContent.split(urlRegex).map(candidate => results.push(<Url text={candidate} />));
        } else  {
            results.push(node.textContent);
        }// end if
    } // end for

    return results;
}

function getHashParams(url) {

    var hashParams = {};
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&;=]+)=?([^&;]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = url ? url.substring(1) : window.location.hash.substring(1);

    while (e = r.exec(q))
       hashParams[d(e[1])] = d(e[2]);

    return hashParams;
}

export {
    placeEmoji,
    inViewPort,
    urlify,
    getHashParams
};