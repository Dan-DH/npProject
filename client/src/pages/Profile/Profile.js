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
  UserBioColumn,
  SettingsColumn,
} from "./Profile.Style";

import Settings from "../../components/Profile/Settings";
import MyEvents from "../../components/Home/MyEvents/MyEvents";

function Profile({ geek, setGeek, eventCards, setEventCards }) {
  //populating organized events
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

  const { loading, data, error } = useQuery(GET_EVENTS);

  //posting bio
  const [userBio, setUserBio] = useState({
    userId: geek.id,
    bio: "",
  });
  const CHANGE_BIO_USER = gql`
    mutation ChangeBioUser($userId: ID!, $bio: String!) {
      changeBioUser(userId: $userId, bio: $bio) {
        id
        bio
      }
    }
  `;
  const [updateBio] = useMutation(CHANGE_BIO_USER);
  const handleChange = (e) => {
    setUserBio({ ...userBio, [e.target.name]: e.target.value });
  };
  return (
    <HeaderContainer>
      <Row>
        <UserBioColumn>
          <UserImageContainer>
            <UserImage src={geek.profilePic} alt="profile picture" />
          </UserImageContainer>
          <UserBioContainer>
            <UserBio>{geek.bio}</UserBio>
            <form
              onSubmit={async (e) => {
                try {
                  e.preventDefault();
                  await updateBio({
                    variables: userBio,
                  });
                  setGeek({ ...geek, bio: userBio.bio });
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              <UserBioInput
                placeholder="Tell the guys something about yourself :)"
                onChange={handleChange}
                name="bio"
                required
              />
              <br />
              <Submit>Post</Submit>
            </form>
          </UserBioContainer>
          <SettingsContainer>
            <Settings geek={geek} />
          </SettingsContainer>
        </UserBioColumn>
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
