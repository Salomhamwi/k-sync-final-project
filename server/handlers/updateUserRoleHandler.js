const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;


const updateUserRoleHandler = async (req, res) => {
  const { userId } = req.params;
  const { dragonBoatRole } = req.body;
  const client = new MongoClient(MONGO_URI);
  
  try {
    // Connect to the MongoDB database
    await client.connect();
    const db = client.db('mydatabase');

    // Update the user's Dragon Boat Role
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { dragonBoatRole: dragonBoatRole } }
    );

    res.status(200).json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Close the database connection
    await client.close();
  }
};

module.exports = { updateUserRoleHandler };
