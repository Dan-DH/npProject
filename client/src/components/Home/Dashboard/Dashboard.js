import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, gql, useMutation } from "@apollo/client";
import Card from "../Card/DashboardCard";
import {
  DashboardContainer,
  EventList,
  DashboardTitle,
} from "./Dashboard.style";

const Dashboard = ({
  eventCards,
  user,
  loading,
  data,
  trigger,
  setTrigger,
}) => {
  return (
    <DashboardContainer>
      <DashboardTitle>UPCOMING EVENTS</DashboardTitle>
      {loading ? (
        <h1>Loading events...</h1>
      ) : (
        <EventList>
          {data &&
            eventCards.map((event) => (
              <Card
                key={event.id}
                event={event}
                user={user}
                trigger={trigger}
                setTrigger={setTrigger}
              />
            ))}
        </EventList>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
