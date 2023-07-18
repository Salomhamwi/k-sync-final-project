import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ContextInfo } from "../components/ContextInfo";

const CreateTeam = () => {
    const { user, setUser } = useContext(ContextInfo);
    const [teamName, setTeamName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleCreateTeam = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/createteam`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            teamName,
            address,
            phoneNumber,
            email,
            teamCaptain: `${user._id}`,
        }),
        });

        if (response.ok) {
          // Update user's teamJoined field to true and set teamName
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/updateteamjoined/${user._id}`, {
            method: "PUT",
            body: JSON.stringify({
            teamJoined: true,
            teamName: teamName,
            }),
            headers: {
            "Content-Type": "application/json",
            },
        });

          // Update user object with teamName
        setUser((prevUser) => ({
            ...prevUser,
            teamJoined: true,
            teamName: teamName,
        }));

          // Team created successfully
        navigate("/MyTeam");
        } else {
          // Error creating team
        const errorMessage = await response.json();
        console.error("Error creating team:", errorMessage);
        }
    } catch (error) {
        console.error("Error creating team:", error);
    }
    };

return (
    <CreateTeamContainer>
    <TeamCaptainLink to={`/profile/${user.id}`}>
        Team Captain: {user.firstName} {user.lastName}
    </TeamCaptainLink>
    <CreateTeamForm onSubmit={handleCreateTeam}>
        <CreateTeamTitle>Create Your Own Team</CreateTeamTitle>
        <CreateTeamInput
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        required
        />
        <CreateTeamInput
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        />
        <CreateTeamInput
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        />
        <CreateTeamInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <CreateTeamButton type="submit">Create Team</CreateTeamButton>
        <BackToProfileLink to="/MyProfile">Back to My Profile</BackToProfileLink>
    </CreateTeamForm>
    </CreateTeamContainer>
);
};

const CreateTeamContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
`;

const TeamCaptainLink = styled(Link)`
text-decoration: none;
color: #2c3e50;
font-size: 16px;
margin-bottom: 10px;

&:hover {
    text-decoration: underline;
}
`;

const CreateTeamForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
width: 300px;
`;

const CreateTeamTitle = styled.h2`
margin-bottom: 20px;
`;

const CreateTeamInput = styled.input`
width: 100%;
padding: 8px 12px;
margin-bottom: 10px;
`;

const CreateTeamButton = styled.button`
background-color: #2c3e50;
color: #fff;
border: none;
border-radius: 4px;
padding: 8px 12px;
margin-bottom: 10px;
cursor: pointer;
`;

const BackToProfileLink = styled(Link)`
text-decoration: none;
color: #2c3e50;
font-size: 14px;

&:hover {
    text-decoration: underline;
}
`;

export default CreateTeam;
