import React, {Component, Fragment} from 'react';
import Menu from '../menu'
export default class FDudes extends Component{
    render()
    {
        return (
            <div className="d-flex">

            <Menu />
            
            <div className="user-middle">
                <div className="find-your-dudes-title">

                        <img src="img/binoculars.svg" alt="" />
                    <h3>Find Your Dudes!</h3>
                </div>
                <section  className="find-your-dudes">
                        
                    <div className="row">
                        <div className="col-md-3">
                            <div className="my-games" >
                                <div className="my-games-title">
                                    <img src="img/gamepad.svg" alt="" />
                                    <h3>My Games</h3>
                                </div>
                                <div className="my-games-section">

                                    <div className="my-games-box active">
                                        <img src="img/wow.svg" alt="" />
                                        <div className="my-games-content">
                                            <h3>Word Of Warcraft</h3>
                                            <div className="my-games-desc">
                                                <small>21.312</small>
                                                <p>Gamers Inside</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-games-box">
                                        <img src="img/minecraft.svg" alt="" />
                                        <div className="my-games-content">
                                            <h3>Minecraft</h3>
                                            <div className="my-games-desc">
                                                <small>21.312</small>
                                                <p>Gamers Inside</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="my-games-bottom">
                                <div className="my-games-notifications">
                                    <p>* You can only access
                                        the rooms of your chosen
                                        games. <b> Click </b>to select a game!</p>
                                </div>

                                <div className="my-games-search">
                                    <div className="input-group flex-nowrap">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="addon-wrapping"><i className="fa fa-search"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Search My games.." aria-label="Search My games" aria-describedby="addon-wrapping" />
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="my-games-inside">
                                <div className="my-games-inside-title">

                                    <h3> <span className="fa fa-users"></span> WORLD OF WARCRAFTS GAME CHANNEL</h3>
                                </div>
                                <div className="my-games-banner">
                                    <img src="img/wow-banner.svg" alt="" />
                                </div>
                                <div className="my-games-messages">

                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="dudes-on-channels">
                                <div className="on-channels-title">
                                    <img src="img/on-channels.svg" alt="" />
                                    <h3>On Channels</h3>
                                </div>
                                <div className="on-channels-messages">

                                </div>


                                <div className="my-games-bottom">
                                    <div className="my-games-search">
                                        <div className="input-group flex-nowrap">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="addon-wrapping"><i className="fa fa-search"></i></span>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Search My games.." aria-label="Search My games" aria-describedby="addon-wrapping" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        )
    }
}