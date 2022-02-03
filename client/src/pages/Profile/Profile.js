import { React, useState } from "react";
import { useNavigate } from "react-router";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  HeaderContainer,
  UserImageContainer,
  UserImage,
  UserBioContainer,
  UserBio,
  UserBioInput,
  Row,
} from "./Profile.Style";

import Settings from "../../components/Profile/Settings";

function Profile({ geek }) {
  const GET_EVENTS = gql`
    query GetEvents {
      getEvents {
        id
        ev_organizer
        ev_name
      }
    }
  `;

  const { loading, data, error } = useQuery(GET_EVENTS);

  return (
    <HeaderContainer>
      <Row>
        <UserImageContainer>
          <UserImage src={geek.profile_pic} alt="profile picture" />
        </UserImageContainer>
        <UserBioContainer>
          <UserBio />
          <UserBioInput></UserBioInput>
        </UserBioContainer>
      </Row>
      <Row>
        <Settings geek={geek} />
      </Row>
    </HeaderContainer>
  );
}

export default Profile;
