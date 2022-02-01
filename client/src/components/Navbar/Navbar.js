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

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLogo src={logoImg} />
        <NavMenu>
          <NavLink to="/profile">Profile</NavLink>
          <NavBtn>
            <NavBtnLink to="/login">Logout</NavBtnLink>
          </NavBtn>
        </NavMenu>
      </Nav>
    </>
  );
};
export default Navbar;
