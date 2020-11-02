import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

// Initial state
const initialState = {
    movies: [],
    // nominatedMovies: [],
    nominatedMovies: JSON.parse(localStorage.getItem('nominatedMovies')),
    nominatedMoviesFromLS: JSON.parse(localStorage.getItem('nominatedMovies')),
    basketOpen: false,
    loading: true
}

// Actions
const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    NOMINATE_MOVIE: 'add-movie',
    UNDO_NOMINATE_MOVIE: 'delete-movie',
    TOGGLE_BASKET: 'toggle-basket',
    ADD_TO_LOCAL_STORAGE: 'add-to-local-storage',
    GET_FROM_LS: 'get-from-LS'
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
            console.log(action.payload, state.nominatedMovies, state.nominatedMoviesInLS)
            return { ...state, nominatedMoviesFromLS: state.nominatedMoviesFromLS.filter(movie => movie.imdbId !== action.payload)}
        case ACTIONS.TOGGLE_BASKET:
            return { ...state, movies: state.movies, nominatedMovies: state.nominatedMovies, basketOpen: !state.basketOpen }
        case ACTIONS.ADD_TO_LOCAL_STORAGE:
            return { ...state, movies: state.movies, nominatedMovies: state.nominatedMovies, basketOpen: state.basketOpen, nominatedMovies: action.payload}
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, movies: [] }
        case ACTIONS.GET_FROM_LS:
            return {...state, movies: state.movies, nominatedMovies: state.nominatedMovies, basketOpen: state.basketOpen, nominatedMoviesFromLS: action.payload }
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
    const nominateMovie = (movie) => {
        dispatch({
            type: ACTIONS.NOMINATE_MOVIE,
            payload: movie
        })  
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

    const addToLocalStorage = (nominatedMovies) => {
        dispatch({
            type: ACTIONS.ADD_TO_LOCAL_STORAGE,
            payload: nominatedMovies
        })
    }

    const getFromLocalStorage = (moviesFromLS) => {
        dispatch({
            type: ACTIONS.GET_FROM_LS,
            payload: moviesFromLS
        })
    }

    return (
        <MovieContext.Provider value={{ movies: state.movies, nominatedMovies: state.nominatedMovies, basketOpen: state.basketOpen, nominatedMoviesFromLS: state.nominatedMoviesFromLS, nominateMovie, undoNominateMovie, toggleBasket, addToLocalStorage, getFromLocalStorage }}>
            { children }
        </MovieContext.Provider>
    );
}
