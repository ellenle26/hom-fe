import React from "react";
import { useHistory } from "react-router-dom";

const EventManagement = () => {
  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.push("/owner/events/add")}>
        Add event
      </button>
    </div>
  );
};

export default EventManagement;
