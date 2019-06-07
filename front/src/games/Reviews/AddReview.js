import React, {Component} from 'react';
import axios from 'axios';

import Input from '../../post-add/Input';


export default class AddReview extends Component{

    state = {
        active: false,
        saved: false,
        post: '',
        can_submit: false,
    }

    onSubmit()
    {
        const {post} = this.state;
        const {game} = this.props;

        axios.post(`/game/review/store/${game}`, {
            review: post,
            type: 'positive'
        }).then(({data}) => {
            this.setState(() => {
                return {
                    active: false,
                    post: ''
                }
            }, () => {
                this.props.pushReview(data);
            })
        })
    }

    onFocus()
    {
        if (this.props.available)
        {
            this.setState(() => {
                return {
                    active: true
                }
            })
        } else {
            document.activeElement.blur();
            alert('To leave a comment you need vote the game first !');
        } // end if
    }

    onText(text)
    {
        this.setState(() => {
            return {
                post: text
            }
        })
    }
    
    render()
    {
        const {active, can_submit} = this.state;

        return (
            <div className="user-add-post">
                <div className={active ? "wrapper active":"wrapper"}>
                    
                    <Input 
                        emoji={this.state.saved}
                        placeholder={`Leave your opinion about this game...`}
                        onFocus={this.onFocus.bind(this)}
                        onType={this.onText.bind(this)}
                        value={this.state.post}
                    />
                    
                    <div className="footer">
                        <div className="actions justify-content-sm-end">
                            <button 
                                className={`btn btn-sm btn-full`}
                                disabled={can_submit}
                                onClick={this.onSubmit.bind(this)}>Post</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}