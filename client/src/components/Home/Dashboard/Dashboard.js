import { React, useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router";
import { useQuery, gql, useMutation } from "@apollo/client";
import ReactTooltip from "react-tooltip";
import Card from "../Card/DashboardCard";
import {
  DashboardContainer,
  EventList,
  DashboardTitle,
} from "./Dashboard.style";
import EmptyCard from "../Card/EmptyCard";

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
  return (
    <DashboardContainer>
      <DashboardTitle>
        {pathCheck === -1 ? "UPCOMING EVENTS" : "ORGANIZED EVENTS"}
      </DashboardTitle>
      {loading ? (
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
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
