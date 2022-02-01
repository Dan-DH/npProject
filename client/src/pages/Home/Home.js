import { React, useEffect, useState } from "react";
import { CreateEvent } from "../../components/Home/CreateEvent/CreateEvent";
import { Calendar } from "../../components/Home/Calendar/Calendar";
import MyEvents from "../../components/Home/MyEvents/MyEvents";
import { Filters } from "../../components/Home/Filters/Filters";
import Dashboard from "../../components/Home/Dashboard/Dashboard";
import { HomeContainer, LeftCol, RightCol } from "./Home.style";
import { useQuery, gql, useMutation } from "@apollo/client";

function Home() {
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
        # ev_start_date
        # ev_end_date
        ev_location
        ev_description
        ev_max_participants
        ev_participants
      }
    }
  `;

  const hermes = "61f27e57bc5b29fa650b2667"; //to take this from token.id

  const [eventCards, setEventCards] = useState([]);
  const { loading, data, error } = useQuery(GET_EVENTS);

  useEffect(() => {
    if (data) {
      setEventCards([...data.getEvents]);
    }
  }, [data]);

  return (
    <div>
      <HomeContainer>
        <LeftCol>
          <CreateEvent />
          <MyEvents
            eventCards={eventCards}
            user={hermes}
            loading={loading}
            data={data}
          />
        </LeftCol>
        <RightCol>
          <Filters />
          <Dashboard
            eventCards={eventCards}
            user={hermes}
            loading={loading}
            data={data}
          />
        </RightCol>
      </HomeContainer>
    </div>
  );
}

export default Home;
