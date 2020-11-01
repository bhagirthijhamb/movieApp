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

    // async function checkCountMovies(nominatedMovie){
    //     const count = await nominateMovie(nominatedMovie);
    //     const result = await count;
    //     // return count;

    // }

    const handleNominate = (movie) => {

        if(nominatedMovies.length < 5){
            const nominatedMovie = {
                Poster: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                ReleaseDate: movie.release_date,
                Title: movie.original_title,
                imdbId: movie.id
            }
    
            // checkCountMovies(nominatedMovie);
            // console.log(nominatedMovies.length);
            nominateMovie(nominatedMovie);

            if(nominatedMovies.length === 5){
                swal(" 🥳 Congratulations !", "You have nominated 5 movies", "success")
            } 
        } 
        
        else {
            swal(" 🥳 Congratulations !", "You have  already nominated 5 movies", "error")
        }


        
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
            {/* <div>
                {totalMovies === 5 ?
                    swal(" 🥳 Congratulations !", "You have nominated 5 movies", "success") : null
                }
            </div> */}
            
            {/* {totalMovies === 5 ? */}
            
            
        </section>
    )
}

export default MovieResults;