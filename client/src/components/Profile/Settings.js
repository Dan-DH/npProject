import { React, useState } from "react";
import {
  FormContainer,
  FormTitle,
  FormForm,
  Label,
  Input,
  Submit,
} from "./Settings.Style";

import { gql, useMutation } from "@apollo/client";

function Settings({ geek }) {
  const [userSettings, setUserSettings] = useState({
    userId: geek.id,
    username: "",
    email: "",
    profilePic: "",
    password: "",
    cpassword: "",
  });

  //   console.log(userSettings);

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
            //   lazyGetUser(); //render page with user info with GetUser lazy query
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <Label>
          <p>Change username</p>
          <Input type="text" name="username" onChange={handleInputs} />
        </Label>

        <Label>
          <p>Change email</p>
          <Input type="text" name="email" onChange={handleInputs} />
        </Label>
        <Label>
          <p>Change profile picture</p>
          <Input
            type="text"
            name="email"
            onChange={handleInputs}
            placeholder="Paste direct link to picture..."
          />
        </Label>
        <Label>
          <p>Change password</p>
          <Input
            type="text"
            name="password"
            onChange={handleInputs}
            placeholder="Min 6 characters, a number and an uppercase letter"
          />
        </Label>
        <Label>
          <p>Confirm new password</p>
          <Input type="text" name="cpassword" onChange={handleInputs} />
        </Label>
        <Submit>Create</Submit>
      </FormForm>
    </FormContainer>
  );
}

export default Settings;
