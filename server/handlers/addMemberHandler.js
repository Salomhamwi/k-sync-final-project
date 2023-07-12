const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;


const addMemberHandler = async (req, res) => {
  const { teamName, email } = req.body;
  const { userId } = req.params;
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db('mydatabase');
    const teamsCollection = db.collection('teams');
    const usersCollection = db.collection('users');

    // Check if the team exists
    const team = await teamsCollection.findOne({ teamName });
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    

    if (team.teamCaptain.toString() !== userId) {
      return res.status(403).json({ error: 'Only the team captain can add members' });
      
    }

    // Find the user with the given email
    const member = await usersCollection.findOne({ email, teamJoined: false });
    if (!member) {
      return res.status(404).json({ error: 'Member not found or already part of a team' });
    }

    // Update the member's teamJoined and teamName fields
    await usersCollection.updateOne({ _id: member._id }, { $set: { teamJoined: true, teamName } });

    // Add the member to the team
    await teamsCollection.updateOne({ teamName }, { $push: { members: member._id } });

    return res.status(200).json({ message: 'Member added successfully' });
  } catch (error) {
    console.error('Error adding member:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
};

module.exports = { addMemberHandler };