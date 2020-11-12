import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Calendar } from "antd";
import eventActions from "../../redux/actions/eventActions";
import moment from "moment";

const EventManagement = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const eventList = useSelector((state) => state.event.eventList);
  const eventByDate = useSelector((state) => state.event.eventByDate);
  const [selectedDate, setSelectedDate] = useState("");
  // let dateList = ["2020-11-10T03:00:03.821Z", "2020-12-09"];
  let dateList = [];

  if (eventList.length > 0) {
    for (let i = 0; i < eventList.length; i++) {
      dateList.push(eventList[i].startDate);
    }
    console.log(dateList);
  }

  const dateCellRender = (value) => {
    for (let i = 0; i < dateList.length; i++) {
      if (
        value.format("DD") == moment(dateList[i]).format("DD") &&
        value.format("MM") == moment(dateList[i]).format("MM")
      ) {
        return (
          <div
            style={{
              width: "25px",
              height: "4px",
              backgroundColor: "#ff928b",
            }}
          ></div>
        );
      }
    }
  };

  const onSelect = (value) => {
    let date = value.format("YYYY-MM-DD");
    setSelectedDate(date);
    dispatch(eventActions.getEventsByDate(date));
  };

  const getEvents = () => {
    dispatch(eventActions.getEvents());
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="container margin">
      <div className="horizontalCenter">
        <button
          className="bttn"
          onClick={() => history.push("/staff/events/add")}
        >
          Add event
        </button>
      </div>
      <br />
      <div className="verticalCenter container margin">
        <Calendar
          fullscreen={false}
          mode="month"
          dateCellRender={dateCellRender}
          onSelect={onSelect}
          style={{ maxWidth: "650px" }}
        />
        <br />
        <div>
          {eventByDate.length <= 0 ? (
            <h3>Select date to see event details</h3>
          ) : (
            eventByDate.map((e) => (
              <>
                <h3>{e.name}</h3>
                <img
                  src="https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-03.jpg"
                  alt=""
                  style={{ width: "100%" }}
                />
                <div>{e.eventContent}</div>
                <div>
                  On {moment(e.startDate).format("YYYY-MM-DD")} - from{" "}
                  {moment(e.startDate).format("HH:mm")} to{" "}
                  {moment(e.endDate).format("HH:mm")}
                </div>
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
