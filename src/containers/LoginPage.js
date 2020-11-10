import React from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import authActions from "../redux/actions/authActions";
import "./loginPage.css";
import NavBar from "./NavBar";

const LoginPage = () => {
  console.log(process.env.REACT_APP_FB_APP_ID);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  // handle form submission---------
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const { email, password } = values;
    dispatch(authActions.login(email, password));
  };
  const onReset = () => {
    form.resetFields();
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
  const responseFacebook = (response) => {
    dispatch(authActions.loginWithFB(response.accessToken));
  };

  const responseGoogle = (response) => {
    dispatch(authActions.loginWithGG(response.accessToken));
  };

  if (user) return <Redirect to="/" />;
  return (
    <>
      <NavBar />
      <div className="login">
        <div>
          <h1 className="horizontalCenter">Log in</h1>
          <Form {...layout} form={form} onFinish={onFinish}>
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
            <div className="horizontalCenter">
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset form
              </Button>
            </div>
          </Form>
          <br />
          <div className="horizontalCenter">
            <FacebookLogin
              appId={process.env.REACT_APP_FB_APP_ID}
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              icon="fa-facebook"
            />
          </div>
          <br />
          <div className="horizontalCenter">
            <GoogleLogin
              clientId={process.env.REACT_APP_GG_CLIENT_ID}
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={responseGoogle}
              // onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <br />
          <p className="horizontalCenter">
            or,<Link to="/register">&nbsp;Register</Link>&nbsp;with your email.
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
