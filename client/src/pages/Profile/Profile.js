import { React, useState } from "react";
import { useNavigate } from "react-router";
import { gql, useQuery, useMutation } from "@apollo/client";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faDiceD20,
//   faGamepad,
//   faUser,
//   faDice,
//   faBeer,
// } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const GET_EVENTS = gql`
    query GetEvents {
      getEvents {
        id
        ev_organizer
        ev_name
      }
    }
  `;

  const { loading, data, error } = useQuery(GET_EVENTS);

  return (
    <div>
      {loading ? (
        <h1>Loading events..</h1>
      ) : (
        <ul>
          {data &&
            data.getEvents.map((event, index) => (
              <li key={index}>{event.id}</li>
            ))}
        </ul>
      )}

      {/* <FontAwesomeIcon icon={faDiceD20} />
      <FontAwesomeIcon icon={faGamepad} />
      <FontAwesomeIcon icon={faUser} />
      <FontAwesomeIcon icon={faDice} />
      <FontAwesomeIcon icon={faBeer} /> */}
    </div>
  );
}

export default Profile;
