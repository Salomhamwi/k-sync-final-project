const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

require("dotenv").config();
const { MONGO_URI } = process.env;



const signupHandler = async (req, res) => {
const { firstName, lastName, email, password, weight, age, dragonBoatRole, paddlingSide } = req.body;
const client = new MongoClient(MONGO_URI);
try {
    await client.connect();
    const db = client.db('mydatabase');
    const collection = db.collection('users');

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
    return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Create a new user with the hashed password
    await collection.insertOne({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    weight,
    age,
    dragonBoatRole,
    paddlingSide,
    teamJoined: false
    });

    res.status(201).json({ message: 'User created successfully' });
} catch (error) {
    res.status(500).json({ message: 'Error creating user' });
} finally {
    await client.close();
}
};

module.exports = { signupHandler };
