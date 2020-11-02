import React, { useContext } from 'react';
import { MovieContext } from './../MovieContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';



const MovieResults = () => {
    const { movies, nominateMovie, undoNominateMovie, nominatedMovies } = useContext(MovieContext);

    let totalMovies;

    if(nominatedMovies && nominatedMovies.length === 5){
        totalMovies = nominatedMovies.length
    }

    const handleNominate = (movie) => {

        if(nominatedMovies.length < 5){
            const nominatedMovie = {
                Poster: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                ReleaseDate: movie.release_date,
                Title: movie.original_title,
                imdbId: movie.id
            }
    
            nominateMovie(nominatedMovie);
        } 
        
        else {
            swal(" Sorry !", "You have  already nominated 5 movies", "error")
        }
    }

    let nominatedMoviesIds;

    if(nominatedMovies) {
        nominatedMoviesIds = nominatedMovies.map(movie => movie.imdbId)
        console.log(nominatedMoviesIds);
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
                                    {/* <button id={movie.id} className="" onClick={() => handleNominate(movie)}>Nominate</button> */}

                                    {nominatedMoviesIds.length > 0 && nominatedMoviesIds.indexOf(movie.id) !== -1
                                    ? 
                                    <button disabled id={movie.id} className="" >Nominated</button>
                                    : 
                                    <button id={movie.id} className="" onClick={() => handleNominate(movie)}>Nominate</button>      
                                    }
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