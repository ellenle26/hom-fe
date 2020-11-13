import React, { useEffect, useState } from "react";
import NavBar from "../containers/NavBar";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Calendar } from "antd";
import eventActions from "../redux/actions/eventActions";
import moment from "moment";
import Footer from "../components/Footer";
import "./eventPage.css";

const EventPage = () => {
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

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <NavBar />
      <div className="verticalCenter container margin">
        <div className="headTitle">Events</div>
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
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventPage;
