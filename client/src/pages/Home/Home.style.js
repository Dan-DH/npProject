import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const HomeContainer = styled.div`
  background-color: #032b43;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: row;
`;
export const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  // background-color: pink;
  width: 40%;
  overflow: scroll;
`;
// export const CreateEvent = styled.div`
//   background-color: blue;
// `;
// export const Myevents = styled.div`
//   background-color: red;
// `;
export const RightCol = styled.div`
  //   background-color: lightgrey;
  width: 60%;
  overflow: scroll;
`;
// export const Dashboard = styled.div`
//   background-color: teal;
// `;
