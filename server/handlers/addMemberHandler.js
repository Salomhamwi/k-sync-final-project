const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);

const addMemberHandler = async (req, res) => {
  const { teamName, memberId } = req.body;
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

    // Check if the member exists
    const member = await db.collection('users').findOne({ _id: new ObjectId(memberId) });
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Update the member's teamJoined and teamName fields
    await usersCollection.updateOne({ _id: new ObjectId(memberId) }, { $set: { teamJoined: true, teamName } });

    // Add the member to the team
    await teamsCollection.updateOne({ teamName }, { $push: { members: memberId } });

    return res.status(200).json({ message: 'Member added successfully' });
  } catch (error) {
    console.error('Error adding member:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
};

module.exports = { addMemberHandler };
