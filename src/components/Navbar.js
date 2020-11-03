import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { MovieContext } from './../MovieContext';



const Navbar = (props) => {
    const { nominatedMoviesFromLS, nominatedMovies, toggleBasket } = useContext(MovieContext);

    return (
        <div className="fixed_container">
            <nav>
                <div className="wrapper">
                    <button className="movie-button">
                        <FontAwesomeIcon icon={faFilm} className="movie_icon" onClick={toggleBasket} />
                        {/* <span className="nomineeNotification">{nominatedMoviesFromLS && nominatedMoviesFromLS.length}</span> */}
                        <span className="nomineeNotification">{nominatedMovies && nominatedMovies.length}</span>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;