import React, { useContext } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { MovieContext } from './../MovieContext';


const Content = () => {
    const { basketOpen } = useContext(MovieContext);

    return(
        <div className={`content ${ basketOpen ? 'slideContent' : ''}`}>
          <Navbar />
          <Header />
          <Main />
          <Footer />
        </div>
    )
}

export default Content;