import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import { getCategoryMovies } from "../../utilities/nominationsApiRequests";
import { ReactComponent as RightArrow } from "../../assets/icons/right-arrow.svg";
import { ReactComponent as LeftArrow } from "../../assets/icons/left-arrow.svg";

import "./Carousel.scss";

export default function Carousel({
  handleNominations,
  nominations,
  category,
  variant,
}) {
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [windowSize, setWindowSize] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.addEventListener("resize", resizeListener);
    resizeListener();

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    getCategoryMovies(category)
      .then((response) => {
        if (response.data.length > 0) {
          setData(response.data);
          setLoading(false);
        } else {
          setErrorMessage("Could not retrieve category data");
          setLoading(false);
        }
      })
      .catch((error) => {
        setErrorMessage(error);
        setLoading(false);
      });
  }, [category]);

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

    slider.setAttribute(
      "style",
      `transform: translate3d(calc(${-100 * (carouselPosition + 1)}% - ${
        22 * (carouselPosition + 1)
      }px), 0, 0);`
    );

    if (windowSize === "mobile") {
      if (carouselPosition === data.length - 2) {
        rightClickButton.classList.add("carousel__arrow--hide");
      }
    } else if (windowSize === "tabletS" || windowSize === "laptop") {
      if (carouselPosition === data.length / 2 - 2) {
        rightClickButton.classList.add("carousel__arrow--hide");
      }
    } else if (windowSize === "desktopS") {
      if (carouselPosition === data.length / 4 - 2) {
        rightClickButton.classList.add("carousel__arrow--hide");
      }
    } else if (windowSize === "desktopXL") {
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

    slider.setAttribute(
      "style",
      `transform: translate3d(calc(${-100 * (carouselPosition - 1)}% - ${
        22 * (carouselPosition - 1)
      }px), 0, 0);`
    );

    if (windowSize === "mobile") {
      if (carouselPosition === data.length - 1) {
        rightClickButton.classList.remove("carousel__arrow--hide");
      }
    } else if (windowSize === "tabletS" || windowSize === "laptop") {
      if (carouselPosition === data.length / 2 - 1) {
        rightClickButton.classList.remove("carousel__arrow--hide");
      }
    } else if (windowSize === "desktopS") {
      if (carouselPosition === data.length / 4 - 1) {
        rightClickButton.classList.remove("carousel__arrow--hide");
      }
    } else if (windowSize === "desktopXL") {
      if (carouselPosition === data.length / 5 - 1) {
        rightClickButton.classList.remove("carousel__arrow--hide");
      }
    }

    if (carouselPosition === 1) {
      leftClickButton.classList.add("carousel__arrow--hide");
    }

    setCarouselPosition(carouselPosition - 1);
  };

  const pagination = () => {
    if (data) {
      if (windowSize === "mobile") {
        let paginationMobileArray = [];
        for (let i = 0; i < data.length; i++) {
          paginationMobileArray.push(
            <li
              id={i === carouselPosition ? "active" : null}
              key={`mobile-${i}`}
            ></li>
          );
        }
        return paginationMobileArray;
      } else if (windowSize === "tabletS" || windowSize === "laptop") {
        let paginationTabletArray = [];
        for (let i = 0; i < data.length / 2; i++) {
          paginationTabletArray.push(
            <li
              id={i === carouselPosition ? "active" : null}
              key={`tablet-${i}`}
            ></li>
          );
        }
        return paginationTabletArray;
      } else if (windowSize === "desktopS" || windowSize === "desktopL") {
        let paginationDesktopSArray = [];
        for (let i = 0; i < data.length / 4; i++) {
          paginationDesktopSArray.push(
            <li
              id={i === carouselPosition ? "active" : null}
              key={`tablet-${i}`}
            ></li>
          );
        }
        return paginationDesktopSArray;
      } else if (windowSize === "desktopXL") {
        let paginationDesktopXLArray = [];
        for (let i = 0; i < data.length / 5; i++) {
          paginationDesktopXLArray.push(
            <li
              id={i === carouselPosition ? "active" : null}
              key={`tablet-${i}`}
            ></li>
          );
        }
        return paginationDesktopXLArray;
      }
    }
  };

  return (
    <>
      <div className="carousel">
        <h2 className="carousel__title">{category}</h2>
        {data.length > 0 && !loading && (
          <ul className="carousel__pagination">{pagination()}</ul>
        )}
        <div className="carousel__container">
          {errorMessage && (
            <div className="carousel__error-message">ERROR: {errorMessage}</div>
          )}
          <div
            className="carousel__slider"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {data && !loading ? (
              data.map((movie) => {
                return (
                  <div
                    className="carousel__card"
                    key={`carousel-${category}-${movie.imdbID}`}
                  >
                    <MovieCard
                      type="carousel"
                      variant={variant}
                      movie={movie}
                      handleNominations={handleNominations}
                      nominations={nominations}
                    />
                  </div>
                );
              })
            ) : (
              <div className="carousel__loading">
                <LoadingSpinner />
              </div>
            )}
          </div>
          {data.length > 0 && !loading && (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
