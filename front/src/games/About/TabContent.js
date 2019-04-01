import React, {Fragment, Component} from 'react';

const OtherContent = ({state, options}) => {
    return state ? (
        <Fragment>
            <div className="profile-about-content">
                <div className="profile-about-row">
                    <div className="profile-about-label">
                        {`Game Story`}
                    </div>
                    <div className="profile-about-value">
                        Bir zamanda var eken bir zamanda yok eken ...
                    </div>
                </div>
            </div>
        </Fragment>
    ) : null;
}

class TabContent extends Component {

    state = {
        open: false
    }

    toggleOpen()
    {
        this.setState(state => {
            return {
                open: !state.open
            }
        });
    }

    render()
    {
        const {open} = this.state;

        return (
            <Fragment>
                <div className="profile-about-content">
                    <div className="profile-about-row">
                        <div className="profile-about-label">
                            {`Game Story`}
                        </div>
                        <div className="profile-about-value">
                            Bir zamanda var eken bir zamanda yok eken ...
                        </div>
                    </div>
                </div>
                <OtherContent state={open} options={{}} />
                <div className="profile-about-footer">
                    <span className="profile-about-more" onClick={this.toggleOpen.bind(this)}>
                        {
                            open ? `Show less` : `Show more`
                        }
                    </span>
                </div>
            </Fragment>
        )
    }
}

export default TabContent;