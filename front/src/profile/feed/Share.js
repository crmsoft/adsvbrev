import React, {useState, useCallback} from 'react';
import axios from 'axios';

import {Modal, actions} from '../../Modal';
import Post from './Post';

export default ({
    onClose, post, toggleShare
}) => {

    const [open, setOpen] = useState(true);
    const [comment, setComment] = useState('');
    const [processing, setProcessing] = useState(false);

    const cancel = () => {onClose(); setOpen(false);}
    const submit = () => {
        if (processing)
        {
            return;
        } // end if

        setProcessing(true);
		axios.post(`/post/share/${post.id}`, {
            content: comment
        })
		.then(response => {
            if(response.data === 1){
                toggleShare(post.id);
                setProcessing(false);
                cancel();
            } // end if
        })
    }
    
    return (
        <Modal
            processing={processing}
            onClose={cancel}
            open={open}
            title={`Share post of ${post.poster.full_name}`}
            actions={actions(cancel, submit)}
        >
            <div className="list-scroll">
                <div className='m-2'>
                    <textarea 
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Put your comments"/>
                </div>
                <div className='m-2'>
                    <Post
                        post={post}
                    />
                </div>
            </div>
        </Modal>
    )
}