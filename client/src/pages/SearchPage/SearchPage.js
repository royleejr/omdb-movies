import React, { useState, useEffect } from "react";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import MovieCard from "../../components/MovieCard/MovieCard";
import Button from "../../components/shared/Button/Button";
import Banner from "../../components/shared/Banner/Banner";
import Carousel from "../../components/Carousel/Carousel";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
import {
  getNominations,
  addNomination,
  removeNomination,
} from "../../utilities/nominationsApiRequests";
import { cancelApiRequests } from "../../utilities/cancelApiRequests";
import "./SearchPage.scss";

//TODO: MAKE AN H1 SOMEWHERE
export default function SearchPage() {
  const [movieInput, setMovieInput] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const [moviePage, setMoviePage] = useState(1);
  const [nominations, setNominations] = useState([]);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    if (movieInput !== "") {
      fetchMovies();
    } else {
      setMovieInput("");
      setMoviePage(1);
      setErrorMessage("");
      setMoviesData([]);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieInput]);

  useEffect(() => {
    if (moviePage !== 1) {
      fetchMovies();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviePage]);

  const bannerShow = (type, error) => {
    const banner = document.getElementsByClassName("banner")[0];
    const bannerText = document.getElementsByClassName("banner__message")[0];
    if (!error) {
      banner.classList.remove("banner--hide");
      if (type === "remove") {
        bannerText.innerText = "Successfully removed nomination!";
      } else if (type === "add") {
        bannerText.innerText = "Successfully added nomination!";
      } else if (type === "finished") {
        bannerText.innerText = "You have finished making 5 nominations!";
      } else if (type === "full") {
        bannerText.innerText = "Failed to nominate. You already have 5!";
      }
      setTimeout(() => {
        banner.classList.add("banner--hide");
      }, 2000);
    } else {
      banner.classList.remove("banner--hide");
      bannerText.innerText = `Failed to remove. error: ${error}`;
      setTimeout(() => {
        banner.classList.add("banner--hide");
      }, 2000);
    }
  };

  const handleNominations = (movie, text) => {
    if (text === "Remove") {
      removeNomination(movie)
        .then((response) => {
          setNominations(response.data);
          bannerShow("remove");
        })
        .catch((error) => {
          bannerShow("remove", error);
        });
    } else {
      if (nominations.length < 4) {
        addNomination(movie)
          .then((response) => {
            if (response.data) {
              setNominations(response.data);
              bannerShow("add");
            }
          })
          .catch((error) => {
            bannerShow("add", error);
          });
      } else if (nominations.length === 4) {
        addNomination(movie)
          .then((response) => {
            if (response.data) {
              setNominations(response.data);
              bannerShow("finished");
            }
          })
          .catch((error) => {
            bannerShow("finished", error);
          });
      } else {
        bannerShow("full");
      }
    }
  };

  const handleInputChange = (event) => {
    setMovieInput(event.target.value);
    if (moviePage !== 1) {
      setMoviePage(1);
    }
  };

  const fetchMovies = async () => {
    setLoading(true);
    const res = await cancelApiRequests(
      `https://omdb-movies-server.onrender.com/search/${movieInput}/${moviePage}`
    );
    if (res) {
      setLoading(false);
      if (res.Response !== "False") {
        setErrorMessage("");
        if (moviePage > 1) {
          setMoviesData(moviesData.concat(res));
        } else {
          setMoreAvailable(true);
          setMoviesData(res);
        }
      } else {
        if (res.Error !== "Too many results." || !res) {
          setErrorMessage(res.Error);
          setMoreAvailable(false);
          if (moviePage === 1) {
            setMoviesData([]);
          }
        } else if (res.Error === "Too many results.") {
          setMoviesData([]);
          setErrorMessage(res.Error);
        } else if (res.Error === "limit reached!") {
          setMoviesData([]);
          setErrorMessage(
            "The daily request limit for the OMDB API has been reached."
          );
        }
      }
    } else {
      setLoading(false);
      setMoviesData([]);
      setErrorMessage("");
    }
  };

  const changePage = (event) => {
    event.preventDefault();
    setMoviePage(moviePage + 1);
  };

  return (
    <div className="search">
      <section className="search__hero">
        <div className="search__form">
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
        </div>
      </section>

      {!moviesData.length > 0 && !loading && !movieInput ? (
        <>
          <div className="search__message-container">
            <p className="search__message">
              To get started, please enter a movie title into the search bar
              above.
            </p>
            <p className="search__message-two">
              You can press the Movie Details button to learn more about the
              movie.
            </p>
            <p className="search__message">
              Nominate up to 5 movies for the upcoming Shoppies!
            </p>
          </div>

          <Carousel
            category={"Top Rated"}
            variant={1}
            id={0}
            nominations={nominations}
            handleNominations={handleNominations}
          />
          <Carousel
            category={"Action"}
            variant={2}
            id={1}
            nominations={nominations}
            handleNominations={handleNominations}
          />
          <Carousel
            category={"Comedy"}
            variant={1}
            id={2}
            nominations={nominations}
            handleNominations={handleNominations}
          />
          <Carousel
            category={"Animated"}
            variant={2}
            id={3}
            nominations={nominations}
            handleNominations={handleNominations}
          />
        </>
      ) : null}
      {!loading && errorMessage && !moviesData.length > 0 && movieInput && (
        <div className="search__message-container">
          <p className="search__message-two">ERROR: {errorMessage}</p>
        </div>
      )}
      <section className="search__movie-card-container">
        {moviesData && moviesData.length > 0
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
        {loading ? (
          <div className="search__loading-spinner">
            <LoadingSpinner />
          </div>
        ) : null}
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
