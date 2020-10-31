import React, { useContext } from 'react';
import { MovieContext } from './../MovieContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faWindowClose } from '@fortawesome/free-solid-svg-icons';


const SideBar = () => {
    const { nominatedMovies, basketOpen, deleteMovie, toggleBasket } = useContext(MovieContext);

    console.log(nominatedMovies);

    return(
        <div>
        {basketOpen &&
            // <div className="nominatedMovies_overlay">
        <section className="nominatedMovies_container">
            <span className="close_nominatedMovies">
                <FontAwesomeIcon icon={faWindowClose} className="close_icon" onClick={toggleBasket}/>
            </span>
            <h2>Nominee List</h2>
            <ul className="nominatedMovies_movieList">
                {nominatedMovies ? nominatedMovies.map(movie => (
                    <li id={movie.id} className="nominatedMovies_movieCard">
                        <div className="nominatedMovies_movieThumbnail">
                            {movie.Poster ? 
                                <img src={movie.Poster} alt="Poster of movie" className="nominatedMovies_posterSize" /> 
                                : 
                                <div className="nominatedMovies_no-poster"> 
                                    <FontAwesomeIcon icon={faFilm} className="movie_icon"/>
                                    <p>No poster available</p>
                                </div>}
                        </div>
                        <div className="nominatedMovies_movieContent">
                            <p>Released on {movie.ReleaseDate}</p>
                            <h3>{movie.Title}</h3>
                            <button id={movie.imdbId} className="">Nominate</button>
                        </div>
                    </li>
                )) : <div></div>}
            </ul>
        </section>
        // </div>
    }
    </div>
    )
}

export default SideBar;