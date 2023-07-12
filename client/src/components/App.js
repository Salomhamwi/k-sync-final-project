import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from './Header';
import Home from './Home';
import AboutPage from './AboutPage';
import { InfoProvider } from './ContextInfo';
import SignUp from './SignUp';
import Login from './Login';
import Footer from './Footer';
import Profile from './Profile';
import MyProfile from './MyProfile';
import MyTeam from './MyTeam';
import TeamProfile from './TeamProfile';
import CreateTeam from './CreateTeam';
import CreateRoster from './CreateRoster';
import Posts from './Posts';

function App() {
  return (
    <InfoProvider>
      <Router>
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/MyProfile/" element={<MyProfile />} />
            <Route path="/myteam/" element={<MyTeam />} />
            <Route path="/createteam/" element={<CreateTeam />} />
            <Route path="/team/:teamName" element={<TeamProfile />} />
            <Route path="/createroster" element={<CreateRoster />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
          <Footer />
        </Container>
      </Router>
    </InfoProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;

