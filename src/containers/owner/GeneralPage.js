import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import roomActions from "../../redux/actions/roomActions";
import bookingActions from "../../redux/actions/bookingActions";
import moment from "moment";
import GeneralChart from "../../components/GeneralChart";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const GeneralPage = () => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.roomList);
  const bookings = useSelector((state) => state.booking.bookingList);

  //  array will be array of booking per room
  const totalRevenue = (bookingArr) => {
    bookingArr = bookingArr.filter(
      (item) =>
        item.status !== "pending" &&
        item.status !== "processing" &&
        item.status !== "cancelled"
    );
    let dataArr = [{ x: "0", y: 0 }];
    let month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    for (let i = 1; i <= 12; i++) {
      let newBookingArr = bookingArr.filter(
        (item) => moment(item.checkIn).format("M") == i
      );
      if (newBookingArr.length == 0) {
        dataArr.push({ x: month[i - 1], y: 0 });
      } else {
        let sum = 0;
        for (let j = 0; j < newBookingArr.length; j++) {
          sum += newBookingArr[j].revenue;
        }
        dataArr.push({ x: month[i - 1], y: sum });
      }
    }
    return dataArr;
  };

  const getRoomList = () => {
    dispatch(roomActions.getRooms());
  };

  const getAllBooking = () => {
    dispatch(bookingActions.getBookings());
  };

  useEffect(() => {
    getRoomList();
    getAllBooking();
  }, []);

  return (
    <div>
      <div style={{ width: "100vw", overflowX: "scroll", maxWidth: "100%" }}>
        {roomList.length > 0 && (
          <GeneralChart totalRevenue={totalRevenue} roomList={roomList} />
        )}
      </div>
      <div
        style={{ width: "100vw", overflowX: "scroll", maxWidth: "100%" }}
        className="margin"
      >
        <div style={{ padding: "20px 20px" }}>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button bttn"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Download as XLS"
          />
          <table id="table-to-xls">
            <tr
              style={{
                textAlign: "center",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <td>Booking#</td>
              <td>Created on</td>
              <td>Booking status</td>
              <td>Booked by</td>
              <td>Contact</td>
              <td>Room name</td>
              <td>Room rate ($)</td>
              <td>Check in</td>
              <td>Check out</td>
              <td>Booked price ($)</td>
              <td>Total stay (nights)</td>
              <td>Revenue</td>
            </tr>
            {bookings.length > 0 &&
              bookings.map((b) => (
                <tr>
                  <td>{b.bookingNo}</td>
                  <td>{moment(b.createdAt).format("YYYY/MM/DD")}</td>
                  <td>{b.status}</td>
                  <td>{b.bookedBy}</td>
                  <td>0{b.bookingContact}</td>
                  <td>{b.room.name}</td>
                  <td>{b.room.price}</td>
                  <td>{moment(b.checkIn).format("YYYY/MM/DD")}</td>
                  <td>{moment(b.checkOut).format("YYYY/MM/DD")}</td>
                  <td>{b.bookingPrice}</td>
                  <td>{b.totalStay}</td>
                  <td>{b.revenue}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;
