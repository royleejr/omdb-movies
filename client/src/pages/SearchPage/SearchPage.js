import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import MovieCard from "../../components/MovieCard/MovieCard";
import Button from "../../components/shared/Button/Button";
import {
  getNominations,
  addNomination,
  removeNomination,
} from "../../utilities/nominationsApiRequests";
import "./SearchPage.scss";

//TODO: MAKE AN H1 SOMEWHERE
export default function SearchPage() {
  const [movieInput, setMovieInput] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const [moviePage, setMoviePage] = useState(1);
  const [nominations, setNominations] = useState([]);
  const [moreAvailable, setMoreAvailable] = useState(true);

  useEffect(() => {
    getNominations()
      .then((response) => {
        setNominations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const handleNominations = (movie, text) => {
    if (text === "Remove") {
      removeNomination(movie)
        .then((response) => {
          setNominations(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      addNomination(movie)
        .then((response) => {
          if (response.data) {
            setNominations(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
        if (response.data.Response !== "False") {
          if (moviePage > 1) {
            setMoviesData(moviesData.concat(response.data));
          } else {
            setMoreAvailable(true);
            setMoviesData(response.data);
          }
        } else {
          if (response.data.Error !== "Too many results." || !response.data) {
            setMoreAvailable(false);
            if (moviePage === 1) {
              setMoviesData([]);
            }
          }
          if (response.data.Error === "Too many results.") {
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
              <MovieCard
                type="search"
                movie={movie}
                key={`search-${movie.imdbID}`}
                handleNominations={handleNominations}
                nominations={nominations}
              />
            ))
          : null}
      </section>
      {moreAvailable && moviesData.length > 0 ? (
        <div className="search__show-button-container">
          <Button onClick={changePage} text="Show More" type="large" />
        </div>
      ) : null}
    </div>
  );
}
