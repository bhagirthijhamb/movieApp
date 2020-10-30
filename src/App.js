import React from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { MovieProvider } from './MovieContext';
import SideBar from './components/Sidebar';

function App() {
  return (
    <MovieProvider>
      <div className="App">
        <SideBar />
        <Navbar />
        <Header />
        <Main />
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;
