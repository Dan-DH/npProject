import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, gql, useMutation } from "@apollo/client";
import Card from "../Card/MyEventsCard";
import { MyEventsContainer, EventList, MyEventsTitle } from "./MyEvents.style";

const MyEvents = ({ eventCards, user, loading, data }) => {
  // var myEvents = eventCards.filter((e) => e.ev_participants.includes(user));

  const pathCheck = window.location.href.indexOf("profile");

  return (
    <MyEventsContainer>
      <MyEventsTitle>
        {pathCheck === -1 ? "MY EVENTS" : "ORGANIZED EVENTS"}
      </MyEventsTitle>
      {loading ? (
        <h1>Loading events...</h1>
      ) : (
        <EventList>
          {data && pathCheck === -1
            ? eventCards
                .filter((e) => e.ev_participants.includes(user))
                .map((e) => (
                  <Card key={e.id} event={e} user={user} /> //to take this from token.id
                ))
            : eventCards
                .filter((e) => e.ev_organizer === user)
                .map((e) => (
                  <Card key={e.id} event={e} user={user} /> //to take this from token.id
                ))}
        </EventList>
      )}
    </MyEventsContainer>
  );
};

export default MyEvents;
