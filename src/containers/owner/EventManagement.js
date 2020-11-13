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
              backgroundColor: "#588157",
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

  const editEvent = (eventId) => {};

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="container margin">
      <div className="horizontalCenter">
        <button
          className="bttn"
          onClick={() => history.push("/owner/events/add")}
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
        <div className="e">
          {eventByDate.length <= 0 ? (
            <h3>Select date to see event details</h3>
          ) : (
            eventByDate.map((e) => (
              <>
                <div className="wrap">
                  <img src={e.posterUrl} alt="" className="poster" />
                  <div className="econtent">
                    <h3 className="eName">{e.name.toUpperCase()}</h3>
                    <div className="what">{e.eventContent}</div>
                    <br />
                    <div className="timeStamp">
                      On {moment(e.startDate).format("YYYY-MM-DD")} - from{" "}
                      {moment(e.startDate).format("HH:mm")} to{" "}
                      {moment(e.endDate).format("HH:mm")}
                    </div>
                  </div>
                </div>
                <br />
                <button className="bttn" onClick={() => editEvent(e._id)}>
                  Edit event
                </button>
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
