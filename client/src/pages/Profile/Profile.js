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
  Submit,
  OrgEventsContainer,
  SettingsContainer,
} from "./Profile.Style";

import Settings from "../../components/Profile/Settings";
import MyEvents from "../../components/Home/MyEvents/MyEvents";

function Profile({ geek, eventCards, setEventCards }) {
  const GET_EVENTS = gql`
    query GetEvents {
      getEvents {
        id
        ev_organizer
        ev_name
        ev_type
        ev_language
        ev_online
        ev_creation_date
        # ev_start_date
        # ev_end_date
        ev_location
        ev_description
        ev_max_participants
        ev_participants
      }
    }
  `;
  console.log(window.location.href);
  const { loading, data, error } = useQuery(GET_EVENTS);
  console.log(geek);
  return (
    <HeaderContainer>
      <Row>
        <UserImageContainer>
          <UserImage src={geek.profilePic} alt="profile picture" />
        </UserImageContainer>
        <UserBioContainer>
          <UserBio>{geek.bio}</UserBio>
          <form>
            <UserBioInput placeholder="Tell the guys something about yourself :)" />
            <br />
            <Submit>Post</Submit>
          </form>
        </UserBioContainer>
      </Row>
      <Row>
        <SettingsContainer>
          <Settings geek={geek} />
        </SettingsContainer>
        <OrgEventsContainer>
          <MyEvents
            eventCards={eventCards}
            user={geek.id}
            loading={loading}
            data={data}
          />
        </OrgEventsContainer>
      </Row>
    </HeaderContainer>
  );
}

export default Profile;
