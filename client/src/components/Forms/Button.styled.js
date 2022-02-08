import styled from "styled-components";
import { DeviceMin } from "../Breakpoints";
export const StyledButton = styled.button`
  border: 2px solid #b32201;
  background: #b32201;
  color: white;
  cursor: pointer;
  @media ${DeviceMin.xs} {
    width: 87%;
    border-radius: 0.3rem;
    font-size: 14px;
    margin: 0 0 0.4rem 0;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  }
  @media ${DeviceMin.sm} {
    width: 86%;
    border-radius: 0.4rem;
    margin: 0 0 0.5rem 0;
  }
  @media ${DeviceMin.md} {
    width: 87%;
    border-radius: 0.5rem;
    font-size: 16px;
    margin: 0 0 0.5rem 0;
    padding: 0.6rem 0 0.6rem 0;
  }
  @media ${DeviceMin.lg} {
    width: 86%;
    margin: 0 0 1.5rem 0;
  }
  @media ${DeviceMin.xl} {
    width: 85%;
    margin: 0 0 1.5rem 0;
    padding: 1rem 0 1rem 0;
    font-size: 17px;
  }
  @media ${DeviceMin.xxl} {
    width: 84%;
    padding: 1.4rem 0 1.4rem 0;
  }
`;
