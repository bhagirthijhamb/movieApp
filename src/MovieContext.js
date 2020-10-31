import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

// Initial state
const initialState = {
    movies: [],
    nominatedMovies: [],
    basketOpen: false,
    loading: true
}

// Actions
const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    ADD_MOVIE: 'add-movie',
    DELTE_MOVIE: 'delete-movie',
    TOGGLE_BASKET: 'toggle-basket'
}

// Reducer
const reducer = (state, action) => {
    switch(action.type){
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, movies: []}
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, movies: action.payload.movies, nominatedMovies: [], basketOpen: false }
        case ACTIONS.NOMINATE_MOVIE:
            console.log('Hello')
                return { ...state, movies: state.movies, nominatedMovies: [action.payload, ...state.nominatedMovies]}
        case ACTIONS.UNDO_NOMINATE_MOVIE:
            return { ...state, nominatedMovies: state.nominatedMovies.filter(movie => movie.id !== action.payload)}
        case ACTIONS.TOGGLE_BASKET:
            return { ...state, movies: state.movies, nominatedMovies: state.nominatedMovies, basketOpen: !state.basketOpen }
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, movies: [] }
        default:
    }
}

// Create context
export const MovieContext = createContext(initialState);

const BASE_URL = 'https://api.themoviedb.org/3/search/movie'

// Provider component
export const MovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: ACTIONS.MAKE_REQUEST });
        axios({
            method: 'GET',
            url: BASE_URL,
            params: {
                api_key: "f012df5d63927931e82fe659a8aaa3ac",
                language: "en-US",
                // query: movie_name,
                query: 'crawl',
                sort_by: "popularity.desc",
                include_adult: "false",
                include_video: "false",
                page: 1
            }
        }).then(res => {
            console.log(res.data.results)
            dispatch({ type: ACTIONS.GET_DATA, payload: { movies: res.data.results }})
        }).catch(e => {
            dispatch({ type: ACTIONS.ERROR, payload: { error: e }})
        })
    }, [])

    // Actions
    const nominateMovie = async(movie) => {
        dispatch({
            type: ACTIONS.NOMINATE_MOVIE,
            payload: movie
        })  
    }
    
    const saveNominatedMovies = () => {
        console.log(state.nominatedMovies)
        localStorage.setItem('nominatedMovies', JSON.stringify(state.nominatedMovies))
    }
    
    useEffect(() => {
        console.log(state.nominatedMovies)
        saveNominatedMovies()   
        
        getNominatedMovies()

    }, [state.nominatedMovies])

    const getNominatedMovies = () => {
        const movies = localStorage.getItem('nominatedMovies');
        console.log(movies);
    }



    const undoNominateMovie = (id) => {
        dispatch({
            type: ACTIONS.UNDO_NOMINATE_MOVIE,
            payload: id
        })
    }

    const toggleBasket = () => {
        dispatch({
            type: ACTIONS.TOGGLE_BASKET
        })
    }

    return (
        <MovieContext.Provider value={{ movies: state.movies, nominatedMovies: state.nominatedMovies, basketOpen: state.basketOpen, nominateMovie, undoNominateMovie, toggleBasket }}>
            { children }
        </MovieContext.Provider>
    );
}
