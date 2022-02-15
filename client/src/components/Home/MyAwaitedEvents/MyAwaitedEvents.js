import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, gql, useMutation } from "@apollo/client";

import Card from "../Card/DashboardCard";

import {
  DashboardContainer,
  EventList,
  DashboardTitle,
} from "../Dashboard/Dashboard.style";
const mobile = require("is-mobile");

const MyEvents = ({ eventCards, user, loading, data, trigger, setTrigger }) => {
  var myAwaitedEvents = eventCards.filter((e) =>
    e.ev_waiting_list.includes(user)
  );

  //accordion state and function
  const [show, setShow] = useState(mobile() ? false : true);
  const handleOpen = () => {
    setShow(!show); // Toggle accordion
  };

  return (
    <div>
      {loading ? (
        <h1 style={{ color: "white", textAlign: "center" }}>
          Loading events...
        </h1>
      ) : myAwaitedEvents.length > 0 ? (
        <DashboardContainer>
          <DashboardTitle onClick={handleOpen}>MY WAITING LIST</DashboardTitle>
          <EventList>
            {show
              ? data &&
                myAwaitedEvents.map((e) => (
                  <Card
                    key={e.id}
                    event={e}
                    user={user}
                    trigger={trigger}
                    setTrigger={setTrigger}
                  />
                ))
              : true}
          </EventList>
        </DashboardContainer>
      ) : (
        true
      )}
    </div>
  );
};

export default MyEvents;
