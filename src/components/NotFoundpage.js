import React from "react";
import { Link } from "react-router-dom";

const NotFoundpage = () => {
  return (
    <div className="verticalCenter notFoundPage">
      <div>404</div>
      <br />
      <Link to="/">
        <img alt="" src="../../images/error.png" style={{ width: "600px" }} />
      </Link>
      <br />
      <div>The page you requested could not be found</div>
    </div>
  );
};

export default NotFoundpage;
