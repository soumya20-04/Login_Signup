import React from 'react'

const UserHome = ({ onLogout }) => {
  return (
    <div className="container">
      <h1>Welcome User</h1>
      <p>You are logged in as a general user.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export default UserHome;
