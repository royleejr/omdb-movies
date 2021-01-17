import React, { useState, useEffect } from "react";
import {
  getNominations,
  removeNomination,
} from "../../utilities/nominationsApiRequests";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./NominationsPage.scss";

export default function NominationsPage() {
  const [nominations, setNominations] = useState([]);

  useEffect(() => {
    getNominations()
      .then((response) => {
        setNominations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRemove = (movie) => {
    removeNomination(movie)
      .then((response) => {
        setNominations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="nominations">
      <section className="nominations__hero">
        <h1 className="nominations__heading">YOUR NOMINATIONS</h1>
      </section>
      <section className="nominations__movie-card-container">
        {nominations && nominations.length > 0
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
    </div>
  );
}
