import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  background-color: #032b43;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const UserBioColumn = styled.div`
  width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
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
  padding: 1rem;
  margin-bottom: 5vh;
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

// export const SettingsColumn = styled.div`
//   width: 100%;
//   margin-top: 5vh;
// `;

export const SettingsContainer = styled.div`
  width: 100%;
`;

export const OrgEventsContainer = styled.div`
  width: 50%;
  // background-color: green;
`;
