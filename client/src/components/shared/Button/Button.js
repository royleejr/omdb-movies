import React from "react";
import "./Button.scss";

export default function Button({
  text,
  type,
  movie,
  handleNominations,
  handleRemove,
  link,
}) {
  const clickHandler = () => {
    if (type === "secondary" || type === "large") {
      console.log("IT IS");
      handleNominations(movie, text);
    } else if (type === "tertiary" && !link) {
      handleRemove(movie);
    }
  };
  return (
    <button className={`button button--${type}`} onClick={clickHandler}>
      {text ? text : "Nominate"}
    </button>
  );
}
