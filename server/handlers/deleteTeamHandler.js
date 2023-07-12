const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;


const deleteTeamHandler = async (req, res) => {
const teamId = req.params.teamId;
const client = new MongoClient(MONGO_URI);
  try {
    // Connect to the MongoDB database
    await client.connect();
    const db = client.db('mydatabase');

    // Check if the team exists
    const team = await db.collection('teams').findOne({ _id: new ObjectId(teamId) });

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Remove the team captain
    const teamCaptainId = team.teamCaptain;
    await db.collection('users').updateOne(
      { _id: new ObjectId(teamCaptainId) },
      { $set: { teamJoined: false, teamName: null } }
    );

    // Remove all team members
    const memberIds = team.members.map((member) => new ObjectId(member));
    await db.collection('users').updateMany(
      { _id: { $in: memberIds } },
      { $set: { teamJoined: false, teamName: null } }
    );

    // Delete the team
    const result = await db.collection('teams').deleteOne({ _id: new ObjectId(teamId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Team deleted successfully' });
    } else {
      res.status(500).json({ message: 'Failed to delete the team' });
    }
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Close the database connection
    await client.close();
  }
};

module.exports = { deleteTeamHandler };
