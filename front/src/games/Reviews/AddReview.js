import React, {Component} from 'react';
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

    }

    onFocus()
    {
        this.setState(() => {
            return {
                active: true
            }
        })
    }

    onText()
    {

    }
    
    render()
    {
        const {active, can_submit} = this.state;

        return (
            <div className="user-add-post">
                <div className={active ? "wrapper active":"wrapper"}>
                    
                    <Input 
                        emoji={this.state.saved}
                        placeholder={`Tell about your adventure in favorite game...`}
                        onFocus={this.onFocus.bind(this)}
                        onType={this.onText.bind(this)}
                        value={this.state.post}
                    />
                    
                    <div className="footer">
                        <div className="actions justify-content-sm-end">
                            <button 
                                className={`btn btn-sm btn-full`}
                                disabled={can_submit}
                                onClick={this.onSubmit}>Post</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}