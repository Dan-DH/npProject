import styled from "styled-components";
import { DeviceMin } from "../../Breakpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

export const ReactTooltipStyled = styled(ReactTooltip)`
  max-width: 150px;
`;

export const CardContainerList = styled.li`
  list-style: none;
  margin: 2vh 0;
`;

export const CardContainer = styled.div`
  margin: 2vh auto 2vh auto;
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 10vh;
`;

export const CardImage = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardImageIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 3vw;
`;

export const InfoBox = styled.div`
  width: 70%;
  background-color: #353944;
  color: white;
  padding: 0 1vh;
  overflow: auto;
  white-space: nowrap;
`;

export const CardTitle = styled.h2``;

export const CardDescription = styled.p``;

export const CardLocation = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LocationIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 2vh;
`;

export const LocationText = styled.p`
  margin-left: 1vh;
`;

export const DatesDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CardStartDate = styled.p``;

export const CardEndDate = styled.p`
  margin: 0 0 0 1vh;
`;

export const CardParticipants = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ParticipantsIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 2vh;
`;

export const NumberOfParticipants = styled.p`
  margin: 0 0 0 1vh;
`;

export const UserIconContainer = styled.div`
  cursor: pointer;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 3vw;
  margin: auto;
`;

export const DeleteEventContainer = styled.div`
  background-color: #b32201;
  cursor: pointer;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DeleteIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 3vw;
  margin-top: 1vh;
`;
