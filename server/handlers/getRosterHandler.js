const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;

const getRosterHandler = async (req, res) => {
  const { teamName } = req.params;
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db('mydatabase');
    const rosterCollection = db.collection('roster');

    const roster = await rosterCollection.findOne({ teamName });

    if (!roster) {
      return res.status(404).json({ error: 'Roster not found' });
    }

    const formattedRoster = {
      _id: roster._id,
      teamName: roster.teamName,
      drummer: roster.seats[0] || null,
      steerer: roster.seats[1] || null,
      leftSeatWeight: roster.leftSeatWeight || null,
      rightSeatWeight: roster.rightSeatWeight || null,
      Seat1Left: roster.seats[2] || null,
      Seat1Right: roster.seats[3] || null,
      Seat2Left: roster.seats[4] || null,
      Seat2Right: roster.seats[5] || null,
      Seat3Left: roster.seats[6] || null,
      Seat3Right: roster.seats[7] || null,
      Seat4Left: roster.seats[8] || null,
      Seat4Right: roster.seats[9] || null,
      Seat5Left: roster.seats[10] || null,
      Seat5Right: roster.seats[11] || null,
      Seat6Left: roster.seats[12] || null,
      Seat6Right: roster.seats[13] || null,
      Seat7Left: roster.seats[14] || null,
      Seat7Right: roster.seats[15] || null,
      Seat8Left: roster.seats[16] || null,
      Seat8Right: roster.seats[17] || null,
      Seat9Left: roster.seats[18] || null,
      Seat9Right: roster.seats[19] || null,
      Seat10Left: roster.seats[20] || null,
      Seat10Right: roster.seats[21] || null,
    };


    return res.status(200).json({ roster: formattedRoster });
  } catch (error) {
    console.error('Error fetching roster:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
};

module.exports = { getRosterHandler };

