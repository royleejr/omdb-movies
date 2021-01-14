import React from "react";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import "./SearchPage.scss";

export default function SearchPage() {
  return (
    <div className="search">
      <div className="search__hero">
        <div className="search__input-container">
          <input
            className="search__input"
            type="text"
            id="title"
            name="title"
            placeholder="Search for movie title"
          ></input>
          <button className="search__search-button">
            <SearchSvg className="search__search-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
