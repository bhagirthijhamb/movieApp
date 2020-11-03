import React, { useContext } from 'react';
import { MovieContext } from './../MovieContext';
import NominatedMovies from './NominatedMovies';

const SideBar = () => {

    const { basketOpen } = useContext(MovieContext);

    return(
        <div className={`sidebar ${ basketOpen ? 'sidebar-show' : 'sidebar-hide'}`}>
            <NominatedMovies />
        </div>
    )
}

export default SideBar;