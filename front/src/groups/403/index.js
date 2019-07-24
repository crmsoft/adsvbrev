import React, {useState, useEffect} from 'react';

import Menu from '../../menu/index';
import About from '../About';
import Profile from './Profile';
import Dudes from './Dudes';
import RelatedGames from '../RelatedGames';

export default function({
    data
}) {
    const [knock, setKnock] = useState(false)
    const {poster} = data;

    useEffect(() => {

    }, [knock])

    return (
        <div>
            <nav className="user-profile game-profile"
                style={{backgroundImage: `url(${poster})`}}
            >

                <Profile 
                    data={data}
                    knocked={knock} 
                    setKnock={setKnock}    
                />
                
            </nav>

            <div className="d-flex">

                <Menu />

                <section className="user-middle">
                    
                    <About 
                        about={data.description}
                    /> 

                    <div style={{
                        backgroundImage: 'url(/img/guarded.png)', 
                        height: '200px',
                        backgroundSize: '119%',
                        zIndex: 2,
                        marginTop: '-40px',
                        marginLeft: '-20px'
                    }}></div>

                    <Dudes 
                        data={data} 
                        knocked={knock} 
                        setKnock={setKnock}
                    />
                </section>

                <aside className="profile-aside">
                    <RelatedGames 
                        list={data.related}
                    />
                </aside>
            
            </div>
        </div>
    )
}
