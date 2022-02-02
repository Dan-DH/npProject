import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceD20,
  faGamepad,
  faUser,
  faDice,
  faBeer,
  faWifi,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";

import {
  CardContainer,
  CardImage,
  InfoBox,
  CardTitle,
  CardDescription,
  CardLocation,
  LocationIcon,
  LocationText,
  CardStartDate,
  CardEndDate,
  CardParticipants,
  NumberOfParticipants,
  DatesDiv,
  CardImageIcon,
  ParticipantsIcon,
  CardContainerList,
  UserIcon,
  UserIconContainer,
} from "./MyEventsCard.style";
import { useQuery, gql, useMutation } from "@apollo/client";

function Card({ event, user }) {
  const iconObject = {
    Boardgames: faDice,
    Hangout: faBeer,
    Roleplaying: faDiceD20,
    Videogames: faGamepad,
  };

  const onLine = event.ev_online ? faWifi : faMapMarkedAlt;

  const [isAttending, setIsAttending] = useState(
    event.ev_participants.includes(user)
  );

  const attending = isAttending ? "green" : "grey";

  // useEffect(()=> {

  // })

  const ATTEND = gql`
    mutation Attend($userId: ID!, $eventId: ID!) {
      attend(userId: $userId, eventId: $eventId)
    }
  `;

  const [userAttend] = useMutation(ATTEND);

  return (
    <CardContainerList>
      <CardContainer>
        <CardImage>
          {" "}
          <CardImageIcon icon={iconObject[event.ev_type]} />
        </CardImage>
        <InfoBox>
          <CardTitle>{event.ev_name}</CardTitle>
          {/* <CardDescription>
          Low-power cube, open to beginners. Come learn to draft, stay for the
          laughs.
        </CardDescription> */}
          <CardLocation>
            <LocationIcon icon={onLine} />
            <LocationText>{event.ev_location}</LocationText>
          </CardLocation>
          <DatesDiv>
            <CardStartDate>Begins: 04/02/22 3PM</CardStartDate>
            <CardEndDate>Ends: 04/02/22 10PM</CardEndDate>
          </DatesDiv>
          <CardParticipants>
            <ParticipantsIcon icon={faUser} />
            <NumberOfParticipants>
              {event.ev_participants.length}/{event.ev_max_participants}
            </NumberOfParticipants>
          </CardParticipants>
        </InfoBox>
      </CardContainer>
    </CardContainerList>
  );
}

export default Card;
