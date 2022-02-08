import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import { DeviceMin } from "../Breakpoints";

export const Nav = styled.nav`
  background-color: #b32201;
  height: 12vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 12;
  border-bottom: 1px solid white;
`;

export const NavLogo = styled.img`
  max-width: 90%;

  @media ${DeviceMin.md} {
    max-width: 50%;
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  font-size: 1.5vh;
  min-width: fit-content;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 5vw;
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 1.5vh;
  margin-right: 1.5vh;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;
