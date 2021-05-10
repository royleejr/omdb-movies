import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";

import { ReactComponent as RightArrow } from "../../assets/icons/right-arrow.svg";
import { ReactComponent as LeftArrow } from "../../assets/icons/left-arrow.svg";

import "./Carousel.scss";

export default function Carousel({
  data,
  handleNominations,
  nominations,
  category,
}) {
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [windowSize, setWindowSize] = useState("");

  useEffect(() => {
    window.addEventListener("resize", resizeListener);
    resizeListener();
  }, []);

  const resizeListener = () => {
    let windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      setWindowSize("mobile");
    } else if (windowWidth < 1024 && windowWidth >= 768) {
      setWindowSize("tabletS");
    } else if (windowWidth < 1280 && windowWidth >= 1024) {
      setWindowSize("laptop");
    } else if (windowWidth < 1440 && windowWidth >= 1280) {
      setWindowSize("desktopS");
    } else if (windowWidth < 1680 && windowWidth >= 1440) {
      setWindowSize("desktopL");
    } else {
      setWindowSize("desktopXL");
    }
  };

  const rightClickHandler = () => {
    const slider = document.getElementsByClassName("carousel__slider")[0];
    const rightClickButton = document.getElementsByClassName(
      "carousel__arrow--right"
    )[0];
    const leftClickButton = document.getElementsByClassName(
      "carousel__arrow--left"
    )[0];

    if (windowSize === "mobile") {
      slider.setAttribute(
        "style",
        `transform: translate3d(calc(${-90 * (carouselPosition + 1)}% - ${
          22 * (carouselPosition + 1)
        }px), 0, 0);`
      );
      if (carouselPosition === data.length - 2) {
        rightClickButton.classList.add("carousel__arrow--hide");
      }
    } else if (windowSize === "tabletS" || windowSize === "laptop") {
      slider.setAttribute(
        "style",
        `transform: translate3d(calc(${-90 * (carouselPosition + 1)}% - ${
          44 * (carouselPosition + 1)
        }px), 0, 0);`
      );
      if (carouselPosition === data.length / 2 - 2) {
        rightClickButton.classList.add("carousel__arrow--hide");
      }
    } else if (windowSize === "desktopS") {
      slider.setAttribute(
        "style",
        `transform: translate3d(calc(${-96 * (carouselPosition + 1)}% - ${
          97 * (carouselPosition + 1)
        }px), 0, 0);`
      );
      if (carouselPosition === data.length / 4 - 2) {
        rightClickButton.classList.add("carousel__arrow--hide");
      }
    } else if (windowSize === "desktopL") {
      slider.setAttribute(
        "style",
        `transform: translate3d(calc(${-94 * (carouselPosition + 1)}% - ${
          88 * (carouselPosition + 1)
        }px), 0, 0);`
      );
      if (carouselPosition === data.length / 4 - 2) {
        rightClickButton.classList.add("carousel__arrow--hide");
      }
    } else if (windowSize === "desktopXL") {
      slider.setAttribute(
        "style",
        `transform: translate3d(calc(${-95 * (carouselPosition + 1)}% - ${
          115 * (carouselPosition + 1)
        }px), 0, 0);`
      );
      if (carouselPosition === data.length / 5 - 2) {
        rightClickButton.classList.add("carousel__arrow--hide");
      }
    }

    if (carouselPosition === 0) {
      leftClickButton.classList.remove("carousel__arrow--hide");
    }

    setCarouselPosition(carouselPosition + 1);
  };

  const leftClickHandler = () => {
    const slider = document.getElementsByClassName("carousel__slider")[0];
    const rightClickButton = document.getElementsByClassName(
      "carousel__arrow--right"
    )[0];
    const leftClickButton = document.getElementsByClassName(
      "carousel__arrow--left"
    )[0];

    if (windowSize === "mobile") {
      slider.setAttribute(
        "style",
        `transform: translate3d(calc(${-90 * (carouselPosition - 1)}% - ${
          22 * (carouselPosition - 1)
        }px), 0, 0);`
      );
      if (carouselPosition === data.length - 1) {
        rightClickButton.classList.remove("carousel__arrow--hide");
      }
    } else if (windowSize === "tabletS" || windowSize === "laptop") {
      slider.setAttribute(
        "style",
        `transform: translate3d(calc(${-90 * (carouselPosition - 1)}% - ${
          44 * (carouselPosition - 1)
        }px), 0, 0);`
      );
      if (carouselPosition === data.length / 2 - 1) {
        rightClickButton.classList.remove("carousel__arrow--hide");
      }
    } else if (windowSize === "desktopS") {
      slider.setAttribute(
        "style",
        `transform: translate3d(calc(${-96 * (carouselPosition - 1)}% - ${
          97 * (carouselPosition - 1)
        }px), 0, 0);`
      );
      if (carouselPosition === data.length / 4 - 1) {
        rightClickButton.classList.remove("carousel__arrow--hide");
      }
    } else if (windowSize === "desktopL") {
      slider.setAttribute(
        "style",
        `transform: translate3d(calc(${-96 * (carouselPosition - 1)}% - ${
          97 * (carouselPosition - 1)
        }px), 0, 0);`
      );
      if (carouselPosition === data.length / 4 - 1) {
        rightClickButton.classList.remove("carousel__arrow--hide");
      }
    } else if (windowSize === "desktopXL") {
      slider.setAttribute(
        "style",
        `transform: translate3d(calc(${-95 * (carouselPosition - 1)}% - ${
          115 * (carouselPosition - 1)
        }px), 0, 0);`
      );
      if (carouselPosition === data.length / 5 - 1) {
        rightClickButton.classList.remove("carousel__arrow--hide");
      }
    }

    if (carouselPosition === 1) {
      leftClickButton.classList.add("carousel__arrow--hide");
    }

    setCarouselPosition(carouselPosition - 1);
  };

  return (
    <>
      <h2 className="carousel__title">{category}</h2>
      <div className="carousel">
        <div
          className="carousel__slider"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {data
            ? data.map((movie) => {
                return (
                  <div
                    className="carousel__card"
                    key={`carousel-${movie.imdbID}`}
                  >
                    <MovieCard
                      type="carousel"
                      movie={movie}
                      handleNominations={handleNominations}
                      nominations={nominations}
                    />
                  </div>
                );
              })
            : null}
        </div>
        <button
          className="carousel__arrow carousel__arrow--left carousel__arrow--hide"
          onClick={leftClickHandler}
        >
          <LeftArrow className="carousel__arrow-icon" />
        </button>

        <button
          className="carousel__arrow carousel__arrow--right"
          onClick={rightClickHandler}
        >
          <RightArrow className="carousel__arrow-icon" />
        </button>
      </div>
    </>
  );
}
