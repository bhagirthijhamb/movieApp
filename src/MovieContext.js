import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

// Initial state
const initialState = {
    movies: [],
    loading: true
}

// Actions
const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    ADD_MOVIE: 'add-movie',
    DELTE_MOVIE: 'delete-movie',
    OPEN_BASKET: 'open-basket'
}

// Reducer
const reducer = (state, action) => {
    switch(action.type){
        case ACTIONS.MAKE_REQUEST:

        case ACTIONS.GET_DATA:

        case ACTIONS.GET_DATA:

        case ACTIONS.GET_DATA:

        case ACTIONS.GET_DATA:

        case ACTIONS.GET_DATA:

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
            console.log(res)
            // dispatch({ type: ACTIONS.GET_DATA, payload: { movies: res }})
        }).catch(e => {
            dispatch({ type: ACTIONS.ERROR, payload: { error: e }})
        })
    }, [])

    return (
        <MovieContext.Provider value={{ movies: state.movies }}>
            { children }
        </MovieContext.Provider>
    );
}
