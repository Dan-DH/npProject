import { React, useState } from "react";
import {
  FormContainer,
  FormTitle,
  FormForm,
  FormSelect,
  FormOption,
  Label,
  Input,
  Submit,
  TextArea,
  Paragraph,
} from "./CreateEvent.Style";

import { gql, useMutation } from "@apollo/client";

const mobile = require("is-mobile");

const CreateEvent = ({ user, lazyEvents }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [eventLog, setEventLog] = useState({
    evOrganizer: user,
    evName: "",
    evType: "Boardgames",
    evOnline: "false",
    evLocation: "",
    evStart: "",
    evEnd: "",
    evMaxParticipants: 0,
  });

  const CREATE_EVENT = gql`
    mutation CreateEvent(
      $evOrganizer: String!
      $evName: String!
      $evType: String!
      $evOnline: String!
      $evStartDate: Date!
      $evEndDate: Date!
      $evLocation: String!
      $evMaxParticipants: Int!
      $evDescription: String
    ) {
      createEvent(
        ev_organizer: $evOrganizer
        ev_name: $evName
        ev_type: $evType
        ev_online: $evOnline
        ev_start_date: $evStartDate
        ev_end_date: $evEndDate
        ev_location: $evLocation
        ev_max_participants: $evMaxParticipants
        ev_description: $evDescription
      ) {
        id
      }
    }
  `;

  const [logEvent] = useMutation(CREATE_EVENT);

  const handleInputs = (e) => {
    setEventLog({ ...eventLog, [e.target.name]: e.target.value });
  };

  //accordion state and function
  const [show, setShow] = useState(mobile() ? false : true);
  const handleOpen = () => {
    setShow(!show); // Toggle accordion
  };

  return (
    <FormContainer>
      <FormTitle onClick={handleOpen}>CREATE AN EVENT</FormTitle>
      <br />
      {show ? (
        <FormForm
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              const timeNow = new Date();

              if (timeNow.getTime() > new Date(eventLog.evStart).getTime()) {
                return setErrorMessage("Start date can't be in the past");
              }

              if (
                new Date(eventLog.evStart).getTime() >
                new Date(eventLog.evEnd).getTime()
              ) {
                return setErrorMessage("Start date must occur before end date");
              }

              await logEvent({
                variables: {
                  evOrganizer: eventLog.evOrganizer,
                  evName: eventLog.evName,
                  evType: eventLog.evType,
                  evOnline: eventLog.evOnline,
                  evLocation: eventLog.evLocation,
                  evMaxParticipants: parseInt(eventLog.evMaxParticipants),
                  evDescription: eventLog.evDescription,
                  evStartDate: eventLog.evStart,
                  evEndDate: eventLog.evEnd,
                },
              });
              e.target.reset();
              lazyEvents();
              setErrorMessage("");
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Label>
            <Paragraph>Event name</Paragraph>
            <Input
              type="text"
              name="evName"
              onChange={handleInputs}
              placeholder="..."
              required
            />
          </Label>
          <Label>
            <Paragraph>Event type</Paragraph>
            <FormSelect name="evType" onChange={handleInputs}>
              <FormOption value="Boardgames" name="evType">
                Board games
              </FormOption>
              <FormOption value="Hangout" name="evType">
                Hangout
              </FormOption>
              <FormOption value="Roleplaying" name="evType">
                Role games
              </FormOption>
              <FormOption value="Videogames" name="evType">
                Videogames
              </FormOption>
            </FormSelect>
          </Label>
          <Label>
            <Paragraph>Online?</Paragraph>
            <FormSelect name="evOnline" onChange={handleInputs}>
              <FormOption value={false} name="evOnLine">
                In person
              </FormOption>
              <FormOption value={true} name="evOnLine">
                Online
              </FormOption>
            </FormSelect>
          </Label>
          <Label>
            <Paragraph>Location</Paragraph>
            <Input
              type="text"
              name="evLocation"
              onChange={handleInputs}
              placeholder="..."
              required
            />
          </Label>
          <Label>
            <Paragraph>Start date</Paragraph>
            <Input
              type="datetime-local"
              name="evStart"
              onChange={handleInputs}
              placeholder="..."
              required
            />
          </Label>
          <Label>
            <Paragraph>End date</Paragraph>
            <Input
              type="datetime-local"
              name="evEnd"
              onChange={handleInputs}
              placeholder="..."
              required
            />
          </Label>
          <Label>
            <Paragraph>Max participants</Paragraph>
            <Input
              type="number"
              name="evMaxParticipants"
              onChange={handleInputs}
              required
            />
          </Label>
          <Label>
            <Paragraph>Event description</Paragraph>
            <TextArea
              name="evDescription"
              onChange={handleInputs}
              placeholder="..."
            />
          </Label>
          <br />
          <p style={{ color: "white", textAlign: "center" }}> {errorMessage}</p>
          <br />
          <Submit>Create</Submit>
        </FormForm>
      ) : (
        true
      )}
    </FormContainer>
  );
};

export default CreateEvent;
