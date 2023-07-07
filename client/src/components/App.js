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
import MyProfile from './MyProfile'

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

