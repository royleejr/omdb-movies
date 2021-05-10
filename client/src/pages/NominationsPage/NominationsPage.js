import React, { useState, useEffect } from "react";
import {
  getNominations,
  removeNomination,
} from "../../utilities/nominationsApiRequests";
import MovieCard from "../../components/MovieCard/MovieCard";
import Banner from "../../components/shared/Banner/Banner";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
import "./NominationsPage.scss";

export default function NominationsPage() {
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getNominations()
      .then((response) => {
        setNominations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleRemove = (movie) => {
    const banner = document.getElementsByClassName("banner")[0];
    const bannerText = document.getElementsByClassName("banner__message")[0];
    removeNomination(movie)
      .then((response) => {
        setNominations(response.data);
        banner.classList.remove("banner--hide");
        bannerText.innerText = "Successfully removed nomination!";
        setTimeout(() => {
          banner.classList.add("banner--hide");
        }, 2000);
      })
      .catch((error) => {
        banner.classList.remove("banner--hide");
        bannerText.innerText = `Could not remove. Error: ${error}`;
        setTimeout(() => {
          banner.classList.add("banner--hide");
        }, 2000);
      });
  };

  return (
    <div className="nominations">
      <section className="nominations__hero">
        <h1 className="nominations__heading">YOUR NOMINATIONS</h1>
      </section>
      {!nominations.length > 0 && !loading ? (
        <div className="nominations__message-container">
          <p className="nominations__message">
            You currently have no nominations.
          </p>
          <p className="nominations__message-two">
            Please go back to the search page and look for a movie to nominate!
          </p>
        </div>
      ) : null}
      <section className="nominations__movie-card-container">
        {loading && (
          <div className="nominations__loading">
            <LoadingSpinner />
          </div>
        )}
        {nominations && nominations.length > 0 && !loading
          ? nominations.map((movie) => {
              return (
                <MovieCard
                  type="nomination"
                  movie={movie}
                  key={`nomination-${movie.imdbID}`}
                  handleRemove={handleRemove}
                />
              );
            })
          : null}
      </section>
      <Banner />
    </div>
  );
}
