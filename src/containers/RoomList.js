import React, { useEffect, useState } from "react";
import roomActions from "../redux/actions/roomActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import bookingActions from "../redux/actions/bookingActions";
import RoomCard from "../components/RoomCard";
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import { LoadingOutlined } from "@ant-design/icons";
import ratingActions from "../redux/actions/ratingActions";

const RoomList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const roomList = useSelector((state) => state.room.roomList);
  const user = useSelector((state) => state.auth.user);
  const ratingList = useSelector((state) => state.rating.ratingList);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const redirectUrl = useSelector((state) => state.booking.redirect);

  const getRoomList = () => {
    dispatch(roomActions.getRooms());
  };

  const getRatings = () => {
    dispatch(ratingActions.getRatings());
  };

  const ratingsByRoom = (id) => {
    const list = ratingList.filter((item) => item.room._id === id);
    return list;
  };

  const addRatingByRoom = (roomId, rating, review) => {
    dispatch(ratingActions.addRating(roomId, rating, review));
  };

  const bookRoom = (roomId, price) => {
    if (!user) {
      message.warning("Please log in to book and get promotion code.");
      return;
    }
    if (!checkIn || !checkOut) {
      message.warning("Please choose your checkin/checkout date.");
      return;
    }
    dispatch(
      bookingActions.addBooking(roomId, price, checkIn, checkOut, user._id)
    );
    setCheckIn("");
    setCheckOut("");
  };

  useEffect(() => {
    getRoomList();
    getRatings();
  }, []);

  if (redirectUrl) {
    dispatch(bookingActions.clearRedirect());
    history.push("/bookings/user");
  }

  return (
    <>
      <NavBar />
      <div className="verticalCenter container margin">
        <div className="headTitle">Rooms</div>
        {roomList.length == 0 ? (
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
          roomList.map((room) => (
            <RoomCard
              room={room}
              bookRoom={bookRoom}
              setCheckIn={setCheckIn}
              setCheckOut={setCheckOut}
              ratingsByRoom={ratingsByRoom}
              addRatingByRoom={addRatingByRoom}
              getRatings={getRatings}
              key={room._id}
            />
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default RoomList;
