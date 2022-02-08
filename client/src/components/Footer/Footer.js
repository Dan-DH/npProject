import React from "react";

import { FooterContainer, FooterLink, Span } from "./Footer.style";

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <FooterLink href="mailto:geekouttheapp@gmail.com">
          Contact Us
        </FooterLink>
      </div>
      <div>
        <Span>&copy; 2022</Span>
      </div>
      <div>
        <FooterLink href="https://github.com/Dan-DH" target="_blank">
          by Dan
        </FooterLink>
      </div>
    </FooterContainer>
  );
};
export default Footer;
