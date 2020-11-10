import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import roomActions from "../../redux/actions/roomActions";
import moment from "moment";
import "./roomPage.css";
import RoomChart from "../../components/RoomChart";

const RoomsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const roomList = useSelector((state) => state.room.roomList);
  const [currentRoom, setCurrentRoom] = useState();
  const [currentMonth, setCurrentMonth] = useState();
  const [currentData, setCurrentData] = useState();

  //  array will be array of booking per room
  const totalBookDays = (bookingArr) => {
    bookingArr = bookingArr.filter(
      (item) =>
        item.status !== "pending" &&
        item.status !== "processing" &&
        item.status !== "cancelled"
    );
    let dataArr = [{ x: 0, y: 0 }];
    for (let i = 1; i <= 12; i++) {
      let newBookingArr = bookingArr.filter(
        (item) => moment(item.checkIn).format("M") == i
      );
      if (newBookingArr.length == 0) {
        dataArr.push({ x: i, y: 0 });
      } else {
        let sum = 0;
        for (let j = 0; j < newBookingArr.length; j++) {
          sum += newBookingArr[j].totalStay;
        }
        dataArr.push({ x: i, y: sum });
      }
    }
    return dataArr;
  };

  const getRoomList = () => {
    dispatch(roomActions.getRooms());
  };

  useEffect(() => {
    getRoomList();
  }, []);

  return (
    roomList.length > 0 && (
      <div>
        <div style={{ width: "100vw", overflowX: "scroll" }}>
          <div className="horizontalLeft">
            <RoomChart
              roomList={roomList}
              totalBookDays={totalBookDays}
              setCurrentRoom={setCurrentRoom}
              setCurrentData={setCurrentData}
              setCurrentMonth={setCurrentMonth}
            />
            &nbsp;
            <div className="verticalLeft">
              <h3>Room:</h3>
              <div className="horizontalCenter">
                <hr
                  style={{
                    width: "40px",
                    height: "4px",
                    backgroundColor: "#247ba0",
                    color: "transparent",
                  }}
                />
                &nbsp;
                {roomList[0].name}
              </div>
              <div className="horizontalCenter">
                <hr
                  style={{
                    width: "40px",
                    height: "4px",
                    backgroundColor: "#ffdab9",
                    color: "transparent",
                  }}
                />{" "}
                &nbsp;
                {roomList[1].name}
              </div>
              <div className="horizontalCenter">
                <hr
                  style={{
                    width: "40px",
                    height: "4px",
                    backgroundColor: "#b56576",
                    color: "transparent",
                  }}
                />{" "}
                &nbsp;
                {roomList[2].name}
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => history.push("/owner/rooms/add")}>
          Add room
        </button>
      </div>
    )
  );
};

export default RoomsPage;
