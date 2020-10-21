import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Main = props => {
    return (
        <main>
            <section>
                <div className="searchMovie_container">
                    <div className="searchMovie_backgroundPattern">
                        <div className="wrapper">
                            <h2>Search Movie</h2>

                            <ul className="instructions">
                                <li className="instructionsItem">
                                    <span>1</span>
                                    <p>Search for a movie title</p>
                                    {/* <img src={require('./../assets/Vertical-wavy-line-test.svg.png')} alt=""/> */}
                                </li>
                                <li className="instructionsItem">
                                    <span>2</span>
                                    <p>Click nominate to add your movie (you may pick a max of 5 movies).</p>
                                </li>
                                <li className="instructionsItem">
                                    <span>3</span>
                                    <p>Change your mind? Click the film icon and click remove to edit your list.</p>
                                </li>
                                <li className="instructionsItem">
                                    <span>4</span>
                                    <p>Once you're satisfied with your nominees list, you're done!</p>
                                </li>
                            </ul>
                            <form action="inout">
                                <label htmlFor="searchMovie">Search Movie</label>
                                <input type="search" id="searchMovie" name="searchMovie" placeholder="Enter your movie title..." required value/>
                                <button type="submit" aria-label="submit search">
                                    <FontAwesomeIcon icon={faSearch} className="search_icon"/>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Main;