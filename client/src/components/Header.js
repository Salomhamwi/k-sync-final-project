import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../LOGO/logo.png";
import { ContextInfo } from "../components/ContextInfo";

const Header = () => {
  const { user, setUser } = useContext(ContextInfo);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data in localStorage
  localStorage.removeItem("userData");

  // Clear user state in context
  setUser(null);

  // Navigate to the home page
  navigate("/");
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <Title src={Logo} alt="Logo" />
        <HeaderText>
          <LogoText>K-Sync</LogoText>
          <Subtext>Team Planner: Dragon Boat</Subtext>
        </HeaderText>
      </LogoContainer>
      <Nav>
        
        {user ? (
          <>
            <NavLink exact to={`/MyProfile`} activeClassName="active">
              My Profile
            </NavLink>
            <NavLink to="/posts" activeClassName="active">
              Posts
            </NavLink>
            <NavLink to="/myteam" activeClassName="active">
              My Team
            </NavLink>
            <WelcomeText>Welcome, {user.firstName}!</WelcomeText>
            <Button onClick={handleLogout}>Log Out</Button>
          </>
        ) : (
          <>
          <NavLink to="/" activeClassName="activeclassname">
          Home
        </NavLink>
        <NavLink to="/about" activeClassName="active">
          About
        </NavLink>
            <NavLink to="/signup">Sign Up ➤</NavLink>
            <NavLink to="/login">Log In ➤</NavLink>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.img`
  height: 80px;
  margin-right: 10px;
  background-color: transparent;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoText = styled.span`
  font-size: 2em;
  color: #FF9800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtext = styled.span`
  font-size: 0.8em;
  color: #bbb;
  margin-top: 5px;
`;

const Nav = styled.nav`
  margin-top: 10px;
`;

const NavLink = styled(Link)`
  margin-right: 20px;
  font-size: 1.2em;
  color: white;
  text-decoration: none;

  &:hover {
    color: #FF9800;
  }

  &.active {
    color: #FF9800;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.2em;
  color: white;
  cursor: pointer;

  &:hover {
    color: #FF9800;
  }
`;

const WelcomeText = styled.span`
  font-size: 1.2em;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export default Header;
