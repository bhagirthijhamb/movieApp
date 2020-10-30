import React, { useContext } from 'react';
import { MovieContext } from './../MovieContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';


const SideBar = () => {
    const { nominatedMovies, deleteMovie } = useContext(MovieContext);

    console.log(nominatedMovies);

    return(
        <section className="nominatedMovies_container">
            <h2>Nominee List</h2>
            <ul className="nominatedMovies_movieList">
                {nominatedMovies ? nominatedMovies.map(movie => (
                    <li id={movie.id} className="movieResults_movieCard">
                        <div className="movieResults_movieThumbnail">
                            {movie.Poster ? 
                                <img src={movie.Poster} alt="Poster of movie" className="posterSize" /> 
                                : 
                                <div className="no-poster"> 
                                    <FontAwesomeIcon icon={faFilm} className="movie_icon"/>
                                    <p>No poster available</p>
                                </div>}
                        </div>
                        <div className="movieResults_movieContent">
                            <p>Released on {movie.ReleaseDate}</p>
                            <h3>{movie.Title}</h3>
                            <button id={movie.imdbId} className="">Nominate</button>
                        </div>
                    </li>
                )) : <div></div>}
            </ul>
        </section>
    )
}

export default SideBar;