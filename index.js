require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');

// instatiate the express app
const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json({ limit: '1000mb' }));

// Listen for incoming requests
app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`));