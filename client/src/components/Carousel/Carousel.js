import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";

import { ReactComponent as RightArrow } from "../../assets/icons/right-arrow.svg";

import "./Carousel.scss";

export default function Carousel({ data, handleNominations, nominations }) {
  const [carouselPosition, setCarouselPosition] = useState(1);
  useEffect(() => {
    console.log(data);
  }, []);

  const clickHandler = (event) => {
    event.preventDefault();
    const slider = document.getElementsByClassName("carousel__slider")[0];

    slider.setAttribute(
      "style",
      `transform: translate3d(calc(${-90 * carouselPosition}% - ${
        10 * carouselPosition
      }px), 0, 0); transition: 0.6s ease-in-out;`
    );

    setCarouselPosition(carouselPosition + 1);
  };

  return (
    <div className="carousel">
      <div
        className="carousel__slider"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        {data
          ? data.map((movie) => {
              return (
                <div className="carousel__card">
                  <MovieCard
                    type="carousel"
                    movie={movie}
                    key={`carousel-${movie.imdbID}`}
                    handleNominations={handleNominations}
                    nominations={nominations}
                  />
                </div>
              );
            })
          : null}
      </div>

      <button className="carousel__right-arrow" onClick={clickHandler}>
        <RightArrow className="carousel__right-arrow-icon" />
      </button>
    </div>
  );
}
