import React from "react";

import "./Button.scss";

export default function Button({ text, type }) {
  return <button className={`button button--${type}`}>{text}</button>;
}
