import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, gql, useMutation } from "@apollo/client";
import Card from "../Card/MyEventsCard";
import { MyEventsContainer, EventList, MyEventsTitle } from "./MyEvents.style";
import EmptyCard from "../../../components/Home/Card/EmptyCard";

const MyEvents = ({ eventCards, user, loading, data }) => {
  var myEvents = eventCards.filter((e) => e.ev_participants.includes(user));
  var myOrganizedEvents = eventCards.filter((e) => e.ev_organizer === user);

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
          {data && pathCheck === -1 ? (
            myEvents.length > 0 ? (
              myEvents.map((e) => <Card key={e.id} event={e} user={user} />)
            ) : (
              <EmptyCard />
            )
          ) : myOrganizedEvents.length > 0 ? (
            myOrganizedEvents.map((e) => (
              <Card key={e.id} event={e} user={user} />
            ))
          ) : (
            <EmptyCard myOrganizedEvents={myOrganizedEvents} />
          )}
        </EventList>
      )}
    </MyEventsContainer>
  );
};

export default MyEvents;
