const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;

const updateRosterHandler = async (req, res) => {
  const { teamName, seats, leftSeatWeight, rightSeatWeight } = req.body;
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db('mydatabase');
    const teamsCollection = db.collection('teams');
    const rosterCollection = db.collection('roster');

    // Check if the team exists
    const team = await teamsCollection.findOne({ teamName });
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Check if the roster exists
    const existingRoster = await rosterCollection.findOne({ teamName });

    if (existingRoster) {
      // Update existing roster
      const updateQuery = { $set: { seats, leftSeatWeight, rightSeatWeight } };
      await rosterCollection.updateOne({ teamName }, updateQuery);
    } else {
      // Create new roster
      const newRoster = { teamName, seats, leftSeatWeight, rightSeatWeight };
      await rosterCollection.insertOne(newRoster);
    }

    return res.status(200).json({ message: 'Roster updated successfully' });
  } catch (error) {
    console.error('Error updating roster:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
};

module.exports = { updateRosterHandler };