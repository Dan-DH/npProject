import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import { DeviceMin } from "../../components/Breakpoints";

export const HomeContainer = styled.div`
  background-color: #032b43;
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;

  @media ${DeviceMin.lg} {
    flex-direction: row;
    align-items: unset;
  }
`;
export const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${DeviceMin.lg} {
    width: 40%;
    overflow: scroll;
  }
`;

export const RightCol = styled.div`
  width: 100%;

  @media ${DeviceMin.lg} {
    width: 60%;
    overflow: scroll;
  }
`;
