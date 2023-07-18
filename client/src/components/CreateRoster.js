import React, { useState, useEffect, useContext } from 'react';
import styled, { keyframes, css } from "styled-components";
import BoatImage from '../IMGs/boatmodelv2.png';
import { ContextInfo } from './ContextInfo';
import { useNavigate } from "react-router-dom";

const CreateRoster = () => {
  const { user, setUser } = useContext(ContextInfo);
  const [teamMembers, setTeamMembers] = useState([]);
  const [seats, setSeats] = useState([]);
  const [team, setTeam] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [members, setMembers] = useState([]);
  const [filledSeats, setFilledSeats] = useState(Array(21).fill(false));
  const navigate = useNavigate();
  const [slideOut, setSlideOut] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  

  const fetchTeamJoined = async () => {
    try {
      const response = await fetch(`/fetchteamjoined/${user._id}`);
      if (response.ok) {
        const data = await response.json();
        setUser((prevUser) => ({
          ...prevUser,
          teamJoined: data.teamJoined,
          teamName: data.teamName,
        }));

        if (data.teamJoined && data.teamName) {
          const teamResponse = await fetch(`/team/${data.teamName}`);
          if (teamResponse.ok) {
            const teamData = await teamResponse.json();
            setTeam(teamData);
            setMembers(teamData.members);
          } else {
            console.error('Failed to fetch team data:', teamResponse.statusText);
          }
        }
      } else {
        console.error('Failed to fetch teamJoined:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching teamJoined:', error);
    }
  };

  useEffect(() => {
    fetchTeamJoined();
  }, [user.teamName]);

  useEffect(() => {
    const fetchAllUserDetails = async () => {
      try {
        const allUserDetails = [];
        if (team && team.members) {
          for (const userId of team.members) {
            const response = await fetch(`/team/members/${userId}`);
            if (response.ok) {
              const userData = await response.json();
              allUserDetails.push(userData);
            } else {
              console.error('Failed to fetch user data:', response.statusText);
            }
          }
        }
        setUsersData(allUserDetails);
      } catch (error) {
        console.error('Error fetching all user details:', error);
      }
    };

    fetchAllUserDetails();
  }, [team]);

  const handleSeatDrop = (event, seatIndex) => {
    event.preventDefault();
    const draggedMember = event.dataTransfer.getData('member');

    // Find the dragged member from the usersData array
    const member = usersData.find(
      (userData) => userData.firstName === JSON.parse(draggedMember).firstName
    );

    // Update the seats array
    const updatedSeats = [...seats];
    updatedSeats[seatIndex] = member;

    // Update the filledSeats array
    const updatedFilledSeats = [...filledSeats];
    updatedFilledSeats[seatIndex] = true;

    setSeats(updatedSeats);
    setFilledSeats(updatedFilledSeats);
  };

  const handleSeatClick = (seatIndex) => {
    const updatedSeats = [...seats];
    const updatedFilledSeats = [...filledSeats];

    if (seats[seatIndex]) {
      // Uncross the team member if the seat is already filled
      updatedSeats[seatIndex] = undefined;
      updatedFilledSeats[seatIndex] = false;
    }

    setSeats(updatedSeats);
    setFilledSeats(updatedFilledSeats);
  };

  const handleMemberDragStart = (event, member) => {
    // Store the dragged member's data
    event.dataTransfer.setData('member', JSON.stringify(member));
  };

  const handleSeatDragOver = (event) => {
    event.preventDefault();
  };

  // Calculate total weight for the left and right sides
  const calculateWeight = (side) => {
    const weights = seats
      .filter((seat, index) => {
        if (
          (side === 'left' && index % 2 === 0 && index !== 0 && index !== 1) ||
          (side === 'right' && index % 2 === 1 && index !== 0 && index !== 1)
        ) {
          return seat;
        }
      })
      .map((seat) => seat?.weight || 0);

    return weights.reduce((acc, cur) => acc + cur, 0);
  };

  const handleCreateRoster = async () => {
    try {
      // Filter out empty seats and get their member IDs
      const filledSeatIds = seats.filter(Boolean);
  
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/update-roster`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName: team.teamName,
          seats: filledSeatIds,
          leftSeatWeight: calculateWeight('left'),
          rightSeatWeight: calculateWeight('right'),
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setSlideOut(true); // Trigger the slide-out animation
        setAnimationComplete(false);
      } else {
        console.error('Failed to create roster:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating roster:', error);
    }
  };

  useEffect(() => {
    if (slideOut) {
      const animationTimeout = setTimeout(() => {
        setAnimationComplete(true);
        navigate('/posts'); // Redirect to the "/posts" route after animation completion
      }, 1300);

      return () => clearTimeout(animationTimeout);
    }
  }, [slideOut, navigate]);

  return (
    <Container>
      <MembersList>
        <h2>Team Members</h2>
        
        {usersData.length === 0 ? (
          <LoadingText>Loading...</LoadingText>
        ) : (
          <ul>
            {usersData.map((userData, index) => (
              <Member
                key={index}
                draggable="true"
                onDragStart={(event) => handleMemberDragStart(event, userData)}
                crossed={seats.some((seat) => seat && seat.firstName === userData.firstName)}
              >
                <p>{userData.firstName}</p>
              </Member>
            ))}
          </ul>
        )}
      </MembersList>

      <BoatImageContainer slideOut={slideOut} animationComplete={animationComplete}>
        <SeatsContainer>
          <SoloSeat
            onDrop={(event) => handleSeatDrop(event, 0)}
            onDragOver={handleSeatDragOver}
            onClick={() => handleSeatClick(0)}
            filled={filledSeats[0] ? filledSeats[0].toString() : 'false'}
          >
            {seats[0] ? `${seats[0].firstName} (${seats[0].weight} LB)` : 'Empty'}
          </SoloSeat>
          <SeatColumn>
            {[...Array(20)].map((_, index) => (
              <Seat
                key={index}
                onDrop={(event) => handleSeatDrop(event, index + 2)}
                onDragOver={handleSeatDragOver}
                onClick={() => handleSeatClick(index + 2)}
                filled={filledSeats[index + 2] ? filledSeats[index + 2].toString() : 'false'}
              >
                {seats[index + 2] ? `${seats[index + 2].firstName} (${seats[index + 2].weight} LB)` : 'Empty'}
              </Seat>
            ))}
          </SeatColumn>
          <BoatImageElement src={BoatImage} alt="Dragon Boat" />
          <SoloSeat
            onDrop={(event) => handleSeatDrop(event, 1)}
            onDragOver={handleSeatDragOver}
            onClick={() => handleSeatClick(1)}
            filled={filledSeats[1] ? filledSeats[1].toString() : 'false'}
          >
            {seats[1] ? `${seats[1].firstName} (${seats[1].weight} LB)` : 'Empty'}
          </SoloSeat>
        </SeatsContainer>
      </BoatImageContainer>

      <TeamInformation>
        <h2>Team Information</h2>
        <WeightDisplay>
          <p>
            Left Seats Weight: <strong>{calculateWeight('left')} LB</strong>
          </p>
          <p>
            Right Seats Weight: <strong>{calculateWeight('right')} LB</strong>
          </p>
          <p>
            Total Weight: <strong>{calculateWeight('left') + calculateWeight('right')} LB</strong>
          </p>
        </WeightDisplay>
        <Button onClick={handleCreateRoster}>Create this roster</Button>
        {usersData.length === 0 ? (
          <LoadingText>Loading...</LoadingText>
        ) : (
          <ul>
            {usersData.map((userData, index) => (
              <TeamMember key={index}>
                <MemberInfo>
                  <p>{userData.firstName} </p>
                  <p>{userData.weight} LB</p>
                  <p>{userData.dragonBoatRole}</p>
                  <p>{userData.paddlingSide}</p>
                </MemberInfo>
              </TeamMember>
            ))}
          </ul>
        )}
      </TeamInformation>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #2c3e50;
  padding: 20px;
  height: 130vh;
`;

const MembersList = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 0.18;

  h2 {
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
`;

const TeamInformation = styled.div`
  width: 300px;

  h2 {
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: flex-start;
    margin-left: auto;
    gap: 10px;
  }
`;

const Member = styled.li`
  cursor: grab;
  flex-direction: column;
  margin-right: 10px;
  padding: 10px;
  background-color: #e9e9e9;
  border-radius: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 120px;
  user-select: none;
  cursor: grab;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-app-region: no-drag;

  &:active {
    cursor: grabbing;
  }

  ${({ crossed }) =>
    crossed &&
    `
    text-decoration: line-through;
    opacity: 0.5;
  `}
`;

const TeamMember = styled.li`
  margin-bottom: 10px;
`;

const MemberInfo = styled.div`
  padding: 10px;
  background-color: #e9e9e9;
  border-radius: 5px;
`;

const LoadingText = styled.p`
  color: #ffffff;
  font-size: 16px;
`;

const slideOutTop = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const BoatImageContainer = styled.div`
  animation: ${({ slideOut }) =>
    slideOut ? css`${slideOutTop} 1.3s ease-in-out forwards` : "slideInBottom 1.3s ease-in-out"};

  ${({ animationComplete }) =>
    animationComplete &&
    css`
      display: none;
    `}

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
`;


const BoatImageElement = styled.img`
  width: 90px;
`;

const SeatsContainer = styled.div`
  position: absolute;
  display: grid;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const Seat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  color: ${({ children }) => (children ? '#FFFFFF' : '#FFFFFF')};
  text-transform: uppercase;
  width: 50px;
  height: 50px;
  margin: 0 70px;
  transform: translateX(-295%);
`;

const SeatColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 450px;
  position: absolute;
`;

const SoloSeat = styled.div`
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  color: ${({ children }) => (children ? '#FFFFFF' : '#FFFFFF')};
  text-transform: uppercase;
  width: 50px;
  height: 50px;
  margin: 10px;
`;

const WeightDisplay = styled.div`
  margin-top: 20px;

  p {
    margin-bottom: 5px;
    color: white;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export default CreateRoster;
