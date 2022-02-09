import React, { useState } from "react";
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
  ReactTooltipStyled,
} from "./MyEventsCard.style";
import { useQuery, gql, useMutation } from "@apollo/client";

function Card({ event, user }) {
  const iconObject = {
    Boardgames: faDice,
    Hangout: faBeer,
    Roleplaying: faDiceD20,
    Videogames: faGamepad,
  };

  const iconColor = {
    Boardgames: "#2a9d8f",
    Hangout: "#ffba08",
    Roleplaying: "#b32201",
    Videogames: "#087ca7",
  };

  const onLine = event.ev_online ? faWifi : faMapMarkedAlt;

  const [isAttending, setIsAttending] = useState(
    event.ev_participants.includes(user)
  );

  const attending = isAttending ? "green" : "grey";

  const ATTEND = gql`
    mutation Attend($userId: ID!, $eventId: ID!) {
      attend(userId: $userId, eventId: $eventId)
    }
  `;

  const [userAttend] = useMutation(ATTEND);

  function getEventDates(e) {
    if (e !== null) {
      e = new Date(e);
      return `${e.getDate()}/${e.getMonth() + 1}/${e.getFullYear()} ${
        e.getUTCHours() + 1
      }:${e.getMinutes() === 0 ? e.getMinutes() + "0" : e.getMinutes()}`;
    }
  }

  return (
    <CardContainerList data-tip data-for={event.id}>
      <CardContainer>
        <CardImage
          style={{
            backgroundColor: iconColor[event.ev_type],
          }}
        >
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
            <CardStartDate>
              From {getEventDates(event.ev_start_date)}
            </CardStartDate>
            <CardEndDate>to {getEventDates(event.ev_end_date)}</CardEndDate>
          </DatesDiv>
          <CardParticipants>
            <ParticipantsIcon icon={faUser} />
            <NumberOfParticipants>
              {event.ev_participants.length}/{event.ev_max_participants}
            </NumberOfParticipants>
          </CardParticipants>
        </InfoBox>
      </CardContainer>
      <ReactTooltipStyled id={event.id} place="bottom" type="dark">
        {event.ev_description
          ? event.ev_description
          : "This event has no description"}
      </ReactTooltipStyled>
    </CardContainerList>
  );
}

export default Card;
