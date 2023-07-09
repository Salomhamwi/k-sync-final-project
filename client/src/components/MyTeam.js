import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import BoatImage from "../IMGs/boatmodel.png";
import { ContextInfo } from "../components/ContextInfo";


const MyTeam = () => {
const { user, setUser } = useContext(ContextInfo);
const [team, setTeam] = useState(null);
const [createTeamClicked, setCreateTeamClicked] = useState(false);
const [showMembers, setShowMembers] = useState(false);
const navigate = useNavigate();
const [scanCount, setScanCount] = useState(0);
const [members, setMembers] = useState([]);

useEffect(() => {
    const fetchTeamJoined = async () => {
    try {
        const response = await fetch(`/fetchteamjoined/${user._id}`);
        if (response.ok) {
        const data = await response.json();
        setUser((prevUser) => ({ ...prevUser, teamJoined: data.teamJoined }));

        if (data.teamJoined) {
            const teamResponse = await fetch(`/team/${user.teamName}`);
            if (teamResponse.ok) {
            const teamData = await teamResponse.json();
            setTeam(teamData);
            setMembers(teamData.members);
            } else {
            console.error("Failed to fetch team data:", teamResponse.statusText);
            }
        }
        } else {
        console.error("Failed to fetch teamJoined:", response.statusText);
        }
    } catch (error) {
        console.error("Error fetching teamJoined:", error);
    }
    };

    if (scanCount < 2) {
    fetchTeamJoined();
    setScanCount((prevCount) => prevCount + 1);
    }
}, [user, scanCount]);

const hasTeam = user.teamJoined;

console.log(user.teamJoined);
console.log(user.teamName);
const handleCreateTeam = () => {
    setCreateTeamClicked(true);
    setTimeout(() => {
    navigate("/createteam");
    setCreateTeamClicked(false);
    }, 2000);
};

const handleShowMembers = async () => {
    setShowMembers(true);
};

const handleCloseMembers = () => {
    setShowMembers(false);
};

const fetchUserDetails = async () => {
    const promises = members.map(async (member) => {
    try {
        const response = await fetch(`/users/${member}`);
        if (response.ok) {
        const userData = await response.json();
        return userData;
        } else {
        console.error("Failed to fetch user data:", response.statusText);
        return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
    });

    const usersData = await Promise.all(promises);
    return usersData.filter((userData) => userData !== null);
};

const renderMembers = async () => {
    const usersData = await fetchUserDetails();

    if (usersData.length > 0) {
    return (
        <MembersList>
        {usersData.map((user) => (
            <MemberItem key={user._id}>
            <p>{user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
            </MemberItem>
        ))}
        </MembersList>
    );
    } else {
    return <p>No members found.</p>;
    }
};

return (
    
    <TeamContainer>
    {hasTeam ? (
        team ? (
        <MyTeamProfile>
            <h2>{team.teamName}</h2>
            <p>Team Captain: {user.firstName} {user.lastName}</p>
            <p>Address: {team.address}</p>
            <p>Phone Number: {team.phoneNumber}</p>
            <p>Email: {team.email}</p>
            <p>Members: {team.members.length}</p>
            <AddMemberButton>Add a Member</AddMemberButton>
            <ShowMembersButton onClick={handleShowMembers}>Show Members</ShowMembersButton>
            {showMembers && (
            <MembersWindow>
                <MembersHeader>
                <h3>Team Members</h3>
                <CloseButton onClick={handleCloseMembers}>Close</CloseButton>
                </MembersHeader>
                {renderMembers()}
            </MembersWindow>
            )}
        </MyTeamProfile>
        ) : (
        <LoadingContainer>
            <p>Loading team information...</p>
        </LoadingContainer>
        )
        ) : (
            <NoTeamContainer>
            <BoatImageElement src={BoatImage} alt="Dragon Boat" />
            <TeamText>
                You are currently not a part of any team.
                <br />
                If you would like to join a team, please use the input above to search for existing teams and request to join them or create your own team!
            </TeamText>
            {!createTeamClicked && (
                <CreateTeamButton onClick={handleCreateTeam}>
                Create Your Own Team
                </CreateTeamButton>
            )}
            </NoTeamContainer>
        )}
        </TeamContainer>
    );
    };


    const TeamContainer = styled.div`
    
`;

const MyTeamProfile = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
`;

const NoTeamContainer = styled.div`
    background-color: #f1f1f1;
    padding: 20px;
    border-radius: 8px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f1f1f1;
`;

const BoatImageContainer = styled.div`
    animation: ${({ createTeamClicked }) =>
    createTeamClicked ? 'slideOutTop 1.3s ease-in-out' : 'slideInBottom 1.3s ease-in-out'};
    animation-fill-mode: forwards;

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

    @keyframes slideOutTop {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateY(-100%);
        opacity: 0;
    }
    }
`;

const BoatImageElement = styled.img`
    width: 300px;
`;

const TeamText = styled.p`
    margin-top: 20px;
    text-align: center;
    color: #555;
`;

const CreateTeamButton = styled.button`
    margin-top: 20px;
    background-color: #2c3e50;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    text-decoration: none;
    cursor: pointer;
`;

const AddMemberButton = styled.button`
    background-color: #2c3e50;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    margin-top: 10px;
    cursor: pointer;
`;

const ShowMembersButton = styled.button`
    background-color: #2c3e50;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    margin-top: 10px;
    cursor: pointer;
`;

const MembersWindow = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    padding: 20px;
`;

const MembersHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const CloseButton = styled.button`
    background-color: #2c3e50;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
`;

const MembersList = styled.ul`
    list-style: none;
    padding: 0;
`;

const MemberItem = styled.li`
    margin-bottom: 4px;
`;

export default MyTeam;