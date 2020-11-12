import React, { useState } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from "react-vis";
import "../containers/owner/generalPage.css";

const GeneralChart = ({ roomList, totalRevenue }) => {
  const [currentRoom, setCurrentRoom] = useState();
  const [currentMonth, setCurrentMonth] = useState();
  const [currentData, setCurrentData] = useState();
  const chartColor = ["#247ba0", "#ffdab9", "#b56576"];

  return (
    <div className="horizontalLeft generalChart">
      <XYPlot
        className="clustered-stacked-bar-chart-example"
        xType="ordinal"
        stackBy="y"
        width={550}
        height={500}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis title="Revenue ($)" />
        <VerticalBarSeries
          onValueMouseOver={(datapoint, event) => {
            setCurrentMonth(datapoint.x);
            setCurrentData(datapoint.y);
            setCurrentRoom(roomList[0].name);
          }}
          cluster="2020"
          color="#247ba0"
          data={totalRevenue(roomList[0].booking)}
        />
        <VerticalBarSeries
          onValueMouseOver={(datapoint, event) => {
            setCurrentMonth(datapoint.x);
            setCurrentData(datapoint.y);
            setCurrentRoom(roomList[1].name);
          }}
          cluster="2020"
          color="#ffdab9"
          data={totalRevenue(roomList[1].booking)}
        />
        <VerticalBarSeries
          onValueMouseOver={(datapoint, event) => {
            setCurrentMonth(datapoint.x);
            setCurrentData(datapoint.y);
            setCurrentRoom(roomList[2].name);
          }}
          cluster="2020"
          color="#b56576"
          data={totalRevenue(roomList[2].booking)}
        />
        <VerticalBarSeries
          onValueMouseOver={(datapoint, event) => {
            setCurrentMonth(datapoint.x);
            setCurrentData(datapoint.y);
            setCurrentRoom(roomList[3].name);
          }}
          cluster="2020"
          color="#60495a"
          data={totalRevenue(roomList[3].booking)}
        />
        <VerticalBarSeries
          onValueMouseOver={(datapoint, event) => {
            setCurrentMonth(datapoint.x);
            setCurrentData(datapoint.y);
            setCurrentRoom(roomList[4].name);
          }}
          cluster="2020"
          color="#e4b363"
          data={totalRevenue(roomList[4].booking)}
        />
        <VerticalBarSeries
          onValueMouseOver={(datapoint, event) => {
            setCurrentMonth(datapoint.x);
            setCurrentData(datapoint.y);
            setCurrentRoom(roomList[5].name);
          }}
          cluster="2020"
          color="#ffc0be"
          data={totalRevenue(roomList[5].booking)}
        />
      </XYPlot>
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
        <br />
        <div>
          <div>Data detail:</div>
          <div>{currentRoom}</div>
          <div>
            Month: {currentMonth} - Revenue: ${currentData}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralChart;
