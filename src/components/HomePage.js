import React from "react";
import "./homePage.css";
import NavBar from "../containers/NavBar";

const HomePage = () => {
  return (
    <div>
      <div className="homePage">
        <img className="bottom" src="../../images/hoian.jpg" alt="" />
        <img className="top" src="../../images/hoian2.jpg" alt="" />
      </div>
      <div className="homePagelayer">
        <NavBar style={{ color: "#f4f1de" }} />
        <div className="welcomeNote">
          Welcome to <i>hôm</i> !
          <br />
          We're here to fullfil your travel experiences.
        </div>
      </div>
    </div>
  );
};

export default HomePage;
