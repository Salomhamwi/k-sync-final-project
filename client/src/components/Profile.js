import React, { useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ContextInfo } from "../components/ContextInfo";

const Profile = () => {
const { user } = useContext(ContextInfo);
const { userId } = useParams();
const isOwnProfile = user && userId === user._id;

return (
    <ProfileContainer>
    <h2>Profile</h2>
    {user && (
        <>
        <ProfileInfo>
            <p>
            <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
            <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
            <strong>Email:</strong> {user.email}
            </p>
            <p>
            {/* <strong>Team:</strong> {user.team} */}
            </p>
        </ProfileInfo>
        </>
    )}
    </ProfileContainer>
);
}

const ProfileContainer = styled.div`
background-color: #f1f1f1;
padding: 20px;
border-radius: 8px;
margin-top: 20px;
`;

const ProfileInfo = styled.div`
margin-top: 10px;

p {
    margin-bottom: 10px;
}

strong {
    margin-right: 5px;
}
`;

const EditButton = styled.button`
background-color: #2c3e50;
color: #fff;
border: none;
border-radius: 4px;
padding: 8px 12px;
cursor: pointer;
`;

export default Profile;
