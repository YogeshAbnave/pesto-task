// db.js
const mongoose = require('mongoose');

const connectToDatabase = () => {
  mongoose.connect('mongodb://localhost:27017/task-management', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
   
  });
};

module.exports = { connectToDatabase };
