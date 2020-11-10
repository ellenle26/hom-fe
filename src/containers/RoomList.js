import React, { useEffect, useState } from "react";
import roomActions from "../redux/actions/roomActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import bookingActions from "../redux/actions/bookingActions";
import RoomCard from "../components/RoomCard";
import NavBar from "./NavBar";

const RoomList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const roomList = useSelector((state) => state.room.roomList);
  const user = useSelector((state) => state.auth.user);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();

  const getRoomList = () => {
    dispatch(roomActions.getRooms());
  };

  const bookRoom = (roomId, price) => {
    if (!user) {
      message.warning("Please log in to book and get promotion code.");
      return;
    }
    if (user.authLevel === "staff" || user.authLevel === "owner") {
      message.warning("This booking page is for customer only");
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
    history.push("/bookings/user");
  };

  useEffect(() => {
    getRoomList();
  }, []);

  return (
    <>
      <NavBar />
      <div
        className="verticalCenter container"
        style={{ backgroundColor: "#f3e9dc", paddingTop: "20px" }}
      >
        {roomList &&
          roomList.map((room) => (
            <RoomCard
              room={room}
              bookRoom={bookRoom}
              setCheckIn={setCheckIn}
              setCheckOut={setCheckOut}
              key={room._id}
            />
          ))}
      </div>
    </>
  );
};

export default RoomList;
