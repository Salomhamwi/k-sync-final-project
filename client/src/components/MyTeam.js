import React, { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import BoatImage from "../IMGs/boatmodel.png";
import { ContextInfo } from "../components/ContextInfo";

const MyTeam = () => {
  const { user, setUser } = useContext(ContextInfo);
  const [team, setTeam] = useState(null);
  const [createTeamClicked, setCreateTeamClicked] = useState(false);
  const [createRosterClicked, setCreateRosterClicked] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [showAddMemberPopup, setShowAddMemberPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  const handleDeleteConfirmationChange = (event) => {
    setDeleteConfirmation(event.target.value);
  };

  const handleDeleteTeam = async () => {
    if (deleteConfirmation === team.teamName) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/team/${team._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          navigate("/");
        } else {
          console.error("Failed to delete team:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting team:", error);
      }
    } else {
      setError("Please enter the correct team name to confirm deletion.");
    }
  };

  const fetchTeamJoined = async () => {
    try {
      const response = await fetch(`/fetchteamjoined/${user._id}`);
      if (response.ok) {
        const data = await response.json();
        setUser((prevUser) => ({ ...prevUser, teamJoined: data.teamJoined, teamName: data.teamName }));

        if (data.teamJoined && user.teamName) {
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

  useEffect(() => {
    fetchTeamJoined();
  }, [user.teamName]);

  const hasTeam = user.teamJoined;
  const isTeamCaptain = team && team.teamCaptain === user._id;

  const handleCreateTeam = () => {
    setCreateTeamClicked(true);
    navigate("/createteam");
  };

  const handleCreateRoster = () => {
    setCreateRosterClicked(true);
    navigate("/createroster");
  };

  const handleShowMembers = () => {
    setShowMembers(true);
  };

  const handleCloseMembers = () => {
    setShowMembers(false);
  };

  const handleOpenAddMemberPopup = () => {
    setShowAddMemberPopup(true);
  };

  const handleCloseAddMemberPopup = () => {
    setShowAddMemberPopup(false);
    setEnteredEmail("");
  };

  useEffect(() => {
    const fetchUserDetails = async (userId) => {
      try {
        const response = await fetch(`/team/members/${userId}`);
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
    };

    const fetchAllUserDetails = async () => {
      try {
        const allUserDetails = [];
        for (const userId of team.members) {
          const userData = await fetchUserDetails(userId);
          if (userData !== null) {
            allUserDetails.push(userData);
          }
        }
        setUsersData(allUserDetails);
      } catch (error) {
        console.error("Error fetching all user details:", error);
      }
    };

    if (showMembers && team && team.members) {
      fetchAllUserDetails();
    }
  }, [showMembers, team]);

  const addMember = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}addmember/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamName: team.teamName,
          email: enteredEmail,
        }),
      });

      if (response.ok) {
        fetchTeamJoined();
        handleCloseAddMemberPopup();
        handleSuccessMessage("User added successfully to the roster.");
      } else if (response.status === 403) {
        setError("Error: You are not the team captain to be adding members.");
      } else {
        console.error("Failed to add member:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const removeMember = async (memberId) => {
    if (memberId === user._id) {
      // User is the team captain, do not remove themselves
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/team/${team._id}/member/${memberId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Member removed successfully
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${memberId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teamJoined: false, teamName: null }),
        });

        // Remove the member from the usersData state
        setUsersData((prevData) => prevData.filter((userData) => userData._id !== memberId));
        handleSuccessMessage("User removed successfully from the roster.");
      } else {
        console.error("Failed to remove member:", response.statusText);
      }
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  const renderMembers = () => {
    if (usersData.length > 0) {
      return (
        <MembersList>
          {usersData.map((userData, index) => (
            <MemberItem key={index}>
              <MemberNumber>{index + 1}.</MemberNumber>
              <MemberInfo>
                <p>
                  <strong>Name:</strong> {userData.firstName} {userData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Role:</strong> {userData.dragonBoatRole} {userData.paddlingSide}
                </p>
              </MemberInfo>
              {isTeamCaptain && userData._id!== user._id && ( // Check if not team captain or not the user themselves
              <ButtonContainer>
                <RemoveMemberButton onClick={() => removeMember(userData._id)}>Remove</RemoveMemberButton>
              </ButtonContainer>
            )}
          </MemberItem>
        ))}
      </MembersList>
      
    );
  } else {
    return <p>Loading Members...</p>;
  }
};

return (
    <TeamContainer>
      {hasTeam ? (
        team ? (
          <MyTeamProfile>
  <div className="team-header">
    <h2>Team Name: {team.teamName}</h2>
    {isTeamCaptain && (
      <DeleteTeamButton onClick={() => setShowDeletePopup(true)}>
        Delete Team
      </DeleteTeamButton>
    )}
  </div>
  <p>Address: {team.address}</p>
  <p>Phone Number: {team.phoneNumber}</p>
  <p>Email: {team.email}</p>
  <p>Members: {team.members.length}</p>
  <ShowMembersButton onClick={handleShowMembers}>
    Show Members
  </ShowMembersButton>
  {isTeamCaptain && (
    <React.Fragment>
      <AddMemberButton onClick={handleOpenAddMemberPopup}>
        Add a Member
      </AddMemberButton>
      <CreateRosterButton  onClick={handleCreateRoster} >
        Create a Team Roster
      </CreateRosterButton>
    </React.Fragment>
            )}
            {showMembers && (
          <MembersWindowContainer>
            <MembersWindow>
            <MembersHeader>
          <h3>Team Members</h3>
          <CloseButton onClick={handleCloseMembers}>Close</CloseButton>
        </MembersHeader>
        {successMessage && <SuccessNotification>{successMessage}</SuccessNotification>}
        {renderMembers()}
          </MembersWindow>
          </MembersWindowContainer>
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
            <br />
            If you would like to join a team, please use the input above to search for existing teams and request to join them or create your own team!
          </TeamText>
          {!createTeamClicked && (
            <CreateTeamButton onClick={handleCreateTeam}>Create Your Own Team</CreateTeamButton>
          )}
        </NoTeamContainer>
      )}

      {showAddMemberPopup && isTeamCaptain && (
        <AddMemberPopup>
          <AddMemberForm>
            <InputLabel>Email:</InputLabel>
            <Input
              type="email"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
            <AddMemberButton onClick={addMember}>Add Member</AddMemberButton>
            <CloseButton onClick={handleCloseAddMemberPopup}>Close</CloseButton>
          </AddMemberForm>
        </AddMemberPopup>
      )}

      {showDeletePopup && isTeamCaptain && (
        <DeletePopup>
          <DeleteForm>
            <h3>Are you sure you want to delete the team?</h3>
            <p>
              To confirm deletion, please enter the team name:
            </p>
            <Input
              type="text"
              value={deleteConfirmation}
              onChange={handleDeleteConfirmationChange}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <DeleteButton onClick={handleDeleteTeam}>Delete</DeleteButton>
            <CancelButton onClick={() => setShowDeletePopup(false)}>Cancel</CancelButton>
          </DeleteForm>
        </DeletePopup>
      )}
    </TeamContainer>
  );
};

    const TeamContainer = styled.div`
    
`;

const MyTeamProfile = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  line-height: 40px;
  align-items: flex-start;

  > .team-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
  }

  > .team-header h2 {
    margin: 0;
  }
`;



const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
`;

const NoTeamContainer = styled.div`
  
  border-radius: 8px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1f1f1;
`;

const MemberNumber = styled.span`
  font-weight: bold;
  margin-right: 8px;
  margin-top: 30px;
`;

const MemberInfo = styled.div`
  margin-left: 16px;
  margin-top: 30px;
  flex-grow: 1;
`;

const BoatImageElement = styled.img`
  animation: ${({ createTeamClicked }) =>
    createTeamClicked ? 'flipAndSlideOut 1.3s ease-in-out' : 'slideInBottom 1.3s ease-in-out'};
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

  @keyframes flipAndSlideOut {
    0% {
      transform: translateY(0) rotateY(0);
      opacity: 1;
    }
    50% {
      transform: translateY(0) rotateY(180deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100%) rotateY(180deg);
      opacity: 0;
    }
  }
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


const MembersWindowContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const MembersWindow = styled.div`

  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 20px;
  width: 100%;
`;

const MembersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const MembersList = styled.ul`
  list-style: none;
  line-height: 25px;
  padding: 0;
`;

const MemberItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const AddMemberButton = styled.button`
  background-color: #2c3e50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 25px;
  margin-top: 10px;
  cursor: pointer;
`;

const CreateRosterButton = styled.button`
  background-color: #2c3e50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 10px;
  margin-top: 10px;
  cursor: pointer;
`;

const ShowMembersButton = styled.button`
background-color: #2c3e50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 22px;
  margin-top: 10px;
  cursor: pointer;
`;

const RemoveMemberButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
  margin-left: auto;
`;

const AddMemberPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddMemberForm = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
`;

const InputLabel = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const fadeAnimation = keyframes`
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
`;


const SuccessNotification = styled.div`
  background-color: green;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  animation: ${fadeAnimation} 1s ease-in;
`;

const DeleteTeamButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
`;

const DeletePopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteForm = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin-top: 10px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: #bbb;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;


export default MyTeam;