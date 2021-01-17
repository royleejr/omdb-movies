import React from "react";
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
      handleNominations(movie, text);
    } else if (type === "tertiary" && !link) {
      handleRemove(movie);
    }
  };
  return (
    <button
      className={`button button--${type}`}
      onClick={onClick ? onClick : clickHandler}
    >
      {text ? text : "Nominate"}
    </button>
  );
}
