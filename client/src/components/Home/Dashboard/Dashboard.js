import { React, useEffect, useState, Fragment } from "react";
import ReactTooltip from "react-tooltip";
import Card from "../Card/DashboardCard";
import {
  DashboardContainer,
  EventList,
  DashboardTitle,
} from "./Dashboard.style";
import EmptyCard from "../Card/EmptyCard";
const mobile = require("is-mobile");

const Dashboard = ({
  eventCards,
  user,
  loading,
  data,
  trigger,
  setTrigger,
}) => {
  const myOrganizedEvents = eventCards.filter((e) => e.ev_organizer === user);
  const pathCheck = window.location.href.indexOf("profile");

  //accordion state and function
  const [show, setShow] = useState(mobile() ? false : true);
  const handleOpen = () => {
    setShow(!show); // Toggle accordion
  };

  return (
    <DashboardContainer>
      <DashboardTitle onClick={handleOpen}>
        {pathCheck === -1 ? "UPCOMING EVENTS" : "ORGANIZED EVENTS"}
      </DashboardTitle>
      {show ? (
        loading ? (
          <h1 style={{ color: "white", textAlign: "center" }}>
            Loading events...
          </h1>
        ) : (
          <EventList>
            {data && pathCheck === -1 ? (
              eventCards.map((event) => (
                <Card
                  key={event.id}
                  event={event}
                  user={user}
                  trigger={trigger}
                  setTrigger={setTrigger}
                  pathCheck={pathCheck}
                />
              ))
            ) : myOrganizedEvents.length > 0 ? (
              myOrganizedEvents.map((event) => (
                <Card
                  key={event.id}
                  event={event}
                  user={user}
                  trigger={trigger}
                  setTrigger={setTrigger}
                  pathCheck={pathCheck}
                />
              ))
            ) : (
              <EmptyCard myOrganizedEvents={myOrganizedEvents} />
            )}
          </EventList>
        )
      ) : (
        true
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
