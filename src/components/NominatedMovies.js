import React, { useContext } from 'react';
import { MovieContext } from './../MovieContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';



const NominatedMovies = () => {

    const { nominatedMovies, basketOpen, undoNominateMovie, toggleBasket, getFromLocalStorage } = useContext(MovieContext);
    
    let nominatedMoviesFromLS = JSON.parse(localStorage.getItem('nominatedMovies'));

    
    const getNominatedMovies = () => {
        if(localStorage.hasOwnProperty('nominatedMovies')){
            return JSON.parse(localStorage.getItem('nominatedMovies'))
        } else {
            return [];
        }
    }
    

    console.log(nominatedMovies);

    useEffect(() => {
        if(basketOpen){
            nominatedMoviesFromLS = getNominatedMovies();
        }

        getFromLocalStorage(nominatedMoviesFromLS);
    }, [basketOpen])


    return(
        <section className="nominatedMovies_container">
            <span className="close_nominatedMovies">
                <FontAwesomeIcon icon={faWindowClose} className="close_icon" onClick={toggleBasket}/>
            </span>
            <h2>Nominee List</h2>
            <ul className="nominatedMovies_movieList">
                {nominatedMoviesFromLS ? nominatedMoviesFromLS.map(movie => (
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
    )
}

export default NominatedMovies;