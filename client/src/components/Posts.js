import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ContextInfo } from "../components/ContextInfo";

const Posts = () => {
  const { user, setUser } = useContext(ContextInfo);
  const [team, setTeam] = useState(null);
  const [roster, setRoster] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        if (!user) return; // Skip fetching if user is not logged in

        const response = await fetch(`/team/${user.teamName}`);
        if (response.ok) {
          const teamData = await response.json();
          setTeam(teamData);
        } else {
          console.error('Failed to fetch team data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchTeamData();
  }, [user]);

  useEffect(() => {
    const fetchRoster = async () => {
      try {
        if (!team) return; // Skip fetching if team data is not available

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/roster/${team.teamName}`);
        if (response.ok) {
          const data = await response.json();
          setRoster(data.roster);
        } else {
          console.error('Failed to fetch roster:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching roster:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoster();
  }, [team]);

  if (loading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  if (!team || !roster) {
    return <NoPostsText>No team or roster found.</NoPostsText>;
  }

  const totalLeftSeatWeight = roster.leftSeatWeight || 0;
  const totalRightSeatWeight = roster.rightSeatWeight || 0;

  return (
    <Container>
      <h2>Team: {team.teamName}</h2>
      <h3>Drummer: {roster.drummer ? roster.drummer.firstName : '-'}</h3>
			<h3>Steerer: {roster.steerer ? roster.steerer.firstName : '-'}</h3>
      <p>Total Left Seat Weight: {totalLeftSeatWeight} lbs</p>
      <p>Total Right Seat Weight: {totalRightSeatWeight} lbs</p>
      <PostsList>
  <Post>
    <PostTitle>Seat 1</PostTitle>
    <SeatContent>
      <SeatSide>
        Left: {roster.Seat1Left ? roster.Seat1Left.firstName : '-'}
      </SeatSide>
      <SeatSide>
        Right: {roster.Seat1Right ? roster.Seat1Right.firstName : '-'}
      </SeatSide>
    </SeatContent>
  </Post>
  <Post>
    <PostTitle>Seat 2</PostTitle>
    <SeatContent>
      <SeatSide>
        Left: {roster.Seat2Left ? roster.Seat2Left.firstName : '-'}
      </SeatSide>
      <SeatSide>
        Right: {roster.Seat2Right ? roster.Seat2Right.firstName : '-'}
      </SeatSide>
    </SeatContent>
  </Post>
	<Post>
    <PostTitle>Seat 3</PostTitle>
    <SeatContent>
      <SeatSide>
        Left: {roster.Seat3Left ? roster.Seat3Left.firstName : '-'}
      </SeatSide>
      <SeatSide>
        Right: {roster.Seat3Right ? roster.Seat3Right.firstName : '-'}
      </SeatSide>
    </SeatContent>
  </Post>
	<Post>
    <PostTitle>Seat 4</PostTitle>
    <SeatContent>
      <SeatSide>
        Left: {roster.Seat4Left ? roster.Seat4Left.firstName : '-'}
      </SeatSide>
      <SeatSide>
        Right: {roster.Seat4Right ? roster.Seat4Right.firstName : '-'}
      </SeatSide>
    </SeatContent>
  </Post>
	<Post>
    <PostTitle>Seat 5</PostTitle>
    <SeatContent>
      <SeatSide>
        Left: {roster.Seat5Left ? roster.Seat5Left.firstName : '-'}
      </SeatSide>
      <SeatSide>
        Right: {roster.Seat5Right ? roster.Seat5Right.firstName : '-'}
      </SeatSide>
    </SeatContent>
  </Post>
	<Post>
    <PostTitle>Seat 6</PostTitle>
    <SeatContent>
      <SeatSide>
        Left: {roster.Seat6Left ? roster.Seat6Left.firstName : '-'}
      </SeatSide>
      <SeatSide>
        Right: {roster.Seat6Right ? roster.Seat6Right.firstName : '-'}
      </SeatSide>
    </SeatContent>
  </Post>
	<Post>
    <PostTitle>Seat 7</PostTitle>
    <SeatContent>
      <SeatSide>
        Left: {roster.Seat7Left ? roster.Seat7Left.firstName : '-'}
      </SeatSide>
      <SeatSide>
        Right: {roster.Seat7Right ? roster.Seat7Right.firstName : '-'}
      </SeatSide>
    </SeatContent>
  </Post>
	<Post>
    <PostTitle>Seat 8</PostTitle>
    <SeatContent>
      <SeatSide>
        Left: {roster.Seat8Left ? roster.Seat8Left.firstName : '-'}
      </SeatSide>
      <SeatSide>
        Right: {roster.Seat8Right ? roster.Seat8Right.firstName : '-'}
      </SeatSide>
    </SeatContent>
  </Post>
	<Post>
    <PostTitle>Seat 9</PostTitle>
    <SeatContent>
      <SeatSide>
        Left: {roster.Seat9Left ? roster.Seat9Left.firstName : '-'}
      </SeatSide>
      <SeatSide>
        Right: {roster.Seat9Right ? roster.Seat9Right.firstName : '-'}
      </SeatSide>
    </SeatContent>
  </Post>
	<Post>
    <PostTitle>Seat 10</PostTitle>
    <SeatContent>
      <SeatSide>
        Left: {roster.Seat10Left ? roster.Seat10Left.firstName : '-'}
      </SeatSide>
      <SeatSide>
        Right: {roster.Seat10Right ? roster.Seat10Right.firstName : '-'}
      </SeatSide>
    </SeatContent>
  </Post>
  
</PostsList>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
	padding-bottom: 200px;
`;

const LoadingText = styled.p`
  color: #000;
  font-size: 16px;
`;

const NoPostsText = styled.p`
  color: #000;
  font-size: 16px;
`;

const PostsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
	justify-content: center;
	align-items: center;
`;

const Post = styled.li`
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
	width: 25em;
`;

const PostTitle = styled.h3`
	justify-content: center;
	align-items: center;
	text-align: center;
  margin-top: 0;
`;

const SeatContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SeatSide = styled.p`
  font-style: italic;
`;

export default Posts;
