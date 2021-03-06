import React, { useEffect, useState } from "react";

import {
  faDiceD20,
  faGamepad,
  faUser,
  faDice,
  faBeer,
  faWifi,
  faMapMarkedAlt,
  faTrash,
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
  DeleteEventContainer,
  DeleteIcon,
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

  const [isWaiting, setIsWaiting] = useState(
    event.ev_waiting_list.includes(user)
  );

  const waiting = () => {
    if (event.ev_waiting_list.includes(user)) {
      return "#e9892e";
    } else if (event.ev_participants.includes(user)) {
      return "green";
    } else {
      return "grey";
    }
  };

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
        {event.ev_organizer !== user ? (
          <UserIconContainer
            style={{ backgroundColor: waiting() }}
            onClick={async () => {
              var org_check;
              if (event.ev_organizer === user) {
                org_check = window.confirm(
                  "You are the organizer of this event. If you leave, the event will be deleted. This action cannot be undone."
                );
                if (!org_check) {
                  return false;
                }
              }
              await userAttend({
                variables: {
                  userId: user,
                  eventId: event.id,
                },
                onCompleted: ({ attend }) => {
                  if (attend === "Added to waiting list") {
                    window.alert(
                      "The event is full, you have been added to its waiting list"
                    );
                  }
                },
              });
              setTrigger(!trigger);
            }}
          >
            <UserIcon icon={faUser} />
          </UserIconContainer>
        ) : (
          <DeleteEventContainer
            onClick={async () => {
              const org_check = window.confirm(
                "This event will be deleted, and a notification email sent to its attendants. This action cannot be undone."
              );
              if (!org_check) {
                return false;
              }
              await userAttend({
                variables: {
                  userId: user,
                  eventId: event.id,
                },
              });
              setTrigger(!trigger);
            }}
          >
            <DeleteIcon icon={faTrash} />
          </DeleteEventContainer>
        )}
      </CardContainer>
      <ReactTooltipStyled id={event.id} place="bottom" type="dark">
        {event.ev_description
          ? event.ev_description
          : "This event has no description"}
        <br />
        {/* <img
          src="https://ih0.redbubble.net/image.430476749.0382/flat,800x800,070,f.u4.jpg"
          alt="profile"
          style={{ width: "50px" }}
        /> */}
      </ReactTooltipStyled>
    </CardContainerList>
  );
}

export default Card;
