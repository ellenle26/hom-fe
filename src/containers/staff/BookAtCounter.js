import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import roomActions from "../../redux/actions/roomActions";
import bookingActions from "../../redux/actions/bookingActions";
import { DatePicker, Space, message, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import "./bookAtCounter.css";

const BookAtCounter = () => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.roomList);
  const user = useSelector((state) => state.auth.user);
  const bookings = useSelector((state) => state.booking.searchList);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const { RangePicker } = DatePicker;
  const { Search } = Input;

  const onSearch = (value) => {
    if (!value) return;
    dispatch(bookingActions.searchBooking(value, null));
  };

  const searchBookingToday = () => {
    const d = new Date();
    let today = moment(d).format("YYYY-MM-DD");
    dispatch(bookingActions.searchBooking(null, today));
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

  function onChange(dates) {
    if (dates) {
      const a =
        (dates[1]._d.getTime() - dates[0]._d.getTime()) / (1000 * 3600 * 24);
      if (a == 0) {
        message.warning("Your stay should be at least 1 day long");
        return;
      }
      setCheckIn(dates[0]._d.getTime());
      setCheckOut(dates[1]._d.getTime());
    }
  }

  const format = "MM/DD/YYYY";
  const disabledDates = (array) => {
    let newArr = array.filter((item) => item.status !== "cancelled");
    let a = [];
    for (let i = 0; i < newArr.length; i++) {
      a.push({
        start: moment(moment(newArr[i].checkIn).format("L"), format),
        end: moment(moment(newArr[i].checkOut).format("L"), format),
      });
    }
    return a;
  };

  const getRoomList = () => {
    dispatch(roomActions.getRooms());
  };

  useEffect(() => {
    getRoomList();
  }, []);

  return (
    <div>
      <div className="verticalCenter container" style={{ width: "100%" }}>
        {roomList &&
          roomList.map((room) => (
            <div className="horizontalCenter counterBook">
              <div style={{ width: "20%" }}>{room.name}</div>
              <div className="horizontalCenter" style={{ width: "20%" }}>
                <div>${room.price}/night</div>&nbsp;-&nbsp;
                <div>
                  <UserOutlined /> {room.capacity}
                </div>
              </div>
              <div style={{ width: "50%" }}>
                <Space direction="vertical" size={12}>
                  <RangePicker
                    onChange={onChange}
                    disabledDate={(current) =>
                      disabledDates(room.booking).some((date) =>
                        current.isBetween(
                          moment(date["start"], format),
                          moment(date["end"], format),
                          "day"
                        )
                      )
                    }
                  />
                </Space>
                &nbsp;
                <button
                  className="bttn"
                  onClick={() => {
                    bookRoom(room._id, room.price);
                  }}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="container verticalCenter margin">
        <h3>Search customer's booking</h3>
        <div className="horizontalCenter">
          <Search
            placeholder="Search booking# or phone#"
            onSearch={onSearch}
            style={{ width: 250 }}
          />{" "}
          &nbsp;
          <button
            className="bttn"
            type="button"
            onClick={() => searchBookingToday()}
          >
            Search today booking
          </button>
        </div>{" "}
        <br />
        {bookings.length && bookings.length <= 0 ? (
          <div>No booking was found</div>
        ) : (
          bookings.map((b) => (
            <div className="container bookingBox">
              <h3>Booking#: {b.bookingNo}</h3>
              <div>Checkin date: {moment(b.checkIn).format("YYYY-MM-DD")}</div>
              <div>
                Checkout date: {moment(b.checkOut).format("YYYY-MM-DD")}
              </div>
              <div>Guest name: {b.user.name}</div>
              <div>Booking contact: {b.bookingContact}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookAtCounter;
