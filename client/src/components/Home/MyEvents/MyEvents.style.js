import styled from "styled-components";
import { DeviceMin } from "../../Breakpoints";
import Collapsible from "react-collapsible";

export const MyEventsContainer = styled.div`
  width: 100%;
  margin-top: 5vh;
`;

export const EventList = styled.ul``;

export const StyledCollapsible = styled(Collapsible)`
  color: white;
  text-align: center;
  background-color: #b32201;
  width: 80%;
  margin: 0 auto;
  font-size: 2em;

  .is-open {
    color: white;
    text-align: center;
    background-color: #b32201;
    width: 80%;
    margin: 0 auto;
    font-size: 2em;
  }

  // // @media ${DeviceMin.md} {
  // //   width 80%;
  // //   width: 50%;

  // // }
`;

// export const MyEventsTitle = styled.h1`
//   color: white;
//   text-align: center;
//   background-color: #b32201;
//   width: 80%;
//   margin: 0 auto;

//   // @media ${DeviceMin.md} {
//   //   width 80%;
//   //   width: 50%;

//   // }
// `;
