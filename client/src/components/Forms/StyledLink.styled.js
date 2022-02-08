import styled from "styled-components";
import { Link } from "react-router-dom";
import { DeviceMin, DeviceMax } from "../Breakpoints";
export const StyledLinkDiv = styled.div`
  @media ${DeviceMax.sm} {
    color: #b32201;
    font-size: 13px;
    font-weight: bold;
    margin-top: 1rem;
  }
  @media ${DeviceMin.sm} {
    color: #b32201;
    font-size: 14px;
    margin-top: 0.4rem;
  }
  @media ${DeviceMin.md} {
    font-size: 16px;
    margin-top: 0.5rem;
  }
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #b32201;
`;
