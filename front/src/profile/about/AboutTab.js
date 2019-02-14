import React, {Component, Fragment} from 'react';

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

export default class AboutTab extends Component{

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

    render()
    {
        const {profile} = this.props;
        return (
            <Fragment>
                <div className="profile-about-content">
                    <div className="profile-about-row">
                        <div className="profile-about-label">
                            About Me
                        </div>
                        <div className="profile-about-value">
                            {profile.about}
                        </div>
                    </div>
                    {
                        this.state.open ? <OtherContent profile={profile} /> : null
                    }
                </div>
                <div className="profile-about-footer">
                    <span onClick={this.toggle} className="profile-about-more"> 
                        { this.state.open ? 'Show Less' : 'Show More' }
                    </span>
                </div>
            </Fragment>
        )
    }
}