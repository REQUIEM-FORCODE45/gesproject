// utils/config.js
require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb+srv://development:OT0UOVsaLmqkKMzb@clusterv.bnp0ogq.mongodb.net/?appName=ClusterV',
    sessionSecret: process.env.SESSION_SECRET || 'default-secret-key'
};