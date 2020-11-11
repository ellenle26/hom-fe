import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import userActions from "../redux/actions/userActions";
import "./signupPage.css";
import NavBar from "./NavBar";

const SignupPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let [avatarUrl, setAvatarUrl] = useState("");

  // handle form submission---------
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const { name, email, password } = values;
    dispatch(userActions.createUser(name, email, password, avatarUrl));
    history.push("/login");
  };
  const onReset = () => {
    form.resetFields();
    setAvatarUrl("");
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
          setAvatarUrl(result.info.secure_url);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };
  //end submit img ------

  return (
    <>
      <NavBar />
      <div className="register margin">
        <div>
          <h1 className="horizontalCenter">Sign up</h1>
          <Form {...layout} form={form} onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <div className="verticalCenter">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt=""
                  style={{ maxWidth: "100%" }}
                  className="uploadFunc"
                  onClick={() => openWidget()}
                />
              ) : (
                <div
                  className="verticalCenter uploadFunc"
                  onClick={() => openWidget()}
                >
                  <PlusOutlined />
                  <p>Add avatar</p>
                </div>
              )}
            </div>
            <br />
            <div className="horizontalCenter">
              <Button type="primary" htmlType="submit">
                Sign up
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset form
              </Button>
            </div>
          </Form>
          <br />
          <p className="horizontalCenter">
            or,<Link to="/login">&nbsp;Log in</Link>&nbsp;if you have already
            registered.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
