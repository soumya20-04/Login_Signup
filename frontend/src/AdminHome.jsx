import React from 'react'

const AdminHome = ({ onLogout }) => {
  return (
    <div className="container">
      <h1>Welcome Admin</h1>
      <p>You have administrative rights.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export default AdminHome;
