import React from "react";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";

import MovieCard from "../../components/MovieCard/MovieCard";
import "./SearchPage.scss";

//TODO: MAKE AN H1 SOMEWHERE
export default function SearchPage() {
  return (
    <div className="search">
      <section className="search__hero">
        <form className="search__form">
          <input
            className="search__input"
            aria-label="enter movie title"
            type="text"
            id="title"
            name="title"
            placeholder="Search for movie title"
          ></input>
          <button className="search__search-button" aria-label="submit search">
            <SearchSvg className="search__search-icon" />
          </button>
        </form>
      </section>
      <section className="search__movie-card-container">
        <MovieCard type="search" imageAlt="poster of avengers movie" />
      </section>
    </div>
  );
}
