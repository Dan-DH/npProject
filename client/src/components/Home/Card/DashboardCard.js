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
  UserIcon,
  UserIconContainer,
  ReactTooltipStyled,
} from "./DashboardCard.style";
import { gql, useMutation } from "@apollo/client";

function Card({ event, user, trigger, setTrigger }) {
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

  const onLine = event.ev_online === "true" ? faWifi : faMapMarkedAlt;

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
        <UserIconContainer
          style={{ backgroundColor: attending }}
          onClick={async () => {
            await userAttend({
              variables: {
                userId: user,
                eventId: event.id,
              },
            });
            setIsAttending(!isAttending);
            setTrigger(!trigger);
          }}
        >
          <UserIcon icon={faUser} />
        </UserIconContainer>
      </CardContainer>
      <ReactTooltipStyled id={event.id} place="bottom" type="dark">
        {event.ev_description
          ? event.ev_description
          : "This event has no description"}
        <br />
        <img
          src="https://ih0.redbubble.net/image.430476749.0382/flat,800x800,070,f.u4.jpg"
          alt="profile"
          style={{ width: "50px" }}
        />
      </ReactTooltipStyled>
    </CardContainerList>
  );
}

export default Card;
