import React from "react";
import NavBar from "../containers/NavBar";
import "./aboutUs.css";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="contain">
        <div className="headTitle about">Our story</div>
        <img src="../../images/story.jpg" alt="" className="storyImg" />
        <div className="horizontalCenter hom">hôm</div>
        <div className=" VerticalLeft story">
          was born to fullfil your travel experiences.
          <br />
          Hôm and Home are homophones, which is also our wish to make you feel
          at home. We want to make sure you feel warm welcome when we first
          meet, with delicious Vietnamese-style breakfast every morning and
          excellent services through your stay. <br />
          Hôm is a calming oasis which will make you forget where you are in a
          bustling Vietnamese town.
          <br />
          <div style={{ fontSize: "12px", color: "#87bba2" }}>
            <i>
              <b>
                <u>*** ALL IMAGES AND INFOS ARE FROM DỄ CHỊU HOTEL IN HỘI AN</u>
              </b>
            </i>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
