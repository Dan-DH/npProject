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
} from "./CreateEvent.Style";

import { gql, useMutation } from "@apollo/client";

const CreateEvent = ({ user, lazyEvents }) => {
  const [eventLog, setEventLog] = useState({
    evOrganizer: user,
    evName: "",
    evType: "Boardgames",
    evOnline: "false",
    evLocation: "",
    evMaxParticipants: 0,
  });

  const CREATE_EVENT = gql`
    mutation CreateEvent(
      $evOrganizer: String!
      $evName: String!
      $evType: String!
      $evOnline: String!
      $evLocation: String!
      $evMaxParticipants: Int!
    ) {
      createEvent(
        ev_organizer: $evOrganizer
        ev_name: $evName
        ev_type: $evType
        ev_online: $evOnline
        ev_location: $evLocation
        ev_max_participants: $evMaxParticipants
      ) {
        id
      }
    }
  `;

  const [logEvent] = useMutation(CREATE_EVENT);

  const handleInputs = (e) => {
    setEventLog({ ...eventLog, [e.target.name]: e.target.value });
    console.log(e.target.name);
    console.log(e.target.value);
  };

  return (
    <FormContainer>
      <FormTitle>CREATE AN EVENT</FormTitle>
      <br />
      <FormForm
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            console.log(eventLog);
            await logEvent({
              variables: {
                evOrganizer: eventLog.evOrganizer,
                evName: eventLog.evName,
                evType: eventLog.evType,
                evOnline: eventLog.evOnline,
                evLocation: eventLog.evLocation,
                evMaxParticipants: parseInt(eventLog.evMaxParticipants),
                //   ev_description: eventLog.evDescription,
              },
            });
            lazyEvents();
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <Label>
          <p>Event name</p>
          <Input type="text" name="evName" onChange={handleInputs} />
        </Label>
        <Label>
          <p>Event type</p>
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
          <p>Online?</p>
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
          <p>Location</p>
          <Input type="text" name="evLocation" onChange={handleInputs} />
        </Label>
        <Label>
          <p>Start time</p>
          <Input type="text" name="evStart" onChange={handleInputs} />
        </Label>
        <Label>
          <p>End time</p>
          <Input type="text" name="evEnd" onChange={handleInputs} />
        </Label>
        <Label>
          <p>Max participants</p>
          <Input
            type="number"
            name="evMaxParticipants"
            onChange={handleInputs}
          />
        </Label>
        <Label>
          <p>Event description</p>
          <TextArea name="evDescription" onChange={handleInputs} />
        </Label>
        <Submit>Create</Submit>
      </FormForm>
    </FormContainer>
  );
};

export default CreateEvent;
