import { React, useState } from "react";
import {
  FormContainer,
  FormTitle,
  FormForm,
  Label,
  Input,
  Submit,
  Parag,
} from "./Settings.Style";

import { gql, useMutation } from "@apollo/client";

function Settings({ geek }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [userSettings, setUserSettings] = useState({
    userId: geek.id,
    username: "",
    email: "",
    profilePic: "",
    password: "",
    cpassword: "",
  });

  const CHANGE_INFO_USER = gql`
    mutation ChangeInfoUser(
      $userId: ID!
      $username: String!
      $email: String!
      $password: String!
      $profilePic: String!
    ) {
      changeInfoUser(
        userId: $userId
        username: $username
        email: $email
        password: $password
        profile_pic: $profilePic
      ) {
        id
        username
        email
        profile_pic
      }
    }
  `;

  const [updateInfo] = useMutation(CHANGE_INFO_USER);

  const handleInputs = (e) => {
    setUserSettings({ ...userSettings, [e.target.name]: e.target.value });
  };
  return (
    <FormContainer>
      <FormTitle>DATA UPDATE</FormTitle>
      <br />

      <FormForm
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            await updateInfo({
              variables: userSettings,
            });
            //TODO:   lazyGetUser(); //render page with user info with GetUser lazy query
            e.target.reset();
            setErrorMessage("");
          } catch (err) {
            setErrorMessage(err.message);
          }
        }}
      >
        <Label>
          <Parag>Change username</Parag>
          <Input
            type="text"
            name="username"
            onInput={handleInputs}
            placeholder="..."
          />
        </Label>

        <Label>
          <Parag>Change email</Parag>
          <Input
            type="text"
            name="email"
            onInput={handleInputs}
            placeholder="..."
          />
        </Label>
        <Label>
          <Parag>Change profile picture</Parag>
          <Input
            type="text"
            name="profilePic"
            onInput={handleInputs}
            placeholder="Paste direct link to picture"
          />
        </Label>
        <Label>
          <Parag>Change password</Parag>
          <Input
            type="text"
            name="password"
            onInput={handleInputs}
            placeholder="Min 6 characters, a number and an uppercase letter"
          />
        </Label>
        <Label>
          <Parag>Confirm new password</Parag>
          <Input
            type="text"
            name="cpassword"
            onInput={handleInputs}
            placeholder="..."
          />
        </Label>
        <br />
        <p style={{ color: "white" }}> {errorMessage}</p>
        <br />
        <Submit>Update</Submit>
      </FormForm>
    </FormContainer>
  );
}

export default Settings;
