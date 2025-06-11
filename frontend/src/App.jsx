import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Sign from './Sign'
import Login from './Login'
import AdminHome from './AdminHome'
import UserHome from './UserHome'

function App() {
  const [pg, setpg] = useState('signup')  
  const role = useSelector((state) => state.auth.role)

  console.log('Current page:', pg)
  console.log('Current role from store:', role)

  const handleSignedUp = () => {
    setpg('login')
  }

  const handleLoggedIn = () => {
    setpg('home')
  }

  const handleLogout = () => {
    setpg('login')
  }

  return (
    <>
      {pg === 'signup' && <Sign onSignedUp={handleSignedUp} />}
      {pg === 'login' && <Login onLoggedIn={handleLoggedIn} />}
      {pg === 'home' && (
        role === 'admin' ? <AdminHome onLogout={handleLogout} /> : <UserHome onLogout={handleLogout} />
      )}
    </>
  )
}

export default App
