import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const FooterContainer = styled.div`
  background: black;
  height: 8vh;
  margin-top: auto;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  // z-index: 12;
`;

export const FooterLink = styled.a`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;

export const FooterMenu = styled.div`
  display: flex;
  align-items: center;

  // @media screen and (max-width: 768px) {
  //   display: none;
  // }
`;

export const FooterBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5vw;

  // @media screen and (max-width: 768px) {
  //   display: none;
  // }
`;

export const FooterBtnLink = styled(Link)`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;

export const Span = styled.span`
  color: white;
`;
