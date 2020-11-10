import React, { useEffect } from "react";
import moment from "moment";
import { CloseCircleOutlined } from "@ant-design/icons";

const UserBookingCart = ({ booking, cancelPendingBooking }) => {
  return (
    <>
      <tr key={booking._id}>
        <td className="td1">
          <CloseCircleOutlined
            style={{ fontSize: "20px" }}
            onClick={() => {
              cancelPendingBooking(booking._id);
            }}
          />
        </td>
        <td className="td2">
          <div className="horizontalCenter">
            <img
              src={booking.room.roomImages[0]}
              alt=""
              style={{ width: "50px" }}
            />
            <div>{booking.room.name}</div>
          </div>
        </td>
        <td className="td3">
          {moment(booking.checkIn).format("MMM Do YY")} -{" "}
          {moment(booking.checkOut).format("MMM Do YY")}
        </td>
        <td className="td4">{booking.totalStay} night(s)</td>
        <td className="td5">{booking.room.price}</td>
        <td className="td6">{booking.revenue}$</td>
      </tr>
    </>
  );
};

export default UserBookingCart;
