import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ContextInfo } from "../components/ContextInfo";

const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loginError, setLoginError] = useState(false);
const [loginSuccess, setLoginSuccess] = useState(false);
const navigate = useNavigate();
const { setUser } = useContext(ContextInfo);


const handleLogin = (e) => {
    e.preventDefault();

    const formData = {
    email,
    password,
    };

    fetch("/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    
    body: JSON.stringify(formData),
    })
    .then((response) => {
        if (response.ok) {
        setLoginError(false);
        setLoginSuccess(true);

          // Assuming the response contains the user's firstName
        response.json().then((data) => {
            const { firstName, email, weight, age, lastName, _id, teamJoined, dragonBoatRole, paddlingSide } = data;

            // Update the user state in the context with the logged-in user's firstName
            setUser({ firstName, email, weight, age, lastName, _id, teamJoined, dragonBoatRole, paddlingSide  });

            // Store the user data in the local storage
            window.localStorage.setItem("user", JSON.stringify(_id));
            window.localStorage.setItem("name", JSON.stringify(firstName));

            setTimeout(() => {
                navigate(`/MyProfile/`);
            }, 3000);
        });

        } else {
        console.log("Invalid email or password");
        setLoginError(true);
        }
    })
    .catch((error) => {
        console.error(error);
    });
};

return (
    <LoginContainer>
    <LoginForm onSubmit={handleLogin}>
        <Title>Log In</Title>
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
        {loginError ? (
        <ErrorText>Invalid email or password</ErrorText>
        ) : (
        loginSuccess && <SuccessText>Login successful</SuccessText>
        )}
        <Button type="submit">Log In</Button>
        <LinkText to="/signup">Don't have an account? Sign Up</LinkText>
    </LoginForm>
    </LoginContainer>
);
};

const LoginContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`;

const LoginForm = styled.form`
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

export default Login;
