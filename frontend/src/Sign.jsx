import React, { useState } from 'react'
import './sign.css'

const Sign = ({ onSignedUp }) => {
    const [firstname, setfirstname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [repeatpassword, setrepeatpassword] = useState('')
    const [role, setRole] = useState('user')

    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== repeatpassword) {
            setError('Passwords do not match!')
            return
        }

        setError('')

        try {
            const res = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname, email, password, role }),
            })

            const data = await res.json()
            alert(data.message)

            if (data.success) {
                console.log(" onSignedUp...")
                onSignedUp()
            }
        } catch (err) {
            alert('Network error, please try again later.')
        }

        setfirstname('')
        setemail('')
        setpassword('')
        setrepeatpassword('')
    }

    return (
        <div className="main">
            <div className="head">
                <h1>Signup</h1>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="inp">
                    <div>
                        <label htmlFor="firstname-input">
                            <img src="person.svg" alt="person icon" />
                        </label>
                        <input type="text" id="firstname-input" name="firstname" placeholder="Firstname" value={firstname} onChange={(e) => setfirstname(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email-input">
                            <img src="mail.svg" alt="mail icon" />
                        </label>
                        <input type="email" id="email-input" name="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password-input">
                            <img src="lock.svg" alt="lock icon" />
                        </label>
                        <input type="password" id="password-input" name="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="repeat-password-input">
                            <img src="lock.svg" alt="lock icon" />
                        </label>
                        <input type="password" id="repeat-password-input" name="repeatpassword" placeholder="Repeat Password" value={repeatpassword} onChange={(e) => setrepeatpassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="role-select">
                            <img src="rolee.svg" alt="role icon" />
                        </label>
                        <select
                            id="role-select"  value={role}  onChange={(e) => setRole(e.target.value)} required
                        >
                             <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="submit">
                    <button type="submit">SIGNUP</button>
                </div>
            </form>
        </div>
    )
}

export default Sign;
