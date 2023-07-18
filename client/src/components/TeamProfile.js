import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const TeamProfile = () => {
  const { teamName } = useParams();
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/team/${teamName}`);
        if (response.ok) {
          const teamData = await response.json();
          setTeam(teamData);
          setMembers(teamData.members);
        } else {
          console.error("Failed to fetch team data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeam();
  }, [teamName]);

  useEffect(() => {
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
      const filteredUsersData = usersData.filter((userData) => userData !== null);
      setUsersData(filteredUsersData);
    };

    if (showMembers && members.length > 0) {
      fetchUserDetails();
    }
  }, [showMembers, members]);

  const handleShowMembers = () => {
    setShowMembers(true);
  };

  const handleCloseMembers = () => {
    setShowMembers(false);
  };

  const renderMembers = () => {
    if (usersData.length > 0) {
      return (
        <MembersList>
          {usersData.map((user, index) => (
            <MemberItem key={user._id}>
              <MemberNumber>{index + 1}.</MemberNumber>
              <MemberInfo>
                <p>
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </MemberInfo>
            </MemberItem>
          ))}
        </MembersList>
      );
    } else {
      return <p>No members found.</p>;
    }
  };

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
      <ShowMembersButton onClick={handleShowMembers}>Show Members</ShowMembersButton>
      {showMembers && (
        <>
          <h3>Team Members</h3>
          <MembersWindow>
            <MembersHeader>
              <h3>Team Members</h3>
              <CloseButton onClick={handleCloseMembers}>Close</CloseButton>
            </MembersHeader>
            {renderMembers()}
          </MembersWindow>
        </>
      )}
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
`;

const MembersList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MemberItem = styled.li`
  margin-bottom: 4px;
  display: flex;
  align-items: center;
`;

const MemberNumber = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

const MemberInfo = styled.div`
  margin-left: 16px;
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

export default TeamProfile;
