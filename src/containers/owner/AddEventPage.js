import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import eventActions from "../../redux/actions/eventActions";
import "./addEventPage.css";

const AddEventPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { TextArea } = Input;
  const [posterUrl, setPosterUrl] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // handle form submission---------
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // name: { type: String, required: true },
    //   startDate: { type: Date, required: true },
    //   endDate: { type: Date, required: true },
    //   eventContent: { type: String, required: true },
    //   posterUrl: { type: String, required: true },
    dispatch(
      eventActions.addEvent(
        values.name,
        values.eventContent,
        startTime,
        endTime,
        posterUrl
      )
    );
    history.pushState("/owner/events");
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  //end handle form submit-----

  //handle submit image ----
  const openWidget = () => {
    // create the widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloud_name: "ellenlinh",
        upload_preset: "gzkez3bx",
      },
      (error, result) => {
        if (result.event === "success") {
          setPosterUrl(result.info.secure_url);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };
  //end submit img ------

  const onOk1 = (value) => {
    setStartTime(value);
    console.log("start", moment(value).format());
  };

  const onOk2 = (value) => {
    setEndTime(value);
    console.log("end", moment(value).format());
  };

  return (
    <div className="margin">
      <div>
        <h1 className="horizontalCenter">Add Event</h1>
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="verticalCenter">
            When it starts: <DatePicker showTime onOk={onOk1} />
            and when it's overed: <DatePicker showTime onOk={onOk2} />
            <br />
            <div>
              Event will be held on&nbsp;
              {moment(startTime).format("YYYY-MM-DD")}&nbsp; from:{" "}
              {moment(startTime).format("HH:mm")}&nbsp;to:{" "}
              {moment(endTime).format("HH:mm")}
            </div>
          </div>
          <br />
          <Form.Item
            name="eventContent"
            label="What's fun"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea />
          </Form.Item>

          <div className="verticalCenter">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt=""
                style={{ maxWidth: "100%" }}
                className="poster"
                onClick={() => openWidget()}
              />
            ) : (
              <div
                className="verticalCenter poster"
                onClick={() => openWidget()}
              >
                <PlusOutlined />
                <p>Add poster</p>
              </div>
            )}
          </div>
          <br />
          <div className="horizontalCenter">
            <Button type="primary" htmlType="submit">
              Add event
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddEventPage;
