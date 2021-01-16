import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";

import MovieCard from "../../components/MovieCard/MovieCard";
import "./SearchPage.scss";

//TODO: MAKE AN H1 SOMEWHERE
export default function SearchPage() {
  const [movieInput, setMovieInput] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const [moviePage, setMoviePage] = useState(1);

  useEffect(() => {
    if (movieInput) {
      fetchMovies();
    }
  }, [movieInput]);

  useEffect(() => {
    if (moviePage !== 1) {
      fetchMovies();
    }
  }, [moviePage]);

  const handleInputChange = (event) => {
    setMovieInput(event.target.value);
    if (moviePage !== 1) {
      setMoviePage(1);
    }
  };

  const fetchMovies = () => {
    axios
      .get(`http://localhost:8080/search/${movieInput}/${moviePage}`)
      .then((response) => {
        if (response.data !== "no data") {
          if (moviePage > 1) {
            setMoviesData(moviesData.concat(response.data));
          } else {
            setMoviesData(response.data);
          }
        } else {
          if (moviesData.length !== 0) {
            setMoviesData([]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changePage = (event) => {
    event.preventDefault();
    setMoviePage(moviePage + 1);
  };

  return (
    <div className="search">
      <section className="search__hero">
        <form className="search__form">
          <input
            className="search__input"
            aria-label="enter movie title"
            type="text"
            id="title"
            name="title"
            placeholder="Search for movie title"
            value={movieInput}
            onChange={handleInputChange}
          ></input>
          <button className="search__search-button" aria-label="submit search">
            <SearchSvg className="search__search-icon" />
          </button>
        </form>
      </section>
      <section className="search__movie-card-container">
        {moviesData
          ? moviesData.map((movie) => (
              <MovieCard type="search" movie={movie} key={movie.imdbID} />
            ))
          : null}
      </section>

      <button className="search__show-more-button" onClick={changePage}>
        Show More
      </button>
    </div>
  );
}
