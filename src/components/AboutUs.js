import React from "react";
import NavBar from "../containers/NavBar";
import "./aboutUs.css";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="contain">
        <img src="../../images/story.jpg" alt="" className="storyImg" />
        <div className="horizontalCenter hom">hôm</div>
        <div className=" horizontalLeft story">
          was born to fullfil your travel experiences.
          <br />
          Hôm and Home are homophones, which is also our wish to make you feel
          at home. We want to make sure you feel warm welcome when we first
          meet, with delicious Vietnamese-style breakfast every morning and
          excellent services through your stay. <br />
          Hôm is a calming oasis which will make you forget where you are in a
          bustling Vietnamese town.
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
