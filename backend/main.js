import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from './models/User.js'

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

//connecting to mongoose
mongoose.connect('mongodb://localhost:27017/Members')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

app.post('/signup', async (req, res) => {
  const { firstname, email, password,role } = req.body

  try {
    const exist = await User.findOne({ email })
    if (exist) {
      return res.json({ success: false, message: 'User already exists' })
    }

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ firstname, email, password: hashedPassword, role })

    await newUser.save();

    res.json({ success: true, message: 'Signup Successful' })
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'The Signup failed' })
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.json({ success: false, message: 'The User is not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.json({ success: false, message: 'Invalid credentials' })

    res.json({
      success: true,
      message: 'Login Done Successfully',
      role: user.role,
      firstname: user.firstname
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Login failed' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})