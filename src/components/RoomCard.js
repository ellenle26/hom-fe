import React, { useState } from "react";
import { DatePicker, Space, message, Modal, Carousel } from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import "./roomCard.css";

const RoomCard = ({ room, bookRoom, setCheckIn, setCheckOut }) => {
  const [visible, setVisible] = useState(false);
  const { RangePicker } = DatePicker;

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

  return (
    <div
      className="horizontalCenter roomCard"
      style={{ backgroundColor: "#f3eee8" }}
    >
      <div
        className="thumbnail horizontalCenter"
        onClick={() => setVisible(true)}
      >
        <img
          src={room.roomImages[0]}
          alt=""
          style={{ width: "100%" }}
          className="thumbnailImg"
        />
      </div>
      <div className="roomInfo">
        <div className="roomName">{room.name}</div>
        <div className="roomPrice">${room.price}/night</div>
        <hr></hr>
        <div>
          <span>{room.description}</span>
        </div>
        <div>Facilities:</div>
        <ul>
          {room.facilities.map((fac) => (
            <li>{fac}</li>
          ))}
        </ul>
        <div>
          <UserOutlined /> {room.capacity}
        </div>
        <br />
        <div>Please select your stay:</div>
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
        <div className="horizontalCenter">
          <div
            className="button"
            onClick={() => {
              bookRoom(room._id, room.price);
            }}
          >
            <div className="firstbttn">Book</div>
            <div className="secbttn">Book</div>
          </div>
        </div>
      </div>
      <Modal
        title={room.name}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width="100vw"
        centered
        bodyStyle={{
          height: "75vh",
          backgroundColor: "black",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Carousel dotPosition="right" autoplay={true}>
          {room.roomImages.map((img) => (
            <div className="divCar horizontalCenter">
              <img src={img} alt="" className="imgCar" />
            </div>
          ))}
        </Carousel>
      </Modal>
    </div>
  );
};

export default RoomCard;
