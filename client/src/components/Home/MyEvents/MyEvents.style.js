import styled from "styled-components";
import { DeviceMin } from "../../Breakpoints";

export const MyEventsContainer = styled.div`
  width: 100%;
  margin-top: 5vh;
`;

export const EventList = styled.ul``;

export const MyEventsTitle = styled.h1`
  color: white;
  text-align: center;
  background-color: #b32201;
  width: 80%;
  margin: 0 auto;
  cursor: pointer;

  // @media ${DeviceMin.md} {
  //   width 80%;
  //   width: 50%;

  // }
`;
