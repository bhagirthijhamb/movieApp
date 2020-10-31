import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { MovieContext } from './../MovieContext';



const Navbar = (props) => {
    const { nominatedMovies, deleteMovie, toggleBasket } = useContext(MovieContext);

    return (
        <div className="fixed_container">
            <nav>
                <div className="wrapper">
                    <button>
                        <FontAwesomeIcon icon={faFilm} className="movie_icon" onClick={toggleBasket} />
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;