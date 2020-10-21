import React from 'react';

const Header = props => {
    return (
        <div className="header_container">
            <header>
                <div className="wrapper">
                    <div className="header_title">
                        <h1>The Movie Buff</h1>
                        <img src={require('./../assets/peachHorizontal1.svg')} alt="squiggly text underline"/>
                    </div>
                    <div className="header_introText">
                        <p>Welcome to The Movie Buff's 1st ever virtual movie awards!</p>
                        <p>"We want to know which movie are the all time fan favourites so we'll need your help. Tell us what your most beloved films are by nominating your top 5 favourites."</p>
                        <p>Poll close on December 8 at 9 a.m. EST so get your votes in ASAP!</p>
                        <button>Vote Now</button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;