import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Tabs } from "antd";
import StaffPage from "../containers/staff/StaffPage";
import RoomStatus from "../containers/staff/RoomStatus";
import NavBar from "../containers/NavBar";

const StaffRoute = () => {
  const history = useHistory();
  const { TabPane } = Tabs;
  const callback = (key) => {
    history.push(`/staff/${key}`);
  };
  return (
    <>
      <NavBar />
      <Tabs defaultActiveKey="profile" onChange={callback} centered>
        <TabPane tab="Profile" key="profile">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Rooms" key="rooms">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
      <Switch>
        <Route exact path="/staff/profile" component={StaffPage} />
        <Route exact path="/staff/rooms" component={RoomStatus} />
      </Switch>
    </>
  );
};

export default StaffRoute;
