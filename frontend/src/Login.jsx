import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from './redux/authSlice'
import './login.css'

const Login = ({ onLoggedIn }) => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      alert(data.message)

      if (data.success) {
  dispatch(loginSuccess({
    user: data.user,
    role: data.role,
  }))
  onLoggedIn()
}

    } catch (err) {
      alert('Network error, please try again later.')
    }

    setemail('')
    setpassword('')
  }

  return (
    <div className="main">
      <div className="head">
        <h1>Login</h1>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="inp">
          <div>
            <label htmlFor="email-input">
              <img src="mail.svg" alt="mail icon" className="img2" />
            </label>
            <input type="email" id="email-input" name="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password-input">
              <img src="lock.svg" alt="lock icon" className="img3" />
            </label>
            <input type="password"  id="password-input" name="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="submit">
          <button type="submit">LOGIN</button>
        </div>
      </form>
    </div>
  )
}

export default Login;