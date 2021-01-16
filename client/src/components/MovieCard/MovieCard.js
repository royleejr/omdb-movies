import React from "react";
import { Link } from "react-router-dom";

import Button from "../shared/Button/Button";
import "./MovieCard.scss";

export default function MovieCard({ type, imageAlt }) {
  return (
    <article className={`movie-card movie-card--${type}`}>
      <div
        className={`movie-card__poster-container movie-card__poster-container--${type}`}
      >
        <img
          className={`movie-card__poster movie-card__poster--${type}`}
          alt={imageAlt}
          src="https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
        ></img>
      </div>
      <div
        className={`movie-card__description movie-card__description--${type}`}
      >
        "<span className="movie-card__year">2014</span>
        <h2 className="movie-card__title">Guardians of the Galaxy</h2>
        {type === "search" ? (
          <>
            <Link className="movie-card__link">
              <Button text="Movie Details" type="primary" />
            </Link>
            <div className="movie-card__nominate">
              <Button text="Nominate" type="secondary" />
            </div>
          </>
        ) : (
          <div className="movie-card__links-container">
            <Link className="movie-card__link movie-card__link--nomination">
              <Button text="Details" type="tertiary" />
            </Link>
            <Button text="Nominate" type="tertiary" />
          </div>
        )}
      </div>
    </article>
  );
}
