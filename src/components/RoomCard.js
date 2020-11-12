import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  DatePicker,
  Space,
  message,
  Modal,
  Carousel,
  Rate,
  Form,
  Input,
  Button,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  StarFilled,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "./roomCard.css";

const RoomCard = ({
  room,
  bookRoom,
  setCheckIn,
  setCheckOut,
  ratingsByRoom,
  addRatingByRoom,
  getRatings,
}) => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [visibleComment, setVisibleComment] = useState(false);
  const { RangePicker } = DatePicker;
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const [rating, setRating] = useState();
  let roomRatings = ratingsByRoom(room._id);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const averageRating = (array) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i].rating;
    }
    let average = sum / array.length;
    if (isNaN(average)) {
      return (average = 5);
    } else {
      return average;
    }
  };

  let averageRoomRating = averageRating(roomRatings);

  const onFinish = (values) => {
    addRatingByRoom(room._id, rating, values.review);
    getRatings();
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

  const [slide, setSlide] = useState(0);

  const slider = useRef();

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
        <div className="horizontalJustify">
          <div style={{}}>
            <UserOutlined /> {room.capacity}
          </div>
          <div>
            <Rate
              allowHalf
              defaultValue={averageRoomRating}
              style={{ color: "#ffc758" }}
              disabled
            />
            &nbsp;
            <EditOutlined onClick={() => setVisibleComment(true)} />
          </div>
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
        <Carousel
          dots={false}
          ref={(ref) => {
            console.log(ref);
            slider.current = ref;
          }}
        >
          {room.roomImages.map((img) => (
            <div className="divCar horizontalCenter">
              <img src={img} alt="" className="imgCar" />
            </div>
          ))}
        </Carousel>
        <DoubleLeftOutlined
          style={{
            fontSize: "25px",
            color: "white",
            position: "absolute",
            top: "50%",
            left: "30px",
          }}
        />
        <DoubleRightOutlined
          style={{
            fontSize: "25px",
            color: "white",
            position: "absolute",
            top: "50%",
            right: "30px",
          }}
        />
      </Modal>
      <Modal
        title="Reviews"
        visible={visibleComment}
        onCancel={() => setVisibleComment(false)}
        footer={null}
        width="100vw"
        centered
        bodyStyle={{
          height: "75vh",
          backgroundColor: "white",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {roomRatings && (
          <div>
            {isAuthorized ? (
              <Form form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="review" label="Review">
                  <TextArea style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Rate
                    allowHalf
                    defaultValue={2.5}
                    style={{ color: "#ffc758" }}
                    onChange={(value) => {
                      setRating(value);
                    }}
                  />
                  &nbsp;&nbsp;
                  <Button type="link" htmlType="submit">
                    Review
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <></>
            )}

            <h2>
              <StarFilled style={{ fontSize: "25px", color: "#ed3b5a" }} />{" "}
              {averageRoomRating}&nbsp; ({room.rating.length}&nbsp; review(s))
            </h2>

            {roomRatings &&
              roomRatings.map((review) => (
                <>
                  <div className="horizontalLeft">
                    <img
                      className="avatarpic"
                      src={review.user.avatarUrl}
                      alt=""
                    />{" "}
                    &nbsp;&nbsp;
                    <div>
                      <h3>{review.user.name}</h3>
                      <div>
                        {" "}
                        <Rate
                          allowHalf
                          defaultValue={review.rating}
                          style={{ color: "#ffc758", fontSize: "12px" }}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div
                    style={{
                      borderBottom: "dashed 1px lightgray",
                      marginBottom: "20px",
                    }}
                  >
                    {review.review}
                  </div>
                </>
              ))}
            <br />
            <button className="bttn">Show more reviews</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RoomCard;
