const bcrypt = require('bcrypt')
const session = require('express-session')
const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.userRoutes = (app, db) => {
  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: true,
    })
  )

  // handle user logout
  app.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send({ message: 'Error Destroying Session' })
      }
      res.status(200).send({ message: 'Session Destroyed Successfully' })
    })
  })

  // handle user login
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body

      const sql = 'SELECT * FROM users WHERE email = ?'
      db.query(sql, [email], async (err, result) => {
        if (err) {
          return res.status(500).send({ message: 'Login Failed' })
        }

        if (result.length === 0) {
          return res.status(401).send({ message: 'User not found' })
        }

        const user = result[0]
        const isPasswordValid = bcrypt.compareSync(password, user.password)

        if (!isPasswordValid) {
          return res.status(401).send({ message: 'Invalid email or password' })
        }

        const token = jwt.sign(
          { id: user.id, email: user.email, username: user.username },
          process.env.SECRET_KEY
        )

        res.status(200).send({ token })
      })
    } catch (err) {
      res.status(500).send({ message: 'Error Registering User' })
    }
  })

  // handle user registration
  app.post('/register', async (req, res) => {
    const saltRounds = 10
    try {
      const salt = bcrypt.genSaltSync(saltRounds)

      const { username, email, password } = req.body
      const hashedPassword = bcrypt.hashSync(password, salt)

      const sql =
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
      db.query(sql, [username, email, hashedPassword], (err) => {
        if (err) {
          return res.status(500).send({ message: 'Error registering user' })
        }
        res.status(200).send({ message: 'Registration Successful' })
      })
    } catch (error) {
      res.status(500).send({ message: 'Error Registering User' })
    }
  })
}

exports.tasksRoutes = (app, db) => {
  // Middleware to check and authenticate token
  const authenticateToken = async (req, res, next) => {
    //Convert header keys to lowercase
    const headers = Object.keys(req.headers).reduce((acc, key) => {
      acc[key.toLowerCase()] = req.headers[key]
      return acc
    }, {})

    const bearerHeader = headers['authorization']

    if (typeof bearerHeader === 'undefined') {
      return res.status(401).send('Access denied')
    }

    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]

    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).send('Invalid token')
      }

      req.user = decoded.id
      next()
    })
  }

  //Retrieve the tasks from the database
  app.get('/tasks', authenticateToken, (req, res) => {
    const userId = req.user
    const sql =
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY FIELD(priority,"high","medium","normal")'

    db.query(sql, [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve tasks' })
      }
      res.status(200).send(results)
    })
  })

  //Add new task
  app.post('/tasks', authenticateToken, (req, res) => {
    const { title, description, priority, status } = req.body
    const userID = req.user
    const sql =
      'INSERT INTO tasks (title, description, priority, status, user_id) VALUES (?, ?, ?, ?, ?)'

    db.query(
      sql,
      [title, description || null, priority, status, userID],
      (err) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'Failed to add task' })
        }
        res.json({ message: 'Task added successfully' })
      }
    )
  })

  //Update the task
  app.put('/tasks/:id', authenticateToken, (req, res) => {
    const { id } = req.params
    const { title, priority, description, status } = req.body
    const sql =
      'UPDATE tasks SET title = ?, priority = ?, description = ?, status = ? WHERE id = ?'

    db.query(sql, [title, priority, description || null, status, id], (err) => {
      if (err) {
        throw err
      }
      res.json({ message: 'Task updated successfully' })
    })
  })

  //Delete the task
  app.delete('/tasks/:id', authenticateToken, (req, res) => {
    const { id } = req.params
    const user_id = req.user
    const sql = 'DELETE FROM tasks WHERE id = ? AND user_id = ?'

    db.query(sql, [id, user_id], (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Server error' })
      }
      res.json({ message: 'Task deleted successfully' })
    })
  })
}
