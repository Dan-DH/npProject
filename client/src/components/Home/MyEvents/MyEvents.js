import { React, useEffect, useState } from "react";
// import Card from "../Card/MyEventsCard";
import Card from "../Card/DashboardCard";
import { MyEventsContainer, EventList, MyEventsTitle } from "./MyEvents.style";
import EmptyCard from "../../../components/Home/Card/EmptyCard";
const mobile = require("is-mobile");

const MyEvents = ({ eventCards, user, loading, data, trigger, setTrigger }) => {
  var myEvents = eventCards.filter((e) => e.ev_participants.includes(user));

  //accordion state and function
  const [show, setShow] = useState(mobile() ? false : true);
  const handleOpen = () => {
    setShow(!show); // Toggle accordion
  };

  return (
    <MyEventsContainer>
      <MyEventsTitle onClick={handleOpen}>MY EVENTS</MyEventsTitle>
      {show ? (
        loading ? (
          <h1 style={{ color: "white", textAlign: "center" }}>
            Loading events...
          </h1>
        ) : (
          <EventList>
            {data && myEvents.length > 0 ? (
              myEvents.map((e) => (
                <Card
                  key={e.id}
                  event={e}
                  user={user}
                  trigger={trigger}
                  setTrigger={setTrigger}
                />
              ))
            ) : (
              <EmptyCard />
            )}
          </EventList>
        )
      ) : (
        true
      )}
    </MyEventsContainer>
  );
};

export default MyEvents;
