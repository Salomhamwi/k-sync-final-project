import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { ContextInfo } from "../components/ContextInfo";

const MyProfile = () => {
const { user, setUser } = useContext(ContextInfo);
const [updatedUser, setUpdatedUser] = useState(user);
const [updateSuccess, setUpdateSuccess] = useState(false);
const [editableItem, setEditableItem] = useState("");

useEffect(() => {
    // Retrieve user data from localStorage on component mount
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    setUser(userData);
    }
}, [setUser]);

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
    ...prevUser,
    [name]: Number(value),
    }));
}

const handleUpdateProfile = async () => {
    try {
    const response = await fetch(`/profile/${user._id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
        // Create a copy of updatedUser and update the specific properties
        const newUser = { ...user, ...updatedUser };
        setUser(newUser);
        setUpdateSuccess(true);
        localStorage.setItem("userData", JSON.stringify(newUser));
        setEditableItem("");
    } else {
        throw new Error("Failed to update profile");
    }
    } catch (error) {
    console.error(error);
    }
};

const toggleEditMode = (itemName) => {
    setEditableItem(itemName);
};

return (
    <ProfileContainer>
    <h2>My Profile</h2>
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
            <ProfileItem>
            <strong>Weight:</strong>{" "}
              {editableItem === "weight" ? ( // Check if weight is in edit mode
                <Input
                type="number"
                name="weight"
                value={updatedUser.weight}
                onChange={handleInputChange}
                />
            ) : (
                <span>{user.weight}</span>
            )}
              {editableItem === "weight" && ( // Check if weight is in edit mode
                <Button onClick={handleUpdateProfile}>Update</Button>
            )}
              {editableItem !== "weight" && ( // Check if weight is not in edit mode
                <EditButton
                onClick={() => toggleEditMode("weight")}
                >
                Edit
                </EditButton>
            )}
            </ProfileItem>
            <ProfileItem>
            <strong>Age:</strong>{" "}
              {editableItem === "age" ? ( // Check if age is in edit mode
                <Input
                type="number"
                name="age"
                value={updatedUser.age}
                onChange={handleInputChange}
                />
            ) : (
                <span>{user.age}</span>
            )}
              {editableItem === "age" && ( // Check if age is in edit mode
                <Button onClick={handleUpdateProfile}>Update</Button>
            )}
              {editableItem !== "age" && ( // Check if age is not in edit mode
                <EditButton onClick={() => toggleEditMode("age")}>Edit</EditButton>
            )}
            </ProfileItem>
        </ProfileInfo>
        </>
    )}
    </ProfileContainer>
);
};

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

const InputContainer = styled.div`
margin-bottom: 10px;
display: flex;
align-items: center;

label {
    margin-right: 10px;
}
`;

const Input = styled.input`
padding: 5px;
border-radius: 4px;
border: 1px solid #ccc;
`;

const Button = styled.button`
background-color: #2c3e50;
color: #fff;
border: none;
border-radius: 4px;
padding: 8px 12px;
cursor: pointer;
`;

const SuccessMessage = styled.p`
color: green;
font-size: 14px;
margin-top: 10px;
`;

const ProfileItem = styled.div`
margin-bottom: 10px;
display: flex;
align-items: center;
`;

const EditButton = styled.button`
background-color: transparent;
color: #2c3e50;
border: none;
border-radius: 4px;
padding: 8px 12px;
cursor: pointer;
`;

export default MyProfile;
