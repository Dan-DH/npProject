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

import { useQuery, gql, useMutation } from "@apollo/client";

const CreateEvent = ({
  eventCards,
  user,
  loading,
  data,
  trigger,
  setTrigger,
}) => {
  const [eventLog, setEventLog] = useState({
    evOrganizer: "61f27e57bc5b29fa650b2667",
    evName: "",
    evType: "",
    evOnline: "",
    evLocation: "",
    evParticipants: 0,
  });

  const CREATE_EVENT = gql`
    mutation CreateEvent(
      $evOrganizer: String!
      $evName: String!
      $evType: String!
      $evOnline: Boolean!
      $evLocation: String!
      $evParticipants: [String]!
    ) {
      createEvent(
        ev_organizer: $evOrganizer
        ev_name: $evName
        ev_type: $evType
        ev_online: $evOnline
        ev_location: $evLocation
        ev_participants: $evParticipants
      ) {
        id
      }
    }
  `;

  const [logEvent] = useMutation(CREATE_EVENT);

  const handleInputs = (e) => {
    setEventLog({ ...eventLog, [e.target.name]: e.target.value });
    console.log(e.target.name);
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
                ev_organizer: eventLog.evOrganizer,
                ev_name: eventLog.evName,
                ev_type: eventLog.evType,
                ev_online: eventLog.evOnline,
                ev_location: eventLog.evLocation,
                ev_participants: [eventLog.evParticipants],
                //   ev_description: eventLog.evDescription,
              },
            });
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
              Boardgames
            </FormOption>
            <FormOption value="CardGames" name="evType">
              Card games
            </FormOption>
            <FormOption value="Hangout" name="evType">
              Hangout
            </FormOption>
            <FormOption value="Videogames" name="evType">
              Videogames
            </FormOption>
          </FormSelect>
        </Label>
        <Label>
          <p>Online?</p>
          <FormSelect name="evOnline" onChange={handleInputs}>
            <FormOption value={true} name="evOnLine">
              Online
            </FormOption>
            <FormOption value={false} name="evOnLine">
              In person
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
          <Input type="number" name="evParticipants" onChange={handleInputs} />
        </Label>
        <Label>
          <p>Event description</p>
          <TextArea name="evDescription" onChange={handleInputs} />
        </Label>
        <Submit type="submit" value="Create" />
      </FormForm>
    </FormContainer>
  );
};

export default CreateEvent;
