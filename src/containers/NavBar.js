import React, { useState, useEffect } from "react";
import {
  UpOutlined,
  LoginOutlined,
  FacebookOutlined,
  InstagramOutlined,
  InfoCircleOutlined,
  BorderOutlined,
  CalendarOutlined,
  BlockOutlined,
  LogoutOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../redux/actions/authActions";
import "./navBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  let [message, setMessage] = useState("");
  const logOut = () => {
    dispatch(authActions.logout());
    history.push("/");
  };

  const gotoPage = () => {
    if (user && user.authLevel === "user") {
      history.push("/me");
    } else if (user && user.authLevel === "staff") {
      history.push("/staff/bookings");
    } else {
      history.push("/owner/users");
    }
  };

  return (
    <>
      <div className="large horizontalCenter navBar">
        <div className="horizontalCenter leftNav">
          <div className="logo" onClick={() => history.push("/")}>
            hôm
          </div>
        </div>
        <div className="verticalCenter centerNav">
          <div className="horizontalJustify centerTop">
            {user ? (
              <>
                <div className="auth" onClick={() => gotoPage()}>
                  <SmileOutlined />
                  &nbsp;Hi! {user.name}
                </div>
                <div className="auth" onClick={() => logOut()}>
                  <LogoutOutlined />
                  &nbsp;Log out
                </div>
              </>
            ) : (
              <>
                <div className="auth" onClick={() => history.push("/register")}>
                  <UpOutlined /> &nbsp; Join us
                </div>
                <div className="auth" onClick={() => history.push("/login")}>
                  <LoginOutlined /> &nbsp; Log in
                </div>
              </>
            )}
          </div>
          <div className="horizontalJustify centerBttm">
            <div className="item">
              <div className="item1">About us</div>
              <div className="item2" onClick={() => history.push("/about")}>
                <InfoCircleOutlined style={{ fontSize: "20px" }} />
              </div>
            </div>
            <div className="item">
              <div className="item1">ROOMS</div>
              <div
                className="item2"
                onClick={() => {
                  history.push("/rooms");
                }}
              >
                <BorderOutlined style={{ fontSize: "20px" }} />
              </div>
            </div>
            {/* <div className="item">
            <div className="item1">TOURS</div>
            <div className="item2">
            <LineOutlined />
            </div>
          </div> */}
            <div className="item">
              <div className="item1">EVENTS</div>
              <div className="item2" onClick={() => history.push("/events")}>
                <CalendarOutlined style={{ fontSize: "20px" }} />
              </div>
            </div>
            <div className="item">
              <div className="item1">BOOKING</div>
              <div
                className="item2"
                onClick={() => {
                  history.push("/bookings/user");
                }}
              >
                <BlockOutlined style={{ fontSize: "20px" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="verticalCenter rightNav">
          <div>
            <FacebookOutlined className="social" />
            &nbsp;
            <InstagramOutlined className="social" />
          </div>
        </div>
      </div>
      <div className="small verticalCenter navBarSmall">
        <div className="topNav horizontalJustify">
          {user ? (
            <>
              <div className="auth" onClick={() => gotoPage()}>
                <SmileOutlined />
                &nbsp;Hi! {user.name}
              </div>
              <div className="logo" onClick={() => history.push("/")}>
                hôm
              </div>
              <div className="auth" onClick={() => logOut()}>
                <LogoutOutlined />
                &nbsp;Log out
              </div>
            </>
          ) : (
            <>
              <div className="auth" onClick={() => history.push("/register")}>
                <UpOutlined /> &nbsp; Join us
              </div>
              <div className="logo" onClick={() => history.push("/")}>
                hôm
              </div>
              <div className="auth" onClick={() => history.push("/login")}>
                <LoginOutlined /> &nbsp; Log in
              </div>
            </>
          )}
        </div>
        <div className="bttmNav horizontalJustify">
          <div className="horizontalJustify centerBttm">
            <div className="item" style={{ borderLeft: "none" }}>
              <div className="item1">About us</div>
              <div className="item2" onClick={() => history.push("/about")}>
                <InfoCircleOutlined style={{ fontSize: "20px" }} />
              </div>
            </div>
            <div className="item">
              <div className="item1">ROOMS</div>
              <div
                className="item2"
                onClick={() => {
                  history.push("/rooms");
                }}
              >
                <BorderOutlined style={{ fontSize: "20px" }} />
              </div>
            </div>
            {/* <div className="item">
            <div className="item1">TOURS</div>
            <div className="item2">
            <LineOutlined />
            </div>
          </div> */}
            <div className="item">
              <div className="item1">EVENTS</div>
              <div className="item2" onClick={() => history.push("/events")}>
                <CalendarOutlined style={{ fontSize: "20px" }} />
              </div>
            </div>
            <div className="item">
              <div className="item1">BOOKING</div>
              <div
                className="item2"
                onClick={() => history.push("/bookings/user")}
              >
                <BlockOutlined style={{ fontSize: "20px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="foot horizontalCenter">
        <FacebookOutlined className="social" /> &nbsp;
        <InstagramOutlined className="social" />
      </div> */}
    </>
  );
};

export default NavBar;
