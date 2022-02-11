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

  return (
    <FormContainer>
      <FormTitle>CREATE AN EVENT</FormTitle>
      <br />
      <FormForm
        onSubmit={async (e) => {
          try {
            e.preventDefault();

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
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <Label>
          <p>Event name</p>
          <Input
            type="text"
            name="evName"
            onChange={handleInputs}
            placeholder="..."
            required
          />
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
          <Input
            type="text"
            name="evLocation"
            onChange={handleInputs}
            placeholder="..."
            required
          />
        </Label>
        <Label>
          <p>Start time</p>
          <Input
            type="datetime-local"
            name="evStart"
            onChange={handleInputs}
            placeholder="..."
            required
          />
        </Label>
        <Label>
          <p>End time</p>
          <Input
            type="datetime-local"
            name="evEnd"
            onChange={handleInputs}
            placeholder="..."
            required
          />
        </Label>
        <Label>
          <p>Max participants</p>
          <Input
            type="number"
            name="evMaxParticipants"
            onChange={handleInputs}
            required
          />
        </Label>
        <Label>
          <p>Event description</p>
          <TextArea
            name="evDescription"
            onChange={handleInputs}
            placeholder="..."
          />
        </Label>
        <Submit>Create</Submit>
      </FormForm>
    </FormContainer>
  );
};

export default CreateEvent;
