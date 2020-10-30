import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
// import { }


const Navbar = (props) => {
    return (
        <div className="fixed_container">
            <nav>
                <div className="wrapper">
                    <button>
                        <FontAwesomeIcon icon={faFilm} className="movie_icon"/>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;