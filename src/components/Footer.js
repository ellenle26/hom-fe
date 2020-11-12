import React from "react";
import { CompassOutlined } from "@ant-design/icons";
import "./footer.css";

const Footer = () => {
  return (
    <div className="horizontalCenter footer">
      <div className="footItem">Contact: (+84) 915 697 696</div>
      <a href="https://goo.gl/maps/uGBagYvhB9F2">
        <CompassOutlined style={{ color: "black" }} />
      </a>
      <div className="footItem">Tp Hội An, tỉnh Quảng Nam</div>
    </div>
  );
};

export default Footer;
