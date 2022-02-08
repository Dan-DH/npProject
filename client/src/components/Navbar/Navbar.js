import React from "react";
import { NavLink as Link } from "react-router-dom";

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
    <Nav>
      <Link to="/home">
        <NavLogo src={logoImg} />
      </Link>

      {!geek.id ? (
        <NavMenu>
          <NavLink to="/signup">Sign up</NavLink>
          <NavBtn>
            <NavBtnLink to="/login">Login</NavBtnLink>
          </NavBtn>
        </NavMenu>
      ) : (
        <NavMenu>
          <NavLink to="/profile/me">Profile</NavLink>
          <NavBtn>
            <NavBtnLink
              to="/login"
              onClick={() => {
                localStorage.removeItem("auth_token");
                setGeek({});
              }}
            >
              Logout
            </NavBtnLink>
          </NavBtn>{" "}
        </NavMenu>
      )}
    </Nav>
  );
};
export default Navbar;
