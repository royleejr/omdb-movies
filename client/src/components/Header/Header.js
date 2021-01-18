import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as TrophyIcon } from "../../assets/icons/trophy.svg";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <HomeIcon className="header__icon" />
      </Link>

      <Link to="/nominations" className="header__link">
        <TrophyIcon className="header__icon" />
      </Link>
    </header>
  );
}
