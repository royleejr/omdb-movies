import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import MovieCard from "../../components/MovieCard/MovieCard";
import Button from "../../components/shared/Button/Button";
import Banner from "../../components/shared/Banner/Banner";
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieInput]);

  useEffect(() => {
    if (moviePage !== 1) {
      fetchMovies();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviePage]);

  const handleNominations = (movie, text) => {
    const banner = document.getElementsByClassName("banner")[0];
    const bannerText = document.getElementsByClassName("banner__message")[0];
    if (text === "Remove") {
      banner.classList.remove("banner--hide");
      bannerText.innerText = "Successfully removed nomination!";
      setTimeout(() => {
        banner.classList.add("banner--hide");
      }, 2000);
      removeNomination(movie)
        .then((response) => {
          setNominations(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (nominations.length < 4) {
        banner.classList.remove("banner--hide");
        bannerText.innerText = "Successfully added nomination!";
        setTimeout(() => {
          banner.classList.add("banner--hide");
        }, 2000);

        addNomination(movie)
          .then((response) => {
            if (response.data) {
              setNominations(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (nominations.length === 4) {
        banner.classList.remove("banner--hide");
        bannerText.innerText = "You have finished making 5 nominations!";
        setTimeout(() => {
          banner.classList.add("banner--hide");
        }, 2000);

        addNomination(movie)
          .then((response) => {
            if (response.data) {
              setNominations(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        banner.classList.remove("banner--hide");
        bannerText.innerText = "Failed to nominate. You already have 5!";
        setTimeout(() => {
          banner.classList.add("banner--hide");
        }, 2000);
      }
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
          <div className="search__search-container" aria-label="submit search">
            <SearchSvg className="search__search-icon" />
          </div>
        </form>
      </section>

      <section className="search__movie-card-container">
        {!moviesData.length > 0 ? (
          <div className="search__message-container">
            <p className="search__message">
              To get started, please enter a movie title into the search bar
              above.
            </p>
            <p className="search__message-two">
              Nominate up to 5 movies for the upcoming Shoppies!
            </p>
          </div>
        ) : null}
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
      <Banner />
    </div>
  );
}
