import React from "react";
import { styled, keyframes } from "styled-components";
import AboutBanner from "../IMGs/About.png";
import Karam from "../IMGs/karam.jpg";
import { NavLink } from "react-router-dom";

const AboutPage = () => {
  return (
    <Container>
      <Banner alt="paddlinginsync" src={AboutBanner} />

      <h2>ABOUT ME</h2>

      <TextBox>
        <p>
          Welcome to K-Sync! This website is all about the exciting sport of dragon boat racing. Dragon boat racing is a team water sport that involves synchronized paddling in long, narrow boats decorated like dragon heads and tails. It's a thrilling and competitive sport that requires teamwork, coordination, and strength.
        </p>
        <p>
          At K-Sync, we aim to connect team members with their captains and provide tools to enhance their performance. Our platform offers a "Create a Roster" feature, which helps teams balance their boats by organizing and managing team members effectively.
        </p>
      </TextBox>
      <PersonBehindImage>
      <Team>THE PERSON BEHIND IT</Team>
      <TeamBox>
        <NavLinks target="#" to="https://personal-portfolio-phi-lac.vercel.app/">
          <Box>
            <TeamImage src={Karam} />
            <p>Karam Hamwi</p>
          </Box>
        </NavLinks>
      </TeamBox>

      <ImageCredit>
        Image credited to Ed Nguyen Photography&nbsp;
        <a href="https://www.instagram.com/ednguyenphotography/" target="_blank" rel="noopener noreferrer">@ednguyenphotography</a>
      </ImageCredit>
      </PersonBehindImage>
    </Container>
  );
};

const teamAnimation = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0.5;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const h2animation = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0.5;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const panimation = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0.5;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 400px;

  h2 {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 20px;
    opacity: 0;
    animation: ${h2animation} 1s ease 1s forwards;
    color: white;
    margin-top: -600px;
  }
`;

const Banner = styled.img`
  margin-top: 30px;
  filter: brightness(60%);
  width:1000px;
`;

const TextBox = styled.div`
  text-align: center;
  max-width: 750px;
  padding: 20px;
  border: 2px solid white;
  z-index: 3;
  margin: 0px 20px;
  color: white;
  animation: ${panimation} 1s ease forwards;
  animation-delay: 2s;
  opacity: 0;
  margin-bottom: 450px;
  p {
    font-size: 1.5em;
    font-weight: 500;
    margin-bottom: 20px;
  }
`;

const TeamBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: ${teamAnimation} 1s ease forwards;
  animation-delay: 2.5s;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  transition: 300ms;
  text-decoration: none;
  color: black;
  cursor: pointer;

  p {
    font-size: 1.2em;
    font-weight: 500;
  }

  &:hover {
    scale: 1.05;
  }
`;

const Team = styled.h3`
  color: black;
  font-size: 1.8em;
  padding: 20px 60px;
  border-bottom: 1px solid black;
  animation: ${teamAnimation} 1s ease forwards;
  animation-delay: 2.5s;
  opacity: 0;
  margin-bottom: 30px;
`;

const TeamImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid black;
  margin-bottom: 10px;
`;

const PortfolioLink = styled.a`
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 20px;
`;

const ImageCredit = styled.p`
  justify-content: center;
  font-size: 0.8rem;
  color: black;
  margin-top: 20px;
`;

const NavLinks = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

const PersonBehindImage = styled.div`
margin-top: -120px;
`

export default AboutPage;
