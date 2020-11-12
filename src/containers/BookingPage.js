import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Collapse, Input, Form, Button, message } from "antd";
import bookingActions from "../redux/actions/bookingActions";
import UserBookingCart from "../components/UserBookingCart";
import "./bookingPage.css";
import NavBar from "./NavBar";
import Footer from "../components/Footer";

const BookingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const bookingList = useSelector((state) => state.booking.bookingList);

  const user = useSelector((state) => state.auth.user);

  const getUserPendingBooking = () => {
    dispatch(bookingActions.getUserPendingBooking());
  };

  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values) => {
    let bookingIdList = [];
    for (let i = 0; i < bookingList.length; i++) {
      bookingIdList.push(bookingList[i]._id);
    }
    const { bookingContact, userNote, promoCode } = values;
    dispatch(
      bookingActions.confirmPayment(
        bookingIdList,
        bookingContact,
        userNote,
        promoCode
      )
    );
    message.success(
      "Please check your email for booking confirmation. Thank you!"
    );
  };

  const totalPayment = () => {
    let sum = 0;
    for (let i = 0; i < bookingList.length; i++) {
      sum += bookingList[i].revenue;
    }
    return sum;
  };

  const cancelPendingBooking = (bookingId) => {
    dispatch(bookingActions.cancelPendingBooking(bookingId));
  };

  useEffect(() => {
    getUserPendingBooking();
  }, []);

  return (
    <>
      <NavBar />
      <div className="verticalJustify container margin">
        {bookingList && console.log("list booking day ne huhu", bookingList)}
        <div className="headTitle">Bookings</div>
        {bookingList.length < 0 ? (
          <div>loading</div>
        ) : bookingList.length == 0 ? (
          <div>You have no booking!</div>
        ) : (
          <Collapse defaultActiveKey={["1"]} ghost className="collapse">
            <Panel header="Your booking" key="1">
              <table>
                <tr>
                  <td className="td1"></td>
                  <td className="td2">Room</td>
                  <td className="td3">Booking date</td>
                  <td className="td4">Total stay</td>
                  <td className="td5">Price</td>
                  <td className="td6">Total</td>
                </tr>
                {bookingList.length > 0 &&
                  bookingList.map((booking) => (
                    <UserBookingCart
                      booking={booking}
                      key={booking._id}
                      cancelPendingBooking={cancelPendingBooking}
                    />
                  ))}
              </table>
            </Panel>
            <Panel header="Payment" key="2">
              <Form form={form} onFinish={onFinish}>
                <div style={{ width: "100%" }} className="horizontalJustify">
                  <div style={{ width: "60%" }}>
                    <Form.Item label="Name" {...layout}>
                      <Input defaultValue={user.name} disabled />
                    </Form.Item>
                    <Form.Item label="Email" {...layout}>
                      <Input defaultValue={user.email} disabled />
                    </Form.Item>
                    <Form.Item
                      {...layout}
                      name="bookingContact"
                      label="Phone #"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...layout}
                      name="userNote"
                      label="Note"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <TextArea />
                    </Form.Item>
                  </div>
                  <div
                    className="verticalTop"
                    style={{
                      width: "40%",
                      height: "300px",
                      padding: "20px",
                    }}
                  >
                    <div className="discount">
                      <Form.Item
                        name="promoCode"
                        label="Promo Code"
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                    <div className="total horizontalCenter">
                      <div>
                        <u>TOTAL</u> :&nbsp;
                      </div>
                      <div>${totalPayment()}</div>
                    </div>
                  </div>
                </div>
                <Form.Item>
                  <Button className="bttn" htmlType="submit">
                    Confirm payment
                  </Button>
                </Form.Item>
              </Form>
            </Panel>
          </Collapse>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;
