import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../../redux/actions/userActions";
import { Select } from "antd";
import "antd/dist/antd.css";
import "./ownerPage.css";

const OwnerPage = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList);

  const getAllUsers = () => {
    dispatch(userActions.getAllUsers());
  };

  const handleChange = (value) => {
    dispatch(userActions.changeAuth(value[0], value[1]));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="userTable">
      <div className="verticalCenter container ">
        {console.log(userList)}
        <div className="row horizontalCenter">
          <div className="col1">
            <u>Avatar</u>
          </div>
          <div className="col2">
            <u>Name</u>
          </div>
          <div className="col3">
            <u>Email</u>
          </div>
          <div className="col4">
            <u>Phone#</u>
          </div>
          <div className="col5">
            <u>AuthLevel</u>
            <span style={{ fontSize: "10px" }}>
              <i>* Change auth level</i>
            </span>
          </div>
        </div>
        {userList.length > 0 &&
          userList.map((user) => (
            <div className="row horizontalCenter">
              <div className="col1">
                <img src={user.avatarUrl} alt="" />
              </div>
              <div className="col2">{user.name}</div>
              <div className="col3">{user.email}</div>
              <div className="col4">0{user.phone}</div>
              <div className="col5">
                <Select
                  defaultValue={user.authLevel}
                  onChange={handleChange}
                  bordered={false}
                  style={{ width: "80%" }}
                >
                  <Option value={["owner", user._id]}>owner</Option>
                  <Option value={["staff", user._id]}>staff</Option>
                  <Option value={["user", user._id]}>user</Option>
                </Select>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OwnerPage;
