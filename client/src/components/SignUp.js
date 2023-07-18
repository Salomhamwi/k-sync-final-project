import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = ({ onLogin }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [dragonBoatRole, setDragonBoatRole] = useState("");
  const [paddlingSide, setPaddlingSide] = useState("");
  const [formError, setFormError] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    const hotmailPattern = /^[a-zA-Z0-9._%+-]+@hotmail\.[a-zA-Z]{2,}$/;
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.[a-zA-Z]{2,}$/;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !weight ||
      !age ||
      !dragonBoatRole ||
      !paddlingSide
    ) {
      setFormError(true);
      return;
    }

    if (!hotmailPattern.test(email) && !gmailPattern.test(email)) {
      setFormError(true);
      setEmailError("Please sign up with a Hotmail or Gmail account.");
      return;
    } else {
      setFormError(false);
      return;
    }

    const formData = {
      firstName,
      lastName,
      email,
      password,
      weight: Number(weight),
      age: Number(age),
      dragonBoatRole,
      paddlingSide,
      teamJoined: false,
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User created successfully");
          setUserCreated(true);
          onLogin(firstName);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else if (response.status === 409) {
          setFormError(true);
          setEmailError("Email already in use!");
        } else {
          console.log("Error creating user");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSignUp}>
        <Title>Sign Up</Title>
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="number"
          pattern="^\d+$"
          placeholder="Weight In Pounds"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <Input
          type="number"
          pattern="^\d+$"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <Select
          name="dragonBoatRole"
          value={dragonBoatRole}
          onChange={(e) => setDragonBoatRole(e.target.value)}
          required
        >
          <option value="">Select Dragon Boat Role</option>
          <option value="Rocket">Rocket</option>
          <option value="Engine">Engine</option>
          <option value="Pacer">Pacer</option>
          <option value="Drummer">Drummer</option>
          <option value="Steerer">Steerer</option>
        </Select>
        <Select
          name="paddlingSide"
          value={paddlingSide}
          onChange={(e) => setPaddlingSide(e.target.value)}
          required
        >
          <option value="">Select Paddling Side</option>
          <option value="Left">Left</option>
          <option value="Right">Right</option>
          <option value="Steerer">Steerer</option>
          <option value="Drummer">Drummer</option>
        </Select>
        {formError && !emailError && (
        <ErrorText>Email already in use!</ErrorText>
        )}
        {formError && emailError && (
        <ErrorText>Please sign up with a Hotmail or Gmail account.</ErrorText>
        )}
        {userCreated && !emailError && !formError (
        <SuccessText>
        User created successfully
        </SuccessText>
        )}
        <Button type="submit">Sign Up</Button>
        <LinkText to="/login">Already have an account? Log In</LinkText>
      </SignUpForm>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignUpForm = styled.form`
  background-color: #f1f1f1;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #2c3e50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LinkText = styled(Link)`
  color: #2c3e50;
  text-decoration: none;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const SuccessText = styled.p`
  color: green;
  font-size: 14px;
  margin-bottom: 10px;
`;

export default SignUp;
