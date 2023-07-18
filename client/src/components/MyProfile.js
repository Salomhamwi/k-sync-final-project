import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { ContextInfo } from "../components/ContextInfo";

const MyProfile = () => {
  const { user, setUser } = useContext(ContextInfo);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [editableItem, setEditableItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
      setUpdatedUser(userData);
      setIsLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    if (!isLoading) {
      fetchUserDetails();
    }
  }, [isLoading]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`/profile/${user._id}`);
      if (response.ok) {
        const data = await response.json();
        const newUser = { ...user, ...data };
        setUser(newUser);
        setUpdatedUser(newUser);
      } else {
        throw new Error("Failed to fetch user details");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      
      if (response.ok) {
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
              {editableItem === "weight" ? (
                <Input
                  type="number"
                  name="weight"
                  value={updatedUser.weight}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{user.weight}</span>
              )}
              {editableItem === "weight" && (
                <Button onClick={handleUpdateProfile}>Update</Button>
              )}
              {editableItem !== "weight" && (
                <EditButton onClick={() => toggleEditMode("weight")}>Edit</EditButton>
              )}
            </ProfileItem>
            <ProfileItem>
              <strong>Age:</strong>{" "}
              {editableItem === "age" ? (
                <Input
                  type="number"
                  name="age"
                  value={updatedUser.age}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{user.age}</span>
              )}
              {editableItem === "age" && (
                <Button onClick={handleUpdateProfile}>Update</Button>
              )}
              {editableItem !== "age" && (
                <EditButton onClick={() => toggleEditMode("age")}>Edit</EditButton>
              )}
            </ProfileItem>
            <ProfileItem>
              <strong>Dragon Boat Role:</strong>{" "}
              {editableItem === "dragonBoatRole" ? (
                <Select
                  name="dragonBoatRole"
                  value={updatedUser.dragonBoatRole}
                  onChange={handleInputChange}
                >
                  <option value="">Select Dragon Boat Role</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Engine">Engine</option>
                  <option value="Pacer">Pacer</option>
                  <option value="Drummer">Drummer</option>
                  <option value="Steerer">Steerer</option>
                </Select>
              ) : (
                <span>{user.dragonBoatRole}</span>
              )}
              {editableItem === "dragonBoatRole" && (
                <Button onClick={handleUpdateProfile}>Update</Button>
              )}
              {editableItem !== "dragonBoatRole" && (
                <EditButton onClick={() => toggleEditMode("dragonBoatRole")}>
                  Edit
                </EditButton>
              )}
            </ProfileItem>
            <ProfileItem>
              <strong>Paddling Side:</strong>{" "}
              {editableItem === "paddlingSide" ? (
                <Select
                  name="paddlingSide"
                  value={updatedUser.paddlingSide}
                  onChange={handleInputChange}
                >
                  <option value="">Select Paddling Side</option>
                  <option value="Left">Left</option>
                  <option value="Right">Right</option>
                  <option value="Steerer">Steerer</option>
                  <option value="Drummer">Drummer</option>
                </Select>
              ) : (
                <span>{user.paddlingSide}</span>
              )}
              {editableItem === "paddlingSide" && (
                <Button onClick={handleUpdateProfile}>Update</Button>
              )}
              {editableItem !== "paddlingSide" && (
                <EditButton onClick={() => toggleEditMode("paddlingSide")}>
                  Edit
                </EditButton>
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

const Select = styled.select`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export default MyProfile;
