const routes = require('./src/routes/routes')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql2 = require('mysql2')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
  origin: process.env.CLIENT_HOST,
  methods: ['GET', 'POST'],
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

// Connect to MySQL database
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}
const db = mysql2.createConnection(dbConfig)
db.connect((err) => {
  if (err) throw err
  console.log('Connected to database')
})

//Launch the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

//User Routes for authentication
routes.userRoutes(app, db)

//Tasks Routes for manageing tasks
routes.tasksRoutes(app, db)
