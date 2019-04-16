import React, {Fragment, Component} from 'react';
import {DateTime} from 'luxon';


const system_req = data => {
    var nodes = [];
    for(let key in data)
    {
        nodes.push(
            <div key={key} className="row">
                <div className="col-4">{key}</div>
                <div className="col-8">{data[key]}</div>
            </div>
        );
    } // end for

    return nodes;
}

const OtherContent = ({state, options}) => {
    return state ? (
        <Fragment>
            {
                <div className="profile-about-content">
                    <div className="profile-about-row">
                        <div className="profile-about-label">
                            {`Game Story`}
                        </div>
                        <div className="profile-about-value">
                            {options.description.full ? options.description.full : options.description.about}
                        </div>
                    </div>
                </div>
            }
            {
                options.genres.length ? (
                    <div className="profile-about-content">
                        <div className="profile-about-row">
                            <div className="profile-about-label">
                                {`Genre`}
                            </div>
                            <div className="profile-about-value">
                                {options.genres.map(item => item.name).join(', ')}
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                options.languages.length ? (
                    <div className="profile-about-content">
                        <div className="profile-about-row">
                            <div className="profile-about-label">
                                {`Languages`}
                            </div>
                            <div className="profile-about-value">
                                {options.languages.join(', ')}
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                options.developers.length ? (
                    <div className="profile-about-content">
                        <div className="profile-about-row">
                            <div className="profile-about-label">
                                {`Developed by`}
                            </div>
                            <div className="profile-about-value">
                                {options.developers.map(item => item.name).join(', ')}
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                options.release.released ? (
                    <div className="profile-about-content">
                        <div className="profile-about-row">
                            <div className="profile-about-label">
                                {`Release`}
                            </div>
                            <div className="profile-about-value">
                                {
                                    options.release.released ? DateTime.fromMillis(options.release.timestamp * 1000).toLocaleString(DateTime.DATE_SHORT) : `Coming soon`
                                }
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                !Array.isArray(options.system_requirements.windows) ? (
                    <div className="profile-about-content w-100">
                        <div className="profile-about-row">
                            <div className="profile-about-label">
                                {`Windows`}
                            </div>
                            <div className="profile-about-value">
                                {
                                    system_req(options.system_requirements.windows)
                                }
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                !Array.isArray(options.system_requirements.linux) ? (
                    <div className="profile-about-content w-100">
                        <div className="profile-about-row">
                            <div className="profile-about-label">
                                {`Linux`}
                            </div>
                            <div className="profile-about-value">
                                {
                                    system_req(options.system_requirements.linux)
                                }
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                !Array.isArray(options.system_requirements.mac) ? (
                    <div className="profile-about-content w-100">
                        <div className="profile-about-row">
                            <div className="profile-about-label">
                                {`Mac`}
                            </div>
                            <div className="profile-about-value">
                                {
                                    system_req(options.system_requirements.mac)
                                }
                            </div>
                        </div>
                    </div>
                ) : null
            }
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
        const options = this.props.data;

        if (!options.description)
        {
            return null;
        } // end if

        return (
            <Fragment>
                {
                    open ? null : (
                        <div className="profile-about-content">
                            <div className="profile-about-row">
                                <div className="profile-about-label">
                                    {`Game Story`}
                                </div>
                                <div className="profile-about-value">
                                    {options.description.about.substr(0, 200)}
                                </div>
                            </div>
                        </div>
                    )
                }
                <OtherContent state={open} options={options} />
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