import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, gql, useMutation } from "@apollo/client";
// import Card from "../Card/MyEventsCard";
import Card from "../Card/DashboardCard";
// import {
//   DashboardContainer,
//   EventList,
//   MyEventsTitle,
//   StyledCollapsible,
// } from "../MyEvents/MyEvents.style";
import {
  DashboardContainer,
  EventList,
  DashboardTitle,
} from "../Dashboard/Dashboard.style";
import Collapsible from "react-collapsible";

const MyEvents = ({ eventCards, user, loading, data }) => {
  var myAwaitedEvents = eventCards.filter((e) =>
    e.ev_waiting_list.includes(user)
  );

  return (
    <div>
      {loading ? (
        <h1 style={{ color: "white", textAlign: "center" }}>
          Loading events...
        </h1>
      ) : myAwaitedEvents.length > 0 ? (
        <DashboardContainer>
          {/* <StyledCollapsible trigger={"MY WAITING LIST"} open="true"> */}
          <DashboardTitle>MY WAITING LIST</DashboardTitle>
          <EventList>
            {data &&
              myAwaitedEvents.map((e) => (
                <Card key={e.id} event={e} user={user} />
              ))}
          </EventList>
          {/* </StyledCollapsible> */}
        </DashboardContainer>
      ) : (
        true
      )}
    </div>
  );
};

export default MyEvents;
