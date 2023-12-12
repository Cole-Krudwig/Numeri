import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div>
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default App;
