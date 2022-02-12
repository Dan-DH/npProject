import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, gql, useMutation } from "@apollo/client";
import Card from "../Card/MyEventsCard";
import {
  MyEventsContainer,
  EventList,
  MyEventsTitle,
  StyledCollapsible,
} from "../MyEvents/MyEvents.style";
import EmptyCard from "../Card/EmptyCard";
import Collapsible from "react-collapsible";

const MyEvents = ({ eventCards, user, loading, data }) => {
  var myAwaitedEvents = eventCards.filter((e) =>
    e.ev_waiting_list.includes(user)
  );

  return (
    <div>
      {loading ? (
        <h1>Loading events...</h1>
      ) : myAwaitedEvents.length > 0 ? (
        <MyEventsContainer>
          <StyledCollapsible trigger={"MY WAITING LIST"} open="true">
            <EventList>
              {data &&
                myAwaitedEvents.map((e) => (
                  <Card key={e.id} event={e} user={user} />
                ))}
            </EventList>
          </StyledCollapsible>
        </MyEventsContainer>
      ) : (
        true
      )}
    </div>
  );
};

export default MyEvents;
