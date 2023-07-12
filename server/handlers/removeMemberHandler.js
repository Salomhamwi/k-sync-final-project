const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;


const removeMemberHandler = async (req, res) => {
  const teamId = req.params.teamId;
  const {memberId } = req.params
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

    // Check if the member exists in the team
const memberExists = team.members.find((member) => String(member) === memberId);

console.log(memberExists);
if (!memberExists) {
  return res.status(404).json({ message: 'Member not found in the team' });
}

    // Remove the member from the team
    const updatedMembers = team.members.filter(member => String(member) !== memberId);
    const result = await db.collection('teams').updateOne(
      { _id: new ObjectId(teamId) },
      { $set: { members: updatedMembers} }
    );
    console.log(result);

    if (result.modifiedCount === 1) {
      // Update the user's teamJoined and teamName fields
      await db.collection('users').updateMany(
        { _id: new ObjectId(memberId) },
        { $set: { teamJoined: false, teamName: null } }
      );

      res.status(200).json({ message: 'Member removed successfully' });
    } else {
      res.status(500).json({ message: 'Failed to remove member from the team' });
    }
  } catch (error) {
    console.error('Error removing member:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Close the database connection
    await client.close();
  }
};

module.exports = { removeMemberHandler };
