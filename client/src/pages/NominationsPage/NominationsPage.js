import React from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./NominationsPage.scss";

export default function NominationsPage({ nominations }) {
  console.log(nominations.length);
  return (
    <div className="nominations">
      <section className="nominations__hero">
        <h1 className="nominations__heading">YOUR NOMINATIONS</h1>
      </section>
      <section className="nominations__movie-card-container">
        {nominations.length > 0
          ? nominations.map((movie) => {
              return (
                <MovieCard
                  type="nomination"
                  movie={movie}
                  key={`nomination-${movie.imdbID}`}
                />
              );
            })
          : null}
      </section>
    </div>
  );
}
