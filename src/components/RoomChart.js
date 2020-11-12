import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
} from "react-vis";
import "../containers/owner/roomPage.css";

const RoomChart = ({ roomList, totalBookDays }) => {
  return (
    roomList.length > 0 && (
      <XYPlot width={500} height={500}>
        <HorizontalGridLines style={{ stroke: "#B7E9ED" }} />
        <VerticalGridLines style={{ stroke: "#B7E9ED" }} />
        <XAxis
          title="Month"
          style={{
            line: { stroke: "#ADDDE1" },
            ticks: { stroke: "#ADDDE1" },
            text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 },
          }}
        />
        <YAxis title="Days" />
        <LineSeries
          className="first-series"
          data={totalBookDays(roomList[0].booking)}
          color="#247ba0"
          style={{
            strokeLinejoin: "round",
            strokeWidth: 4,
          }}
        />
        <LineSeries
          className="first-series"
          data={totalBookDays(roomList[1].booking)}
          color="#ffdab9"
          style={{
            strokeLinejoin: "round",
            strokeWidth: 4,
          }}
        />
        <LineSeries
          className="first-series"
          data={totalBookDays(roomList[2].booking)}
          color="#b56576"
          style={{
            strokeLinejoin: "round",
            strokeWidth: 4,
          }}
        />
        <LineSeries
          className="first-series"
          data={totalBookDays(roomList[3].booking)}
          color="#60495a"
          style={{
            strokeLinejoin: "round",
            strokeWidth: 4,
          }}
        />
        <LineSeries
          className="first-series"
          data={totalBookDays(roomList[4].booking)}
          color="#e4b363"
          style={{
            strokeLinejoin: "round",
            strokeWidth: 4,
          }}
        />
        <LineSeries
          className="first-series"
          data={totalBookDays(roomList[5].booking)}
          color="#ffc0be"
          style={{
            strokeLinejoin: "round",
            strokeWidth: 4,
          }}
        />
      </XYPlot>
    )
  );
};

export default RoomChart;
