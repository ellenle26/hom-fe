import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { useDispatch, useSelector } from "react-redux";
import authActions from "./redux/actions/authActions";
import { LoadingOutlined } from "@ant-design/icons";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);

  return (
    <>
      {isAuthorized === null ? (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            position: "absolute",
            top: "40vh",
          }}
        >
          <LoadingOutlined style={{ fontSize: "40px" }} spin />
        </div>
      ) : (
        <Router>
          <Routes />
        </Router>
      )}
    </>
  );
}

export default App;
