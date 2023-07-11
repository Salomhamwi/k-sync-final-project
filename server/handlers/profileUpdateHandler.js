const { MongoClient, ObjectId } = require('mongodb');


require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const profileUpdateHandler = async (req, res) => {
const {userId} = req.params;
const {weight, age, dragonBoatRole, paddlingSide} = req.body;

try {
    await client.connect();
    const db = client.db('mydatabase');

    // Update the user's profile based on the provided user ID
    const result = await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        {
        $set: {
            weight: weight,
            age: age,
            dragonBoatRole: dragonBoatRole,
            paddlingSide: paddlingSide,
        }
        }
    );
    res.status(200).json({ message: 'Profile updated successfully' });
} catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
} finally {
    await client.close();
}
};

module.exports = { profileUpdateHandler };
