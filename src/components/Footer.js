import React from "react";
import { CompassOutlined } from "@ant-design/icons";
import "./footer.css";

const Footer = () => {
  return (
    <div className="horizontalCenter footer">
      <div className="footItem">Contact: +84 90-1177-083</div>
      <a href="https://goo.gl/maps/uGBagYvhB9F2">
        <CompassOutlined style={{ color: "black" }} />
      </a>
      <div className="footItem">Phường Cẩm An, Tp Hội An, tỉnh Quảng Nam</div>
    </div>
  );
};

export default Footer;
