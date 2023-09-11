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

  // handle user login
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body

      const sql = 'SELECT * FROM users WHERE email = ?'
      db.query(sql, [email, password], async (err, result) => {
        if (err) {
          return res.status(500).send({ message: 'Login Failed' })
        }

        if (result.length === 0) {
          return res.status(401).send({ message: 'User not found' })
        }

        const user = result[0]
        const isPasswordValid = await bcrypt.compareSync(
          password,
          user.password
        )

        if (!isPasswordValid) {
          return res.status(401).send({ message: 'Invalid email or password' })
        }

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.SECRET_KEY,
          {
            expiresIn: '1h',
          }
        )

        res.status(200).send({ token })
      })
    } catch (err) {
      res.status(500).send({ message: 'Error Registering User' })
    }
  })
}
