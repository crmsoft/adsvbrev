import React from 'react';

export const Buy = ({data}) => {

    const {
        options,
        ava,
        name
    } = data;

    if (!options)
    {
        return null;
    }

    return <section className="block">
                <div className="header">
                    <a
                        href="javascript:void(0)"
                    >
                        <span className="icon-basket"></span>
                        <h3>
                            {`Buy the game`} 
                        </h3>
                    </a>
                </div>
                <div className="block-content">
                    <div className="row">
                        <div className="col-4">
                            <img src={ava} />
                        </div>
                        <div className="col-8 p-0">
                            <small>
                                {name}
                            </small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-right">
                            <a 
                                target="blank"
                                href={`https://store.steampowered.com/app/${options.resource}`} 
                                className="dd-btn btn-sm btn-full">
                                {`Buy`}
                            </a>
                        </div>
                    </div>
                </div>
    </section>
}