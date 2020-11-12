import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import bookingActions from "../redux/actions/bookingActions";
import moment from "moment";

const MePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const bookingList = useSelector((state) => state.booking.bookingList);

  const getBookings = () => {
    dispatch(bookingActions.getBookings());
  };

  const bookings = bookingList.filter((item) => item.user._id === user._id);

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container verticalCenter">
        <div className="headTitle">Hello there!</div>
        <img
          src={user.avatarUrl}
          alt=""
          style={{
            width: "100px",
            border: "2px solid black",
            borderRadius: "50px",
          }}
        />
        <div>{user.email}</div> <br />
        <h3>
          <u>Booking history</u>
        </h3>
        {console.log(bookings)}
        {bookings.length == 0 ? (
          <div>You haven't stay at hôm yet!</div>
        ) : (
          bookings.map((b) => (
            <div className="horizontalCenter me">
              <img
                src={b.room.roomImages[1]}
                alt=""
                style={{ width: "60px", marginRight: "10px" }}
              />
              <div className="verticalLeft">
                <div>{b.room.name}</div>
                <div>
                  {moment(b.checkIn).format("YYYY-MM-DD")} -{" "}
                  {moment(b.checkOut).format("YYYY-MM-DD")}
                </div>
                <div>{b.status}</div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default MePage;
