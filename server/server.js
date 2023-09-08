const routes = require('./src/routes/routes')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql2 = require('mysql2')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
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

//User Routes for authentication
routes.userRoutes(app, db)

// Middleware to check and authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).send('Access denied')
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid token')
    }

    req.user_id = decoded.id
    next()
  })
}

//Retrieve the tasks from the database
app.get('/', authenticateToken, (req, res) => {
  const sql =
    'SELECT * FROM tasks WHERE user_id = ? ORDER BY FIELD(priority,"high","medium","normal")'

  db.query(sql, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results)
  })
})

//Add new task
app.post('/', authenticateToken, (req, res) => {
  const { title, description, priority } = req.body
  const sql =
    'INSERT INTO tasks (title, description, priority, status, user_id) VALUES (?, ?, ?, "Todo", ?)'

  db.query(sql, [title, description || null, priority], (err) => {
    if (err) {
      throw err
    }
    res.send('Task added successfully')
  })
})

//Update the task
app.put('/:id', (req, res) => {
  const { id } = req.params
  const { title, priority, description, status } = req.body
  const sql =
    'UPDATE tasks SET title = ?, priority = ?, description = ?, status = ? WHERE id = ?'

  db.query(sql, [title, priority, description || null, status, id], (err) => {
    if (err) {
      throw err
    }
    res.send('Task updated successfully')
  })
})

//Delete the task
app.delete('/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM tasks WHERE id = ? AND user_id = ?'

  db.query(sql, [id], (err) => {
    if (err) {
      throw err
    }
    res.send('Task deleted successfully')
  })
})

//Launch the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
