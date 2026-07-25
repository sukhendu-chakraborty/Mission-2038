const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Guarantee root .env file is loaded regardless of process CWD
dotenv.config({ path: path.join(__dirname, '../.env') });

async function connectDB() {
  const defaultAtlasUri = 'mongodb+srv://mandalkrishnendu573_db_user:beMwg4PbpRY7hy4t@cluster0.cxw8cmf.mongodb.net/?appName=Cluster0';
  const envMongoUri = process.env.MONGODB_URI;
  const primaryUri = envMongoUri || defaultAtlasUri;

  console.log(`[DB] Connecting to MongoDB...`);

  try {
    await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 8000
    });

    console.log('[✓] MongoDB connected successfully');

    try {
      const { ScoutRating } = require('../api/models');
      if (ScoutRating && ScoutRating.collection) {
        await ScoutRating.collection.dropIndex('player_1_scout_1').catch(() => {});
        await ScoutRating.collection.createIndex({ player: 1, scout: 1, trial: 1 }, { unique: true }).catch(() => {});
      }
    } catch (e) {}

    return true;
  } catch (primaryError) {
    console.warn('[!] Primary MongoDB Cloud Atlas connection failed:', primaryError.message);

    const localMongoUri = 'mongodb://127.0.0.1:27017/mission2k38';
    try {
      console.log(`[DB] Attempting local MongoDB fallback at ${localMongoUri}...`);
      await mongoose.connect(localMongoUri, {
        serverSelectionTimeoutMS: 3000
      });
      console.log('[✓] Connected to local MongoDB instance');
      return true;
    } catch (localError) {
      console.warn('[!] Local MongoDB unavailable (ECONNREFUSED 127.0.0.1:27017).');
      console.warn('[👉 FIX REQUIRED]: In your MongoDB Atlas Dashboard -> Security -> Network Access -> Add IP Address -> Select "Allow Access From Anywhere" (0.0.0.0/0). This allows forked/cloned instances to connect.');
      return false;
    }
  }
}

module.exports = connectDB;
