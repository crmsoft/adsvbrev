import React, {Component} from 'react';

const OtherContent = ({profile}) => {
    return (
        <div>
            <div className="profile-about-row">
                <div className="profile-about-label">
                    Timezone
                </div>
                <div className="profile-about-value">
                    {profile.timezone}
                </div>
            </div>
            <div className="profile-about-row">
                <div className="profile-about-label">
                    Date of Birth
                </div>
                <div className="profile-about-value">
                    {profile.dob}
                </div>
            </div>
            <div className="profile-about-row">
                <div className="profile-about-label">
                    Phone
                </div>
                <div className="profile-about-value">
                    {profile.phone}
                </div>
            </div>
        </div>
    )
}

export default class About extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            open: false
        }
    }

    toggle(){
        this.setState({open: !this.state.open})
    }
    
    render(){
        const {user} = this.props;
        return (
            <div className="profile-about">
                <div className="profile-about-header">
                    <span className="icon-profile"></span>
                    <h4 className="profile-header-text">
                        About Me
                    </h4>
                </div>
                <div className="profile-about-content">
                    <div className="profile-about-row">
                        <div className="profile-about-label">
                            About Me
                        </div>
                        <div className="profile-about-value">
                            {user.profile.about}
                        </div>
                    </div>
                    {
                        this.state.open ? <OtherContent profile={user.profile} /> : null
                    }
                </div>
                <div className="profile-about-footer">
                    <span onClick={this.toggle} className="profile-about-more"> 
                        { this.state.open ? 'Show Less' : 'Show More' }
                    </span>
                </div>
            </div>
        )
    }
}