//Start server
const express = require('express')
const app = express()
const port = 8800

//Security
const cors = require('cors')
app.use(cors())


//Database
const routes = require('./routes/index')
routes(app)


//Listen
app.listen(port, () => console.log(`Connected server on port ${port}!`))