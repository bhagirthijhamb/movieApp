import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
// import { }


const Student = (props) => {
    return (
        <div className="fixed_container">
            <nav>
                <button>
                    <FontAwesomeIcon icon={faFilm} className="movie_icon"/>
                </button>
            </nav>
        </div>
    )
}

export default Student;