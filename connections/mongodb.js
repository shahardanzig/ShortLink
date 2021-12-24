const mongoose = require('mongoose');

const monogodb_address = process.env.MONGODB_ADDRESS || 'localhost:27017';
const mongodb_database = process.env.MONGODB_DATABASE || 'shortlink';

// setting up mongodb connection
const mongodb_uri = `mongodb://${monogodb_address}/${mongodb_database}`;
mongoose.connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
module.exports = connection;