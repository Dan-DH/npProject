import React from "react";

import {
  Nav,
  NavLogo,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./Navbar.style";

import logoImg from "../../assets/images/gitBanner.png";

const Navbar = ({ geek, setGeek }) => {
  return (
    <>
      <Nav>
        <NavLogo src={logoImg} />
        <NavMenu>
          <NavLink to="/profile/me">Profile</NavLink>
          <NavBtn>
            <NavBtnLink
              to="/login"
              onClick={() => localStorage.removeItem("auth_token")}
            >
              Logout
            </NavBtnLink>
          </NavBtn>
        </NavMenu>
      </Nav>
    </>
  );
};
export default Navbar;
