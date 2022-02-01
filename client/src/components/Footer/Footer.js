import React from "react";

import {
  FooterContainer,
  FooterLink,
  FooterMenu,
  FooterBtn,
  FooterBtnLink,
  Span,
} from "./Footer.style";

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterMenu>
          <FooterLink href="https://github.com/Dan-DH" target="_blank">
            by Dan
          </FooterLink>
          <FooterLink href="mailto:geekouttheapp@gmail.com">
            Contact Us
          </FooterLink>
          <Span>Copyright &copy; 2022</Span>
        </FooterMenu>
      </FooterContainer>
    </>
  );
};
export default Footer;
