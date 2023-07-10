const { MongoClient, ObjectId } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const createTeamHandler = async (req, res) => {
    const { teamName, address, phoneNumber, email, teamCaptain } = req.body;

    try {
        await client.connect();
        const db = client.db('mydatabase');
        const teamsCollection = db.collection('teams');

        // Check if team already exists
        const existingTeam = await teamsCollection.findOne({ teamName });
        if (existingTeam) {
            return res.status(409).json({ message: 'Team name already exists' });
        }

        const result = await teamsCollection.insertOne({
            teamName,
            address,
            phoneNumber,
            email,
            teamCaptain,
            members: []
        });

        res.status(201).json({ message: 'Team created successfully', teamName });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ message: 'Failed to create team' });
    } finally {
        await client.close();
    }
};

const updateTeamJoinedHandler = async (req, res) => {
    const { userId } = req.params;
    const { teamJoined, teamName } = req.body;

    try {
        await client.connect();
        const db = client.db('mydatabase');
        const usersCollection = db.collection('users');

        // Update the user's teamJoined field to true and add teamName if provided
        const updateFields = { teamJoined: true };
        if (teamName) {
            updateFields.teamName = teamName;
        }

        await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updateFields }
        );

        // If teamName is provided and teamJoined is true, update the teamName field
        if (teamJoined && teamName) {
            const teamsCollection = db.collection('teams');
            await teamsCollection.updateOne(
                { teamName },
                { $addToSet: { members: new ObjectId(userId) } } // Use ObjectId to add member
            );
        }

        res.status(200).json({ message: 'User teamJoined updated successfully' });
    } catch (error) {
        console.error('Error updating teamJoined:', error);
        res.status(500).json({ message: 'Failed to update teamJoined' });
    } finally {
        await client.close();
    }
};

module.exports = { createTeamHandler, updateTeamJoinedHandler };
