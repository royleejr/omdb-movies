import React from "react";
import throttle from "../../../utilities/throttle";
import "./Button.scss";

export default function Button({
  text,
  type,
  movie,
  handleNominations,
  handleRemove,
  link,
  onClick,
}) {
  const clickHandler = () => {
    if (type === "secondary" || type === "large") {
      throttle(1000, handleNominations(movie, text));
    } else if (type === "tertiary" && !link) {
      throttle(1000, handleRemove(movie));
    }
  };
  return (
    <button
      className={`button button--${type}`}
      onClick={onClick ? throttle(1000, onClick) : throttle(1000, clickHandler)}
    >
      {text ? text : "Nominate"}
    </button>
  );
}
