const { MongoClient } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const teamHandler = async (req, res) => {
    try {
    await client.connect();
    const db = client.db("mydatabase");
    const teamsCollection = db.collection("teams");

      // Fetch team data for the current user
    const team = await teamsCollection.findOne({ teamName: req.params.teamName });
    console.log(req.params.teamName);
    if (!team) {
        return res.status(404).json({ message: "Team not found" });
        
    }
    res.status(200).json(team);
    } catch (error) {
    console.error("Error fetching team data:", error);
    res.status(500).json({ message: "Failed to fetch team data" });
    } finally {
    await client.close();
    }
};

module.exports = { teamHandler };