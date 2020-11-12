import React, { useEffect, useState } from "react";
import roomActions from "../../redux/actions/roomActions";
import bookingActions from "../../redux/actions/bookingActions";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { SlidersOutlined } from "@ant-design/icons";
import moment from "moment";
import "./roomStatus.css";

const RoomStatus = () => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.roomList);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const getRoomList = () => {
    dispatch(roomActions.getRooms());
  };

  const selectRoom = (name, id) => {
    setSelectedRoom(name);
    setSelectedRoomId(id);
  };

  const setRoomStat = (stat) => {
    if (selectedRoom === "" || selectedRoomId === "") {
      message.warning("Please select room first");
      return;
    }
    dispatch(roomActions.changeRoomStat(stat, selectedRoomId));
  };

  const setBookingStat = (stat) => {
    let d = new Date();
    let date = moment(d).format("YYYY-MM-DD");
    console.log(date, stat);
    dispatch(bookingActions.changeBookingStat(selectedRoomId, date, stat));
  };

  const changeBothStatus = (stat) => {
    setRoomStat(stat);
    setBookingStat(stat);
    setSelectedRoom("");
    setSelectedRoomId("");
  };

  useEffect(() => {
    getRoomList();
  }, [selectedRoomId]);
  return (
    <div>
      <div className="horizontalCenter">
        <div
          className="funcBttn horizontalCenter"
          onClick={() => {
            setRoomStat("ready");
            setSelectedRoom("");
            setSelectedRoomId("");
          }}
        >
          Ready
        </div>
        <div
          className="funcBttn horizontalCenter"
          onClick={() => {
            changeBothStatus("checkin");
          }}
        >
          Checkin
        </div>
        <div
          className="funcBttn horizontalCenter"
          onClick={() => {
            changeBothStatus("checkout");
          }}
        >
          Checkout
        </div>
        <div
          className="funcBttn horizontalCenter"
          onClick={() => {
            setRoomStat("cleaning");
            setSelectedRoom("");
            setSelectedRoomId("");
          }}
        >
          Cleaning
        </div>
      </div>
      <div className="horizontalCenter">
        "<u>{selectedRoom}</u>"&nbsp;room was selected.
      </div>
      <div className="horizontalCenter roomList">
        {roomList.length > 0 &&
          roomList.map((room) => (
            <div
              key={room._id}
              id="theroom"
              className={
                room.status === "ready"
                  ? "room ready horizontalCenter"
                  : room.status === "checkin"
                  ? "room checkin horizontalCenter"
                  : room.status === "checkout"
                  ? "room checkout horizontalCenter"
                  : "room cleaning horizontalCenter"
              }
              onClick={() => selectRoom(room.name, room._id)}
            >
              <div className="statusImg horizontalCenter">
                <img src={room.roomImages[0]} alt="" className="image" />
              </div>
              &nbsp;
              <div className="verticalCenter">
                <div>
                  <div>{room.name}</div>
                  <div style={{ color: "yellow" }}>
                    <SlidersOutlined />
                    &nbsp;Status:&nbsp;
                    {room.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RoomStatus;
