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

  const deleteRoom = (id) => {
    console.log(id);
    dispatch(roomActions.deleteRoom(id));
    getRoomList();
  };

  useEffect(() => {
    getRoomList();
  }, []);

  return (
    roomList.length > 0 && (
      <>
        <div>
          <div style={{ width: "100%", overflowX: "scroll" }}>
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
                <div className="horizontalCenter">
                  <hr
                    style={{
                      width: "40px",
                      height: "4px",
                      backgroundColor: "#60495a",
                      color: "transparent",
                    }}
                  />{" "}
                  &nbsp;
                  {roomList[3].name}
                </div>
                <div className="horizontalCenter">
                  <hr
                    style={{
                      width: "40px",
                      height: "4px",
                      backgroundColor: "#e4b363",
                      color: "transparent",
                    }}
                  />{" "}
                  &nbsp;
                  {roomList[4].name}
                </div>
                <div className="horizontalCenter">
                  <hr
                    style={{
                      width: "40px",
                      height: "4px",
                      backgroundColor: "#ffc0be",
                      color: "transparent",
                    }}
                  />{" "}
                  &nbsp;
                  {roomList[5].name}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="margin verticalCenter">
          <button
            className="bttn"
            onClick={() => history.push("/owner/rooms/add")}
          >
            Add room
          </button>
          <br />
          <div className="horizontalCenter" style={{ flexWrap: "wrap" }}>
            {roomList.length > 0 &&
              roomList.map(
                (r) =>
                  r.isDeleted == false && (
                    <div
                      key={r._id}
                      className="verticalCenter"
                      style={{
                        width: "250px",
                        margin: "20px",
                        border: "solid 2px black",
                        padding: "10px",
                      }}
                    >
                      <div>{r.name}</div>
                      <div>
                        <button
                          className="bttn"
                          onClick={() =>
                            history.push(`/owner/rooms/edit/${r._id}`)
                          }
                        >
                          Edit
                        </button>
                        &nbsp;
                        <button
                          className="bttn"
                          onClick={() => deleteRoom(r._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      </>
    )
  );
};

export default RoomsPage;
