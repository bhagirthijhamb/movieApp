import React, { useContext } from 'react';
import { MovieContext } from './../MovieContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { useEffect } from 'react';

const MovieResults = () => {
    const { movie, movies, basketOpen, nominateMovie, nominatedMoviesInLS, nominatedMoviesFromLS, nominatedMovies, addToLocalStorage } = useContext(MovieContext);

    useEffect(() => {
        if( nominatedMovies && nominatedMovies.length > 0){
        localStorage.setItem('nominatedMovies', JSON.stringify(nominatedMovies));
        }
        addToLocalStorage(nominatedMovies)
    }, [nominatedMovies])

    useEffect(() => {
        if( nominatedMoviesFromLS && nominatedMoviesFromLS.length >= 0){
        localStorage.setItem('nominatedMovies', JSON.stringify(nominatedMoviesFromLS));
        }
        addToLocalStorage(nominatedMoviesFromLS)
    }, [nominatedMoviesFromLS])


    // useEffect(() => {
    //     if(nominatedMovies && basketOpen === false && nominatedMovies.length === 5){
    //         swal(" 🥳 Congratulations !", "You have nominated 5 movies", "success")
    //     }
    // }, [nominatedMovies])

    const handleNominate = (movie) => {
        if(!basketOpen){
            if(nominatedMovies.length < 5){
                const nominatedMovie = {
                    Poster: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                    ReleaseDate: movie.release_date,
                    Title: movie.original_title,
                    imdbId: movie.id
                }
                nominateMovie(nominatedMovie);

                if(nominatedMovies.length === 4){
                    swal(" 🥳 Congratulations !", "You have nominated 5 movies", "success")
                }
            } 
            else {
                swal(" Sorry !", "You have  already nominated 5 movies", "error")
            }
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
                    {/* {!basketOpen &&  */}
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
                    {/* } */}
                </div>
            </div>
        </section>
    )
}

export default MovieResults;