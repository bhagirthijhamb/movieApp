import React, { useContext } from 'react';
import { MovieContext } from './../MovieContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { useEffect } from 'react';



const SideBar = () => {
    const { nominatedMovies, basketOpen, undoNominateMovie, toggleBasket } = useContext(MovieContext);

    console.log(nominatedMovies);

    useEffect(() => {
        if(nominatedMovies && nominatedMovies.length === 5){
            swal(" 🥳 Congratulations !", "You have nominated 5 movies", "success")
        }
    }, [nominatedMovies])

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
                    <li id={movie.imdbId} className="nominatedMovies_movieCard">
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
                            <button id={movie.imdbId} className="" onClick={() => undoNominateMovie(movie.imdbId)}>Remove</button>
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