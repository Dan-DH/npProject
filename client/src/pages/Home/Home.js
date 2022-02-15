import { React, useEffect, useState } from "react";

import CreateEvent from "../../components/Home/CreateEvent/CreateEvent";
import MyEvents from "../../components/Home/MyEvents/MyEvents";
import MyAwaitedEvents from "../../components/Home/MyAwaitedEvents/MyAwaitedEvents";
import { Filters } from "../../components/Home/Filters/Filters";
import Dashboard from "../../components/Home/Dashboard/Dashboard";
import { HomeContainer, LeftCol, RightCol } from "./Home.style";
import { gql, useLazyQuery } from "@apollo/client";

function Home({ geek, setGeek, eventCards, setEventCards }) {
  const GET_EVENTS = gql`
    query GetEvents {
      getEvents {
        id
        ev_organizer
        ev_name
        ev_type
        ev_language
        ev_online
        ev_creation_date
        ev_start_date
        ev_end_date
        ev_location
        ev_description
        ev_max_participants
        ev_participants
        ev_waiting_list
      }
    }
  `;

  const user = geek.id;
  const [lazyEvents, { loading, data, error }] = useLazyQuery(GET_EVENTS);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    lazyEvents();
  }, [trigger]);

  useEffect(() => {
    if (data) {
      setEventCards([...data.getEvents]);
    }
  }, [data]);

  return (
    <div>
      <HomeContainer>
        <LeftCol>
          <MyEvents
            eventCards={eventCards}
            user={user}
            loading={loading}
            data={data}
            trigger={trigger}
            setTrigger={setTrigger}
          />
          <MyAwaitedEvents
            eventCards={eventCards}
            user={user}
            loading={loading}
            data={data}
            trigger={trigger}
            setTrigger={setTrigger}
          />
          <CreateEvent user={user} lazyEvents={lazyEvents} />
        </LeftCol>
        <RightCol>
          <Filters />
          <Dashboard
            eventCards={eventCards}
            user={user}
            loading={loading}
            data={data}
            trigger={trigger}
            setTrigger={setTrigger}
          />
        </RightCol>
      </HomeContainer>
    </div>
  );
}

export default Home;
