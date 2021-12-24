require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');

// instatiate the express app
const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json({ limit: '1000mb' }));
app.use('/', require('./controllers/url/url'))

// connect to mongodb
const connection = require('./connections/mongodb')
connection.once('open', () => console.log("successfully connected to mongodb"))
connection.on('error', (error) => console.log(`error connecting to mongodb - ${error}`))

// Listen for incoming requests
app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`));