import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getNominations,
  addNomination,
  removeNomination,
} from "../../utilities/nominationsApiRequests";
import Button from "../../components/shared/Button/Button";
import { ReactComponent as Timer } from "../../assets/icons/timer.svg";
import { ReactComponent as Imdb } from "../../assets/icons/imdb.svg";
import { ReactComponent as Tomato } from "../../assets/icons/tomato.svg";
import { ReactComponent as Metacritic } from "../../assets/icons/metacritic.svg";
import "./MovieDetailsPage.scss";

export default function MovieDetailsPage({ match }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoHeight, setInfoHeight] = useState(0);
  const [movieDetails, setMovieDetails] = useState({});
  const [nominations, setNominations] = useState([]);

  useEffect(() => {
    const moreInfoContainer = document.getElementsByClassName(
      "movie-details__more-info"
    )[0];
    setInfoHeight(moreInfoContainer.clientHeight);
    moreInfoContainer.setAttribute("style", "max-height: 0px");

    const getMovie = axios.get(
      `http://localhost:8080/search/id/${match.params.movieId}`
    );

    Promise.all([getMovie, getNominations()]).then((response) => {
      if (response[0].status === 200) {
        setMovieDetails(response[0].data);
      }
      if (response[1].status === 200) {
        setNominations(response[1].data);
      }
    });
  }, []);

  useEffect(() => {
    const moreInfoContainer = document.getElementsByClassName(
      "movie-details__more-info"
    )[0];

    if (infoOpen) {
      moreInfoContainer.setAttribute(
        "style",
        `max-height: ${infoHeight + 500}px`
      );
    } else {
      moreInfoContainer.setAttribute("style", `max-height: 0`);
    }
  }, [infoOpen]);

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

  const toggleInfo = () => {
    setInfoOpen(!infoOpen);
  };

  return (
    <div className="movie-details">
      <section className="movie-details__hero"></section>
      <section className="movie-details__card">
        <div className="movie-details__info-container">
          <div className="movie-details__top-container">
            <div className="movie-details__poster-container">
              <img
                className="movie-details__poster"
                src={movieDetails.Poster ? movieDetails.Poster : null}
                alt="movie poster"
              ></img>
            </div>

            <div className="movie-details__short-info-container">
              <div className="movie-details__year">
                {movieDetails.Year ? movieDetails.Year : "N/A"}
              </div>
              <h1 className="movie-details__title">
                {movieDetails.Title ? movieDetails.Title : "N/A"}
              </h1>
              <div className="movie-details__rating">{`Rated ${
                movieDetails.Rated ? movieDetails.Rated : "N/A"
              }`}</div>
              <div className="movie-details__duration-container">
                <Timer className="movie-details__timer-icon" />
                <div className="movie-details__duration">
                  {movieDetails.Runtime}
                </div>
              </div>
              <div className="movie-details__genre">
                {movieDetails.Genre ? movieDetails.Genre : "N/A"}
              </div>
            </div>
          </div>
          <div className="movie-details__rating-container">
            <div className="movie-details__imdb-container">
              <Imdb className="movie-details__imdb-icon" />
              <div className="movie-details__all-rating">
                {movieDetails.imdbRating ? movieDetails.imdbRating : "N/A"}{" "}
                &#9733;
              </div>
            </div>
            <div className="movie-details__imdb-container">
              <Tomato className="movie-details__tomato-icon" />
              <div className="movie-details__all-rating">
                {movieDetails.Ratings ? movieDetails.Ratings[1].Value : "N/A"}
              </div>
            </div>
            <div className="movie-details__imdb-container">
              <Metacritic className="movie-details__meta-icon" />
              <div className="movie-details__all-rating">
                {movieDetails.Ratings ? movieDetails.Ratings[2].Value : "N/A"}
              </div>
            </div>
          </div>
          <p className="movie-details__plot">
            {movieDetails.Plot ? movieDetails.Plot : "N/A"}
          </p>
          <div className="movie-details__more-info-container">
            <button
              className="movie-details__more-info-button"
              onClick={toggleInfo}
            >
              {infoOpen ? "- Less Info" : "+ More Info"}
            </button>
            <div className="movie-details__more-info">
              <div className="movie-details__cast">
                <span className="movie-details__bold">Cast:</span>{" "}
                {movieDetails.Actors ? movieDetails.Actors : "N/A"}
              </div>
              <div className="movie-details__cast">
                <span className="movie-details__bold">Director(s):</span>{" "}
                {movieDetails.Director ? movieDetails.Director : "N/A"}
              </div>
              <div className="movie-details__cast">
                <span className="movie-details__bold">Writer(s):</span>{" "}
                {movieDetails.Writer ? movieDetails.Writer : "N/A"}
              </div>
              <div className="movie-details__cast">
                <span className="movie-details__bold">Award(s):</span>{" "}
                {movieDetails.Awards ? movieDetails.Awards : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="movie-details__buttons-container">
        <Button
          type="large"
          movie={movieDetails}
          handleNominations={handleNominations}
          text={
            nominations &&
            nominations.find((nom) => nom.imdbID === movieDetails.imdbID)
              ? "Remove"
              : "Nominate"
          }
        />
      </div>
    </div>
  );
}
