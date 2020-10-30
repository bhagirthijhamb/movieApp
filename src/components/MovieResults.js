import React, { useContext } from 'react';
import { MovieContext } from './../MovieContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

const MovieResults = () => {
    const { movies, nominateMovie, undoNominateMovie } = useContext(MovieContext);
    // console.log(movie.poster_path)

    const handleNominate = (movie) => {
        console.log(movie)
        const nominatedMovie = {
            Poster: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            ReleaseDate: movie.release_date,
            Title: movie.original_title,
            imdbId: movie.id
        }

        nominateMovie(nominatedMovie);
    }

    return(
        <section>
            <div className="movieResults_container">
                <div className="wrapper movieResults_gridContainer">
                    <h2>Pick Your Flicks</h2>
                    <ul className="movieResults_movieList">
                        {movies.map(movie => (
                            <li id={movie.id} className="movieResults_movieCard">
                                <div className="movieResults_movieThumbnail">
                                    {movie.poster_path ? 
                                        <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="Poster of movie" className="posterSize" /> 
                                        : 
                                        <div className="no-poster"> 
                                            <FontAwesomeIcon icon={faFilm} className="movie_icon"/>
                                            <p>No poster available</p>
                                        </div>}
                                </div>
                                <div className="movieResults_movieContent">
                                    <p>Released on {movie.release_date}</p>
                                    <h3>{movie.original_title}</h3>
                                </div>
                                <div className="movieResults_btnContainer">
                                    <button id={movie.id} className="" onClick={() => handleNominate(movie)}>Nominate</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default MovieResults;