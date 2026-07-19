"use strict";

const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB to the DB:', mongoose.connection.name);
});

// Reuses the pool across warm serverless invocations; caps pool size so
// concurrent Vercel instances don't exhaust the Atlas connection limit.
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/gomyecotrip', {
    maxPoolSize: 5,
  });
}

module.exports = mongoose.connection;
