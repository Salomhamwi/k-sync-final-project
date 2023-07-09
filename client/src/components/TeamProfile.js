import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const TeamProfile = () => {
const { teamName } = useParams();
const [team, setTeam] = useState(null);

useEffect(() => {
    const fetchTeam = async () => {
    try {
        const response = await fetch(`/team/${teamName}`);
        if (response.ok) {
        const teamData = await response.json();
        setTeam(teamData);
        } else {
        console.error("Failed to fetch team data:", response.statusText);
        }
    } catch (error) {
        console.error("Error fetching team data:", error);
    }
    };

    fetchTeam();
}, [teamName]);

if (!team) {
    return <p>Loading team information...</p>;
}

return (
    <TeamContainer>
    <h2>{team.teamName}</h2>
    <p>Team Captain: {team.teamCaptain}</p>
    <p>Address: {team.address}</p>
    <p>Phone Number: {team.phoneNumber}</p>
    <p>Email: {team.email}</p>
    <p>Members: {team.members.length}</p>
    </TeamContainer>
);
};

const TeamContainer = styled.div`
background-color: #f1f1f1;
padding: 20px;
border-radius: 8px;
margin-top: 20px;

p {
    margin-bottom: 10px;
}

strong {
    margin-right: 5px;
}
`;

export default TeamProfile;