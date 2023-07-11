const { MongoClient, ObjectId } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const fetchDragonBoatRoleAndPaddlingSideHandler = async (req, res) => {
const { userId } = req.params;

  try {
    await client.connect();
    const db = client.db('mydatabase');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (user) {
      const { dragonBoatRole, paddlingSide } = user;
      res.status(200).json({ dragonBoatRole, paddlingSide });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching dragonBoatRole and paddlingSide:', error);
    res.status(500).json({ message: 'Failed to fetch dragonBoatRole and paddlingSide' });
  } finally {
    await client.close();
  }
};

module.exports = { fetchDragonBoatRoleAndPaddlingSideHandler };
