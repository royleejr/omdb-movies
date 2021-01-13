import React, { useEffect } from "react";
import Axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    Axios.get("http://localhost:8080")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
