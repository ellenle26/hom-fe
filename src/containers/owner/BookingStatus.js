import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import bookingActions from "../../redux/actions/bookingActions";
import moment from "moment";
import {
  DollarCircleFilled,
  DollarCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./bookingStatus.css";

const BookingStatus = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.booking.bookingList);

  const getAllBooking = () => {
    dispatch(bookingActions.getBookings());
  };

  const changePaid = (email, num, paid) => {
    dispatch(bookingActions.changeStatus(email, num, paid));
  };

  const paymentdue = (date) => {
    let day = Math.round(
      (moment(Date.now()).format("x") - moment(date).format("x")) /
        (1000 * 3600 * 24)
    );
    if (day < 7) {
      let dateFormat = new Date(date);
      dateFormat = dateFormat.getTime();
      let addDate = dateFormat + 7 * 1000 * 3600 * 24;
      let showDate = new Date(addDate);
      return moment(showDate).format("MMM Do YY");
    } else if (day >= 7) {
      let showDate = "Overdue";
      return showDate;
    }
  };

  const cancelEBooking = (bookingNo) => {
    dispatch(bookingActions.cancelEBooking(bookingNo));
  };

  useEffect(() => {
    getAllBooking();
  }, []);

  return (
    <div className="table-div">
      <table className="table">
        <tr style={{ fontWeight: "bold" }}>
          <td
            className="frozenCol"
            style={{ borderTop: "solid 1px lightgray" }}
          >
            Booking #
          </td>
          <td className="secondCol">Booking Id</td>
          <td className="expand">Checkin Date</td>
          <td className="expand">Room</td>
          <td className="expand">Payment due</td>
          <td className="expand">Status</td>
        </tr>
        {bookings.length < 0 ? (
          <div>loading</div>
        ) : (
          bookings.length > 0 &&
          bookings.map((item, index) => (
            <tr key={item._id}>
              <td
                className="frozenCol"
                style={{ borderTop: "solid 1px lightgray", textAlign: "left" }}
              >
                {item.status !== "cancelled" && item.bookingNo !== "" ? (
                  <>
                    <MinusCircleOutlined
                      className="cancelEB"
                      onClick={() => cancelEBooking(item.bookingNo)}
                    />
                    &nbsp; #{index + 1}&nbsp;-&nbsp;{item.bookingNo}
                  </>
                ) : (
                  <>
                    #{index + 1}&nbsp;-&nbsp;{item.bookingNo}
                  </>
                )}
              </td>
              <td className="secondCol">{item._id}</td>
              <td>{moment(item.checkIn).format("MMM Do YY")}</td>
              <td className="expand">{item.room.name}</td>
              <td>{paymentdue(item.createdAt)}</td>
              <td className="expand">
                {item.status === "paid" ? (
                  <>
                    <DollarCircleFilled /> {item.status}
                  </>
                ) : item.status === "processing" ? (
                  <>
                    <DollarCircleOutlined
                      className="status"
                      onClick={() =>
                        changePaid(item.user.email, item.bookingNo, "paid")
                      }
                    />{" "}
                    {item.status}
                  </>
                ) : (
                  <>{item.status}</>
                )}
              </td>
            </tr>
          ))
        )}
      </table>
    </div>
  );
};

export default BookingStatus;
