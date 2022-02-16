import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import { DeviceMin } from "../../components/Breakpoints";

export const HeaderContainer = styled.div`
  background-color: #032b43;
  min-height: 80vh;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${DeviceMin.lg} {
    flex-direction: row;
  }
`;

export const UserBioColumn = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;

  @media ${DeviceMin.lg} {
    width: 50%;
  }
`;

export const UserImageContainer = styled.div`
  text-align: center;
  margin-top: 10vh;
`;

export const UserImage = styled.img`
  border-radius: 50%;
  width: 20vh;
  height: 20vh;
  border: 10px solid #ffba08;
`;

export const UserBioContainer = styled.div`
  // background-color: green;
  text-align: center;
  // padding: 1rem;
  margin-bottom: 5vh;
  width: 100%;
`;

export const Form = styled.form`
  margin: 0;
  padding: 0;
  // background-color: pink;
`;

export const UserBio = styled.p`
  font-size: 1.2rem;
  margin: 2vh 0;
  color: white;
`;

export const UserBioInput = styled.textarea`
  width: 20rem;
  height 5rem;
  font-size: 1rem;
  background-color: #353944;
  border: 1px solid white;
  color: white;
  padding: 10px;
`;

export const Submit = styled.button`
  margin-top: 1vh;
  width: 20vh;
  height: 5vh;
  font-size: 1.3rem;
  background-color: #b32201;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const SettingsContainer = styled.div`
  width: 100%;
`;

export const OrgEventsContainer = styled.div`
  width: 100%;
  // background-color: green;

  @media ${DeviceMin.lg} {
    width: 50%;
  }
`;
