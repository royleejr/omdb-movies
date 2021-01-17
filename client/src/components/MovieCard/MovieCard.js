import React from "react";
import { Link } from "react-router-dom";

import Button from "../shared/Button/Button";
import "./MovieCard.scss";

export default function MovieCard({
  type,
  movie,
  nominations,
  handleNominations,
  handleRemove,
}) {
  return (
    <article className={`movie-card movie-card--${type}`}>
      <div
        className={`movie-card__poster-container movie-card__poster-container--${type}`}
      >
        <img
          className={`movie-card__poster movie-card__poster--${type}`}
          alt={`Movie poster for ${movie.Title}`}
          src={
            movie.Poster === "N/A"
              ? "https://scifi-movies.com/images/site/en/affiche_nondisponible.jpg"
              : movie.Poster
          }
        ></img>
      </div>
      <div
        className={`movie-card__description movie-card__description--${type}`}
      >
        <span className="movie-card__year">{movie.Year}</span>
        <h2 className="movie-card__title">{movie.Title}</h2>
        {type === "search" ? (
          <>
            <Link className="movie-card__link" to={`/movie/${movie.imdbID}`}>
              <Button text="Movie Details" type="primary" link={"link"} />
            </Link>
            <div className="movie-card__nominate">
              <Button
                text={
                  nominations.find((nom) => nom.imdbID === movie.imdbID)
                    ? "Remove"
                    : "Nominate"
                }
                type="secondary"
                movie={movie}
                handleNominations={handleNominations}
                nominations={nominations}
              />
            </div>
          </>
        ) : (
          <div className="movie-card__links-container">
            <Link
              className="movie-card__link movie-card__link--nomination"
              to={`/movie/${movie.imdbID}`}
            >
              <Button text="Details" type="tertiary" link={"link"} />
            </Link>
            <Button
              text="Remove"
              type="tertiary"
              movie={movie}
              handleRemove={handleRemove}
            />
          </div>
        )}
      </div>
    </article>
  );
}
