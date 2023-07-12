const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

require("dotenv").config();
const { MONGO_URI } = process.env;



const loginHandler = async (req, res) => {
const { email, password } = req.body;
const client = new MongoClient(MONGO_URI);
try {
    await client.connect();
    const db = client.db('mydatabase');
    const collection = db.collection('users');

    // Check if user exists
    const user = await collection.findOne({ email });
    if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the input password with the stored hashed password
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
    }

    
    // User authenticated, retrieve the user's first name
    const { firstName } = user;
    const { weight } = user;
    const { age } = user;
    const { lastName } = user;
    const { _id} = user;
    const {teamJoined} = user;

    res.status(200).json({ message: 'Login successful', firstName, email , weight, age, lastName, _id, teamJoined });
} catch (error) {
    res.status(500).json({ message: 'Error logging in' });
} finally {
    await client.close();
}
};

module.exports = { loginHandler };

