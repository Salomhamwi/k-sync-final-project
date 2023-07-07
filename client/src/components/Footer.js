import React from "react";
import styled from "styled-components";

const Footer = () => {
const currentYear = new Date().getFullYear();

return (
    <FooterContainer>
        <FooterText>&copy; {currentYear} K-Sync. All rights reserved.</FooterText>
    </FooterContainer>
);
};

const FooterContainer = styled.footer`
background-color: #2c3e50;
color: white;
padding: 20px;
display: flex;
justify-content: center;
align-items: center;
position: fixed;
bottom: 0;
width: 100%;
`;

const FooterText = styled.p`
font-size: 1em;
margin: 0;
`;

export default Footer;
