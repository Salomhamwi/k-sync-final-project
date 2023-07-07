import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BoatImage from '../IMGs/boatmodel.png';

const Home = () => {
  return (
    <Container>
      <Content>
        <TextContainer>
          <Title>Welcome to K-Sync!</Title>
          <Description>
            Our goal is to organize your team, help you create your own roster, facilitate communication with your team members, and give you an advantage in every way possible.
          </Description>
          <Description>
            As a team captain, you can set up your own roster of paddlers, showcasing their weight and roles.
          </Description>
          <Description>
            Become a member, create your own team, or explore your captain's latest posts!
          </Description>
          <ActionDescription>
            Get started now by signing up paddlers! 
          </ActionDescription>
        </TextContainer>
        <BoatImageContainer>
          <BoatImageElement src={BoatImage} alt="Dragon Boat" />
        </BoatImageContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;

const TextContainer = styled.div`
  text-align: left;
  padding-right: 100px;
`;

const BoatImageContainer = styled.div`
  animation: slideInBottom 1.3s ease-in-out;
  @keyframes slideInBottom {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const BoatImageElement = styled.img`
  width: 300px;
`;

const Title = styled.h1`
  font-size: 52px;
  color: #1f2937;
  font-weight: 700;
  margin-bottom: 10px;
  animation: fadeIn 2s ease-in-out;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Description = styled.p`
  font-size: 28px;
  color: #374151;
  margin-bottom: 15px;
  animation: fadeIn 2.5s ease-in-out;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ActionDescription = styled.p`
  font-size: 24px;
  color: #374151;
  animation: fadeIn 2.5s ease-in-out;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;


export default Home;
