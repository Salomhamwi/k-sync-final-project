const { MongoClient, ObjectId } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;

const fetchUserDetails = async (req, res) => {
  const { userId } = req.params;
  const client = new MongoClient(MONGO_URI);
  try {
    
    await client.connect();
    const db = client.db('mydatabase');
    const usersCollection = db.collection('users');

    // Find the user by userId
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Failed to fetch user data' });
  } finally {
    await client.close();
  }
};

module.exports = { fetchUserDetails };